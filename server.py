from sanic import Sanic
from sanic.response import json
import tensorflow as tf
# import numpy as np
import cv2
# import dlib
# from PIL import Image
import os
from face_cropper import crop

classes = ["相澤南","水卜櫻","小倉由菜","瀬名ひかり","森日向子","四宮ありす","月乃露娜","鈴木真夕","稻場流花","河合明日菜","楓可憐","川上奈奈美","望月絢香","宮下玲奈","中山文香"
           ,"庵ひめか","白石茉莉奈","有岡みう","工藤ララ","美波もも","南乃そら","深田詠美","横宮七海"]

app = Sanic("Python-Hosted-Model")


file_types = ('.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG')
ai_model = tf.keras.models.load_model('./ai_model/my_model.h5')

@app.get("/postImage")
def callModel(request):
    try:
         # Get the uploaded image from the request
        # uploaded_file = request.files.get('image')
        # filename = uploaded_file.name
        uploaded_file = request.args.get('img')
        file_path = os.path.join(os.getcwd(),'public', 'uploads', uploaded_file)
        print(f"file with path: {file_path}")

        cropped_img = crop(image_path=file_path, saving_path=None)

        img_ndarray = tf.keras.utils.img_to_array(cropped_img)
        resized_image = cv2.resize(img_ndarray, (96, 96), interpolation=cv2.INTER_AREA)
        resized_image = resized_image.reshape(-1, 96, 96, 3)

        predict = ai_model([resized_image], training=False)
        tensor = tf.constant(predict)

        max_index = tf.argmax(tensor, axis=1)[0].numpy()

        # Get the shape of the tensor
        _num_rows, num_cols = tensor.shape

        sorted_indices = []

        for i in sorted(range(num_cols), key=lambda x: abs(x-max_index), reverse=False):
            _index = (0, i)
            sorted_indices.append(i)

        results = []
        for sorted_index in sorted_indices:
            if sorted_index < len(classes):
                class_name = classes[sorted_index]
                probability = tf.nn.softmax(predict, axis=-1).numpy()[0][sorted_index]
                result_str = f"{class_name}: probability {probability:.2f}"
                results.append(result_str)
            else:
                result_str = f"Invalid class index: {sorted_index}"
                results.append(result_str)

        return json({ "results": results })
         
    except ValueError as e:
         return json({"msg":"upload failed", "error": e})
        
    

if __name__ == "__main__":
    app.run(host="dave-hk.me", port=8000, single_process=True)



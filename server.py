from sanic import Sanic
from sanic.response import json
import tensorflow as tf
# import numpy as np
# import cv2
# import dlib
# from PIL import Image
import os
# from face_cropper import crop
# from matplotlib import pyplot as plt

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

        # cropped_img = crop(image_path=file_path, saving_path=None)
       
        img = tf.keras.utils.load_img(file_path, target_size=(96, 96))

        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_tensor = tf.keras.preprocessing.image.smart_resize(img_array, (96, 96))
        img_tensor = tf.expand_dims(img_tensor, 0)
        
        predict = ai_model.predict(img_tensor)
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
    app.run(host="0.0.0.0", port=8000, single_process=True)



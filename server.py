from sanic import Sanic
from sanic.response import json
import tensorflow as tf
import numpy as np
import cv2
import dlib
from PIL import Image
import os

classes = ["楓可憐","川上奈奈美","望月絢香","宮下玲奈","中山文香"
           ,"庵姬花","白石茉莉奈","有岡美羽","工藤拉拉","美波桃","南乃空","深田詠美"]

app = Sanic("Python-Hosted-Model")

detector = dlib.get_frontal_face_detector()
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

        image = cv2.imread(file_path)
        

        #another method to get the numpyArray of the image
        # image = cv2.imdecode(np.frombuffer(uploaded_file.body, np.uint8), cv2.IMREAD_COLOR)
        

        dets = detector(image, 1)
        open_img = Image.open(file_path)

        # Crop the image as needed
        for _k, d in enumerate(dets):
            if d.right()-d.left() < 80 or d.bottom()-d.top() < 80:
                continue
                          
            cropped_img = open_img.crop((d.left(), d.top(), d.right(), d.bottom()))
            cropped_img.resize((96,96))
        
        img_ndarray = tf.keras.utils.img_to_array(cropped_img)
        resized_image = cv2.resize(img_ndarray, (96, 96), interpolation=cv2.INTER_AREA)
        resized_image = resized_image.reshape(-1, 96, 96, 3)

        predict = ai_model([resized_image], training=False)
        # probs = tf.nn.softmax(predict)
        class_indexes = tf.argmax(predict, axis=1).numpy()
        results = []

        for i, class_idx in enumerate(class_indexes):
            name = classes[class_idx]
            p = np.max(predict[i].numpy())
            results.append({
                "name": name,
                "probability": float(p)
            })

        return json({ "data": results })
         
    except ValueError as e:
         return json({"msg":"upload failed", "error": e})
        
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)



from sanic import Sanic
from sanic.response import json
import tensorflow as tf
import numpy as np
# import cv2
# import dlib
# from PIL import Image
import os
# from face_cropper import crop
# from matplotlib import pyplot as plt

classes = ["横宮七海","三上悠亞","松本いちか","東條なつ","白桃はな","河北彩花","楪カレン","木下ひまり","篠田優","小花のん",
"新井リマ","沙月恵奈","彌生美月","涼森玲夢","櫻空桃","有栖花あか","石川澪","桃園怜奈","伊藤舞雪","田中ねね",
"神宮寺奈緒","倉本すみれ","鷲尾めい","天使萌","安齋らら","天音まひな","二階堂夢","Julia","美谷朱里","姫咲はな",
"藤森里穂","明里紬","紗倉真奈","山手梨愛","戶田真琴","愛弓りょう","美乃すずめ","七ツ森りり","乙アリス","架乃由羅",
"石原希望","八木奈々","桃乃木香奈","八掛うみ","波多野結衣","吉根柚莉愛","柏木こなつ","夏希栗","葵司","松下紗榮子",
"天川空","本庄鈴","小湊よつ葉","羽咲みはる","希島愛理","奧田咲","加美杏奈","明日見未来","黑川堇","橋本有菜",
"沙月恵奈","夢乃愛華","古川伊織","辻井穗乃果","森沢かな","山岸逢花","相澤南","水卜櫻","小倉由菜","瀬名ひかり",
"森日向子","Minamo","梓ヒカリ","小野六花","花狩まい","高瀬りな","希咲アリス","初川南","推川悠里","椿りか",
"結城りの","新村晶","楓ふうあ","四宮ありす","月乃露娜","鈴木真夕","稻場流花","河合明日菜","楓可憐","川上奈奈美",
"望月絢香","宮下玲奈","中山文香","庵ひめか","白石茉莉奈","有岡みう","工藤ララ","美波もも","南乃そら","深田詠美"]

app = Sanic("Python-Hosted-Model")


file_types = ('.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG')
ai_model = tf.keras.models.load_model('ai_model/my_model.h5')


def get_top_k_predictions(predict, k=10):
    tensor = tf.constant(predict)
    top_k_values, top_k_indices = tf.nn.top_k(tensor, k=k)
    top_k_probabilities = tf.nn.softmax(top_k_values, axis=-1).numpy()[0]
    top_k_classes = [classes[i] for i in top_k_indices.numpy()[0]]
    return top_k_classes, top_k_probabilities


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
        top_k_classes, top_k_probabilities = get_top_k_predictions(predict, k=10)

        results = []
        for class_name, probability in zip(top_k_classes, top_k_probabilities):
            result_str = f"{class_name}: probability {probability:.2f}"
            results.append(result_str)

        return json({ "results": results })
         
    except ValueError as e:
         return json({"msg":"upload failed", "error": e})
        
    

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, single_process=True)



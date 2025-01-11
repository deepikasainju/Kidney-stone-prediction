from flask import Flask, jsonify,request
from flask_mysqldb import MySQL
from password import password
from flask_cors import CORS
import hashlib
import re
import pandas as pd
from joblib import load
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from keras.models import load_model
import numpy as np
import os
import cv2


app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = 'sevendb'

mysql = MySQL(app)

# regex expression
regex_email = re.compile(r'^[a-zA-Z0-9._%+-]+@gmail\.com$')


# paswword crytping
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(stored_password, provided_password):
    return stored_password == hash_password(provided_password)


@app.route('/')
def display(): 
    email='dpka@gmail.com'
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Users where Email = %s', (email,))
    results = cur.fetchone()
    cur.close()
    return jsonify(results)


# login
@app.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   email = data.get("username")
   password = data.get("password")

   cur = mysql.connection.cursor()
   cur.execute('SELECT * FROM Users where Email = %s', (email,))
   results = cur.fetchone()

    # Basic check for demo purposes
   if results and verify_password(results[3], password):
      return jsonify({"message": "Login successful"}), 200
   else:
      return jsonify({"message": "Invalid credentials"}), 401
   

# signup
@app.route('/signup', methods=['POST'])
def signup():
   try:
      data = request.get_json()
      username = data.get("username")
      password = data.get("password")
      email= data.get("email")

      if re.match(regex_email, email):
         # hashing password
         hashed_password = hash_password(password)

         cur = mysql.connection.cursor()
         cur.execute("INSERT INTO Users(USERNAME, EMAIL, PASSWORD) VALUES (%s, %s, %s)", (username, email, hashed_password))
         mysql.connection.commit()
         cur.close()
         return jsonify({"message": "Signup successful!"}), 201
   
   except Exception as e:
      return jsonify({"message": "Signup unsuccessful!"}), 401


# Kidney stone prediction with urine analysis
@app.route('/Predictbydata', methods=['POST'])
def predictbydata():
   try:
      data = request.get_json()
      gravity= float(data.get("gravity"))
      ph = float(data.get("ph"))
      osmo = float(data.get("osmo"))
      cond = float(data.get("cond"))
      urea = float(data.get("urea"))
      calc = float(data.get("calc"))
      input_data = pd.DataFrame({
        'gravity': [gravity],
        'osmo': [osmo],
        'ph': [ph],
        'cond': [cond],
        'urea': [urea],
        'calc': [calc]
      })
      data_model = load('lgbm.joblib')
      prob = data_model.predict_proba(input_data)
      no_stone_prob=prob[0][0]
      stone_prob=prob[0][1]
      return jsonify({"Stone_Probability": round(float(stone_prob)*100,2), "No_Stone_Probalility": round(float(no_stone_prob)*100,2)}), 200
   
   except Exception as e:
      return jsonify({"message":str(e)})
   


# Kidney stone prediction with CT Scan

def has_sharp_edges(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Load image in grayscale
    edges = cv2.Canny(image, 100, 200)
    
    # Calculate the percentage of edge pixels
    edge_percentage = np.sum(edges > 0) / float(image.size)
    
    # If the edge percentage is above a certain threshold, it might be a CT scan
    return edge_percentage > 0.05  # threshold

def predict_image(image_path):
    """
    Predicts if a CT scan image is 'Normal' or 'Stone'.
    
    Parameters:
    - image_path (str): Path to the CT scan image.
    
    Returns:
    - str: 'Normal' or 'Stone' based on the prediction.
    """
    # loading the model
    CT_model = load_model('kidney_stone_detection_CT_image_model.h5')

    # Load and preprocess the image
    image = load_img(image_path, target_size=(150, 150))  # Resize to match model's input size
    image = img_to_array(image) / 255.0  # Normalize the image
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    
    # Make a prediction
    prediction = CT_model.predict(image)
    print(prediction[0][0])
    print(prediction[0][1])
    if prediction[0][1] > 0.5:
        return 'Kidney Stone Detected (Positive): ',round(float(prediction[0][1])*100,2),'%'
    else:
        return 'No Kidney Stone Detected  (Negative): ',round(float(prediction[0][0])*100,2),'%'

@app.route('/Predictbyimage', methods=['POST'])
def predictbyimage():
   try:
      if 'file' not in request.files:
         return jsonify({"error": "No file uploaded"}), 400
      file = request.files['file']
      
      # Save the uploaded file temporarily
      if not os.path.exists('temp'):
         os.makedirs('temp')

      filepath = os.path.join("temp", file.filename)
      file.save(filepath)

       # Validate if the image is a CT scan
      # if not has_sharp_edges(filepath):
      #    return jsonify({"error": "Uploaded file is not a valid CT scan image of Kidney"}), 400
      
      # Run prediction
      result = predict_image(filepath)
      print(result)
      
      # Delete the temporary file
      os.remove(filepath)
      
      return jsonify({"prediction": result}),200
   
   except Exception as e:
      return jsonify({"error": str(e)})
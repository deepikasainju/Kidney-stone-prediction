from flask import Flask, jsonify,request
from flask_mysqldb import MySQL
from password import password
from flask_cors import CORS
import hashlib



app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = 'sevendb'

mysql = MySQL(app)


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

      # hashing password
      hashed_password = hash_password(password)

      cur = mysql.connection.cursor()
      cur.execute("INSERT INTO Users(USERNAME, EMAIL, PASSWORD) VALUES (%s, %s, %s)", (username, email, hashed_password))
      mysql.connection.commit()
      cur.close()
      return jsonify({"message": "Signup successful!"}), 201
   
   except:
      return jsonify({"message": "Signup unsuccessful!"}), 401

from flask import Flask, jsonify,request
from flask_mysqldb import MySQL
from password import password
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# MySQL configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = password
app.config['MYSQL_DB'] = 'sevendb'

mysql = MySQL(app)

@app.route('/')
def display(): 
    email='dpka@gmail.com'
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM Users where Email = %s', (email,))
    results = cur.fetchone()
    cur.close()
    return jsonify(results)


@app.route('/login', methods=['POST'])
def login():
   data = request.get_json()
   username = data.get("username")
   password = data.get("password")

   cur = mysql.connection.cursor()
   cur.execute('SELECT * FROM Users where Email = %s', (username,))
   results = cur.fetchone()

    # Basic check for demo purposes
   if results and password == results[3]:
      return jsonify({"message": "Login successful"}), 200
   else:
      return jsonify({"message": "Invalid credentials"}), 401
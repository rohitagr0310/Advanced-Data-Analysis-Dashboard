import os
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

DATABASE = os.path.abspath('./database/database')

def get_db():
    db = getattr(Flask, '_database', None)
    if db is None:
        db = Flask._database = sqlite3.connect(DATABASE)
    return db

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'username and password are required'}), 400

    user = query_db('SELECT * FROM users WHERE username=?', (username,), one=True)

    if user and user[4] == password:
        return jsonify({'message': 'Login successful', 'user':user}), 200
    else:
        print({'error': 'Invalid email or password'})
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    password = data.get('password')
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    username = data.get('username')

    if not password or not first_name or not last_name or not username:
        return jsonify({'error': 'All fields are required'}), 400

    existing_user = query_db('SELECT * FROM users WHERE username=?', (username,), one=True)
    if existing_user:
        return jsonify({'error': 'username is already registered'}), 409

    get_db().execute('INSERT INTO users ( password, firstname, lastname, username) VALUES (?, ?, ?, ?)',
                     ( password, first_name, last_name, username))
    get_db().commit()

    return jsonify({'message': 'Registration successful'}), 201

if __name__ == '__main__':
    app.run(debug=True)

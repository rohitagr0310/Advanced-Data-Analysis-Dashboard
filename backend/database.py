import os
import sqlite3
from flask import Flask, jsonify

app = Flask(__name__)

# Define the path to the SQLite database file
DATABASE = os.path.abspath('./database/database')

# Function to connect to the SQLite database
def get_db():
    db = getattr(Flask, '_database', None)
    if db is None:
        db = Flask._database = sqlite3.connect(DATABASE)
    return db

# Function to query the database
def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

# API endpoint to retrieve user data
@app.route('/users', methods=['GET'])
def get_users():
    users = query_db('SELECT * FROM users')
    users_json = [{
        'id': user[0],
        'username': user[1],
        'firstname': user[2],
        'lastname': user[3],
        'password': user[4]
    } for user in users]
    return jsonify(users_json)

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    # Check if email or username is already in use
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already registered. Please log in or use a different email.'}), 409
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'Username already taken. Please choose a different username.'}), 409

    # Hash the password
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully!'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({'message': 'Account does not exist!'}), 404
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Incorrect password!'}), 401

    return jsonify({'message': 'Login successful!', 'username': username}), 200


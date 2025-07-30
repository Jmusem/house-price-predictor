import os
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load trained ML model
model_path = os.path.join(os.path.dirname(__file__), 'house_price_model.pkl')
model = joblib.load(model_path)

# Load the dataset (for fallback if needed or dynamic dropdowns)
df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'Nairobi.csv'), encoding='ISO-8859-1')

# Database connection
def get_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',
        db='house_price_db',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not all([name, email, password]):
        return jsonify({'error': 'All fields are required'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'error': 'Email already registered'}), 409

        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                       (name, email, password))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not all([email, password]):
        return jsonify({'error': 'Email and password are required'}), 400

    try:
        conn = get_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if user:
            return jsonify({'message': 'Login successful', 'user': user}), 200
        else:
            return jsonify({'error': 'Invalid email or password'}), 401

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        conn.close()

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        # Input validation
        required_fields = ['bedrooms', 'bathrooms', 'total_rooms',
                           'new_sub_county', 'property_type', 'purchase_type']
        if not all(field in data for field in required_fields):
            return jsonify({'error': f"Missing fields. Required: {', '.join(required_fields)}"}), 400

        # Prepare input for model
        input_data = pd.DataFrame([{
            'bedrooms': int(data['bedrooms']),
            'bathrooms': int(data['bathrooms']),
            'total_rooms': int(data['total_rooms']),
            'new_sub_county': data['new_sub_county'],
            'property_type': data['property_type'],
            'purchase_type': data['purchase_type']
        }])

        # Predict
        predicted_price = model.predict(input_data)[0]
        return jsonify({'predicted_price': round(predicted_price)}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/locations', methods=['GET'])
def get_locations():
    try:
        locations = df['new_sub_county'].dropna().unique().tolist()
        locations.sort()
        return jsonify({'subCounties': locations}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

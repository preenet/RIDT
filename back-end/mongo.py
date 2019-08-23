from datetime import datetime
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_DBNAME'] = 'local'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/local'
app.config['JWT_SECRET_KEY'] = 'secret'

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)


@app.route('/users/register', methods=["POST"])
def register():
    users = mongo.db.users
    username = request.get_json()['username']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    users.insert_one({
        'username': username,
        'password': password,
        'trial_time': 'pending',
        'status': 'pending'
    })

    new_user = users.find_one({'username': username})

    result = {'message': new_user['username'] + ' registered'}

    return jsonify({'result': result})


@app.route('/users/login', methods=['POST'])
def login():
    users = mongo.db.users
    username = request.get_json()['username']
    password = request.get_json()['password']
    response = users.find_one({'username': username})

    if response:
        if bcrypt.check_password_hash(response['password'], password):

            access_token = create_access_token(identity={
                'username': response['username'],
                'status': response['status'],
                'trial_time': response['trial_time'],
            })
            
            result = jsonify({'message': 'Login successfully', 'user': response['username'], 'token': access_token})

        else:
            result = jsonify({"error": "Invalid username and password"})

    else:
        result = jsonify({"result": "No results found"})
    return result


@app.route('/admin/login', methods=['POST'])
def admin_login():
    users = mongo.db.admins
    username = request.get_json()['username']
    password = request.get_json()['password']
    response = users.find_one({'username': username})

    if response:
        if response['password'] == password:
            access_token = create_access_token(identity={
                'username': response['username'],
            })
            result = jsonify({'message': 'Super admin login successfully', 'token': access_token})
        else:
            result = jsonify({"error": "Invalid username and password"})

    else:
        result = jsonify({"result": "No results found"})
    return result


@app.route('/admin/delete/<username>', methods=['DELETE'])
def delete_account(username):
    users = mongo.db.users
    print(username)
    response = users.delete_one({'username': username})
    if response.deleted_count == 1:
        result = {'message': 'User deleted'}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/users/get-by-username', methods=['GET'])
def get_account_by_username():
    users = mongo.db.users
    username = request.get_json()['username']
    response = users.find_one({'username': username})
    if response:
        result = {'message': 'User found',
                  'username': response['username'],
                  'trial_time ': response['trial_time'],
                  'status': response['status']
                  }
    else:
        result = {'message': 'No user found'}

    return jsonify({'result': result})


@app.route('/users/get-all', methods=['GET'])
def get_all_accounts():
    users = mongo.db.users
    result = []

    for field in users.find():
        result.append({'username': str(field['username']), 'status': field['status'],
                       'trial_time': field['trial_time']})
    return jsonify(result)


@app.route('/users/edit/username', methods=['POST'])
def edit_username():
    users = mongo.db.users
    username = request.get_json()['username']
    info = request.get_json()['info']
    response = users.find_one({'username': username})
    if response:
        new_values = {"$set": {"username": info}}
        users.update_one({'username': username}, new_values)
        result = {'message': username + ' is changed to ' + info}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/users/edit/password', methods=['POST'])
def edit_password():
    users = mongo.db.users
    username = request.get_json()['username']
    password = request.get_json()['password']
    new_password = bcrypt.generate_password_hash(request.get_json()['new_password']).decode('utf-8')
    response = users.find_one({'username': username})

    if response:
        if bcrypt.check_password_hash(response['password'], password):
            new_values = {"$set": {"password": new_password}}
            users.update_one({'username': username}, new_values)
            result = {'message': 'Password changed'}
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No user found"})
    return result


@app.route('/admin/approve', methods=['POST'])
def approve_user():
    users = mongo.db.users
    username = request.get_json()['username']
    response = users.find_one({'username': username})
    if response:
        trial_time = datetime.utcnow() + timedelta(days=7)
        new_status = {"$set": {"status": 'approved'}}
        new_trial_time = {"$set": {"trial_time": trial_time}}
        users.update_one({'username': username}, new_status)
        users.update_one({'username': username}, new_trial_time)
        result = {'message': username + '\'s request is approved'}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/admin/reject', methods=['POST'])
def reject_user():
    users = mongo.db.users
    username = request.get_json()['username']
    response = users.find_one({'username': username})
    if response:
        new_status = {"$set": {"status": 'rejected'}}
        users.update_one({'username': username}, new_status)
        result = {'message': username + '\'s request is rejected'}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/admin/get-pending', methods=['GET'])
def get_pending():
    users = mongo.db.users
    result = []
    response = users.find({'status': 'pending'})

    if response:
        for x in response:
            result.append({'username': x['username'],
                           'trial_time': x['trial_time'],
                           'status': x['status']})
    else:
        result = {'message': 'No user found'}

    return jsonify(results=result)


@app.route('/admin/add', methods=["POST"])
def add_user():
    users = mongo.db.users
    username = request.get_json()['username']
    trial_time = datetime.utcnow() + timedelta(days=request.get_json()['trial_time'])
    status = request.get_json()['status']
    password = bcrypt.generate_password_hash('super-admin').decode('utf-8')

    users.insert_one({
        'username': username,
        'password': password,
        'trial_time': trial_time,
        'status': status
    })

    new_user = users.find_one({'username': username})

    result = {'message': new_user['username'] + ' added'}

    return jsonify({'result': result})


@app.route('/admin/renew', methods=['POST'])
def trial_renew():
    users = mongo.db.users
    username = request.get_json()['username']
    renew = request.get_json()['renew']
    response = users.find_one({'username': username})
    if response:
        trial_time = response['trial_time'] + timedelta(days=renew)
        new_values = {"$set": {"trial_time": trial_time}}
        users.update_one({'username': username}, new_values)
        result = {'message': username + '\'s trial time is renewed to ' + str(trial_time)}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


if __name__ == '__main__':
    app.run(debug=True)

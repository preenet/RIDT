from datetime import datetime
from datetime import timedelta
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_pymongo import PyMongo
from data_provider import DataProvider


dp = DataProvider
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
    dp.record_log(new_user['username'], 'Register', new_user['username'] + ' registered')
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

            dp.record_log(username, 'Login', username + ' logged in')
            result = jsonify({'message': 'Login successfully', 'user': response['username'], 'token': access_token})

        else:
            dp.record_log(username, 'Login', username + ' logged in failed')
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
            dp.record_log(username, 'Login', username + ' logged in')
            result = jsonify({'message': 'Super admin login successfully', 'token': access_token})
        else:
            dp.record_log(username, 'login', username + ' logged in failed')
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No results found"})
    return result


@app.route('/admin/delete/<username>', methods=['DELETE'])
def delete_account(username):
    users = mongo.db.users
    response = users.delete_one({'username': username})
    if response.deleted_count == 1:
        dp.record_log('super admin', 'Delete', username + ' deleted')
        result = {'message': 'User deleted'}
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/users/get/<username>', methods=['GET'])
def get_account_by_username(username):
    users = mongo.db.users
    response = users.find_one({'username': username})
    access_token = []
    if response:
        result = {'message': 'User found',
                  'username': response['username'],
                  'trial_time': response['trial_time'],
                  'status': response['status']
                  }
        access_token = create_access_token(identity={
            'username': response['username'],
            'status': response['status'],
            'trial_time': response['trial_time'],
        })
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result, 'token': access_token})


@app.route('/users/get-all', methods=['GET'])
def get_all_accounts():
    users = mongo.db.users
    result = []

    for field in users.find():
        result.append({'username': str(field['username']), 'status': field['status'],
                       'trial_time': field['trial_time']})
    return jsonify(result)


@app.route('/admin/edit/', methods=['POST'])
def edit_user():
    users = mongo.db.users
    username = request.get_json()['username']
    info = request.get_json()['info']
    response = users.find_one({'username': username})
    status = request.get_json()['status']

    if response:
        new_values = {"$set": {"username": info}}
        users.update_one({'username': username}, new_values)
        new_status = {"$set": {"status": status}}
        users.update_one({'username': username}, new_status)
        result = {'message': username + ' is changed to ' + info}
        dp.record_log('super admin', 'Edit', username + ' edit information')
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
    if new_password == '':
        new_password = password
    if response:
        if bcrypt.check_password_hash(response['password'], password):
            new_values = {"$set": {"password": new_password}}
            users.update_one({'username': username}, new_values)
            result = {'message': 'Password changed'}
            dp.record_log(username, 'Edit', username + ' edit password')
        else:
            result = jsonify({"error": "Invalid username and password"})
    else:
        result = jsonify({"result": "No user found"})
    return result


@app.route('/users/edit/username', methods=['POST'])
def edit_username():
    users = mongo.db.users
    username = request.get_json()['username']
    info = request.get_json()['info']
    response = users.find_one({'username': username})
    if info == '':
        info = username

    if response:
        new_values = {"$set": {"username": info}}
        users.update_one({'username': username}, new_values)
        result = {'message': 'Username changed'}
        dp.record_log(username, 'Edit', username + ' edit username')
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
        dp.record_log('super admin', 'Approve', username + ' approved')
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
        dp.record_log('super admin', 'Reject', username + ' rejected')
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
    dp.record_log('super admin', 'Add', username + ' added')
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
        dp.record_log('super admin', 'Renew', username + ' trial time renewed ' + renew + ' days')
    else:
        result = {'message': 'No user found'}
    return jsonify({'result': result})


@app.route('/admin/approve-all', methods=['POST'])
def approve_all():
    users = mongo.db.users
    response = users.find({'status': 'pending'})

    if response:
        trial_time = datetime.utcnow() + timedelta(days=7)
        new_status = {"$set": {"status": 'approved'}}
        new_trial_time = {"$set": {"trial_time": trial_time}}
        x = users.update_many({'status': 'pending'}, new_status)
        users.update_many({'status': 'pending'}, new_trial_time)
        result = {'message': str(x.modified_count) + ' users \' request are approved'}
        dp.record_log('super admin', 'Approve', ' all user approved')
    else:
        result = {'message': 'No user found'}

    return jsonify(results=result)


@app.route('/admin/reject-all', methods=['POST'])
def reject_all():
    users = mongo.db.users
    response = users.find({'status': 'pending'})

    if response:

        new_status = {"$set": {"status": 'rejected'}}
        new_trial_time = {"$set": {"trial_time": 'pending'}}
        x = users.update_many({'status': 'pending'}, new_status)
        users.update_many({'status': 'pending'}, new_trial_time)
        result = {'message': str(x.modified_count) + ' users \' request are rejected'}
        dp.record_log('super admin', 'Reject', ' all user rejected')
    else:
        result = {'message': 'No user found'}

    return jsonify(results=result)


# Progress2
@app.route('/data/get-number', methods=['GET'])
def get_number():
    total = dp.get_total()
    positive = dp.get_positive()
    negative = dp.get_negative()
    neutral = dp.get_neutral()
    p_positive = "{0:.1f}%".format(positive/total * 100)
    p_negative = "{0:.1f}%".format(negative/total * 100)
    p_neutral = "{0:.1f}%".format(neutral/total * 100)
    result = {'total_number': total, 'positive_number': positive,
              'negative_number': negative, 'neutral_number': neutral,
              'p_positive': p_positive, 'p_negative': p_negative, 'p_neutral': p_neutral}
    return jsonify(results=result)


@app.route('/data/get-total-count', methods=['GET'])
def get_total_count():
    result = []
    for each in dp.get_count_by_date():
        result.append({'date': each['_id'], 'count': each['count']})

    return jsonify(results=result)


@app.route('/data/get-positive-count', methods=['GET'])
def get_count_positive():
    result = []
    for each in dp.get_count_by_date_positive():
        result.append({'date': each['_id'], 'count': each['count']})

    return jsonify(results=result)


@app.route('/data/get-negative-count', methods=['GET'])
def get_count_negative():
    result = []
    for each in dp.get_count_by_date_negative():
        result.append({'date': each['_id'], 'count': each['count']})

    return jsonify(results=result)


@app.route('/data/get-neutral-count', methods=['GET'])
def get_count_neutral():
    result = []
    for each in dp.get_count_by_date_neutral():
        result.append({'date': each['_id'], 'count': each['count']})

    return jsonify(results=result)


@app.route('/data/get-hotel', methods=['GET'])
def get_hotel():
    result = []
    for each in dp.get_hotel():
        result.append({'hotel': each['_id'], 'count': each['count']})

    return jsonify(results=result)


@app.route('/data/get-hotel/<hotel>', methods=['GET'])
def get_hotel_by_name(hotel):
    result = dp.get_hotel_by_name(hotel)
    return jsonify(result)


@app.route('/data/add-comment', methods=["POST"])
def add_comment():
    content = request.get_json()['content']
    hotel = request.get_json()['hotel']
    user = request.get_json()['user']

    result = dp.add_comment(content, hotel)
    dp.record_log(user, 'Comment', user + ' wrote a comment')
    return result


@app.route('/data/get-log', methods=["GET"])
def get_log():
    result = dp.get_log()
    return jsonify(result)


@app.route('/data/get-words', methods=["GET"])
def get_words():
    result = dp.get_words()
    return jsonify(result)


@app.route('/data/get-top10', methods=['GET'])
def get_top10():
    result = dp.get_top10()
    return jsonify(result)


@app.route('/data/get-line', methods=['GET'])
def get_positive_line():
    result = dp.get_positive_line()
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)

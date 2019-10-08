import pymongo
from datetime import datetime
from textblob import TextBlob

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["local"]


class DataProvider:
    @staticmethod
    def get_total():
        col = db["reviews"]
        total_number = col.count()
        return total_number

    @staticmethod
    def get_positive():
        col = db["positive"]
        positive_number = col.find({}).count()
        return positive_number

    @staticmethod
    def get_negative():
        col = db["negative"]
        negative_number = col.find({}).count()
        return negative_number

    @staticmethod
    def get_neutral():
        col = db["neutral"]
        neutral_number = col.find({}).count()
        return neutral_number

    @staticmethod
    def get_all():
        col = db["reviews"]
        total = col.find()
        result = list(total)
        return result

    @staticmethod
    def get_count_by_date():
        col = db["reviews"]
        pipeline = [
            {"$unwind": "$date"},
            {"$group": {"_id": "$date", "count": {"$sum": 1}}}]
        result = list(col.aggregate(pipeline))

        result.sort(key=lambda item: item['_id'], reverse=False)
        return result

    @staticmethod
    def get_count_by_date_positive():
        col = db["positive"]
        pipeline = [
            {"$unwind": "$date"},
            {"$group": {"_id": "$date", "count": {"$sum": 1}}}]
        result = list(col.aggregate(pipeline))
        result.sort(key=lambda item: item['_id'], reverse=False)
        return result

    @staticmethod
    def get_count_by_date_negative():
        col = db["negative"]
        pipeline = [
            {"$unwind": "$date"},
            {"$group": {"_id": "$date", "count": {"$sum": 1}}}]
        result = list(col.aggregate(pipeline))
        result.sort(key=lambda item: item['_id'], reverse=False)
        return result

    @staticmethod
    def get_count_by_date_neutral():
        col = db["neutral"]
        pipeline = [
            {"$unwind": "$date"},
            {"$group": {"_id": "$date", "count": {"$sum": 1}}}]
        result = list(col.aggregate(pipeline))
        result.sort(key=lambda item: item['_id'], reverse=False)
        return result

    @staticmethod
    def get_hotel():
        col = db["reviews"]
        pipeline = [
            {"$unwind": "$hotel"},
            {"$group": {"_id": "$hotel", "count": {"$sum": 1}}}]
        result = list(col.aggregate(pipeline))
        result.sort(key=lambda item: item['count'], reverse=False)
        return result

    @staticmethod
    def get_hotel_by_name(name):
        col = db["reviews"]
        response = col.find({'hotel': name})
        result = []
        if response:
            for each in response:
                result.append({'c_id': each['c_id'], 'date': each['date'], 'rating': each['rating'],
                               'content': each['content']})

        else:
            result = {'message': 'No hotel found'}
        return result

    @staticmethod
    def add_comment(content, hotel):
        col = db["reviews"]
        last_id = list(col.find({}, {'c_id': 1}))[-1]['c_id']
        rating = 0
        text = TextBlob(content)
        sentiment = text.polarity
        if sentiment <= -0.7:
            rating = 10
        elif -0.7 < sentiment <= 0:
            rating = 20
        elif 0 < sentiment <= 0.4:
            rating = 30
        elif 0.4 < sentiment <= 0.7:
            rating = 40
        elif sentiment > 0.7:
            rating = 50

        date = datetime.today().strftime('%Y-%m-%d')
        if rating < 30:
            col = db['negative']
            col.insert_one({
                'date': date,
                'c_id': last_id + 1,
                'content': content,
                'hotel': hotel,
                'rating': rating,
            })
        elif rating == 30:
            col = db['neutral']
            col.insert_one({
                'date': date,
                'c_id': last_id + 1,
                'content': content,
                'hotel': hotel,
                'rating': rating,
            })

        elif rating > 30:
            col = db['positive']
            col.insert_one({
                'date': date,
                'c_id': last_id + 1,
                'content': content,
                'hotel': hotel,
                'rating': rating,
            })

        col = db["reviews"]
        col.insert_one({
            'date': date,
            'c_id': last_id+1,
            'content': content,
            'hotel': hotel,
            'rating': rating,
        })

        result = {'message': 'comment added'}

        return result

    @staticmethod
    def record_log(user, event, content):
        col = db["logs"]

        last_id = list(col.find({}, {'log_id': 1}))[-1]['log_id']
        time = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        col.insert_one({
            'log_id': last_id + 1,
            'time': time,
            'type': event,
            'content': content,
            'creator': user,
        })

    @staticmethod
    def get_log():
        col = db['logs']
        result = []
        for each in col.find({}):
            result.append({
                'log_id': each['log_id'],
                'type': each['type'],
                'content': each['content'],
                'creator': each['creator'],
                'time': each['time']
            })
        return result

    @staticmethod
    def delete():
        col = db['logs']
        col.delete_many({'log_id': 22})


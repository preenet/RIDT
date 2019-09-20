import pymongo
from datetime import datetime

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
        col = db["reviews"]
        positive_number = col.find({'rating': {"$gt": 30}}).count()
        return positive_number

    @staticmethod
    def get_negative():
        col = db["reviews"]
        negative_number = col.find({'rating': {"$lt": 30}}).count()
        return negative_number

    @staticmethod
    def get_neutral():
        col = db["reviews"]
        neutral_number = col.find({'rating': {"$eq": 30}}).count()
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

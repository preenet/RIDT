import pymongo

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

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
            'c_id': last_id + 1,
            'content': content,
            'hotel': hotel,
            'rating': rating,
        })

        col = db['words']
        r = TextBlob(content)
        top10 = list(col.find({}, {'_id': 0, 'word': 1, 'count': 1}))[:10]
        for i in range(10):
            for each in r.word_counts.keys():
                if each == top10[i]['word']:
                    old = top10[i]['count']
                    query = {"word": each}
                    new_values = {"$set": {"count": old + r.word_counts.get(each)}}
                    col.update_one(query, new_values)

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
    def get_words():
        col = db['words']
        result = []
        for each in col.find({}):
            result.append({
                'text': each['word'],
                'value': each['count']
            })

        return result

    @staticmethod
    def get_top10():
        result = []
        col = db["reviews"]
        pipeline = [
            {"$unwind": "$hotel"},
            {"$group": {"_id": "$hotel", "count": {"$sum": 1}}}]
        review = list(col.aggregate(pipeline))
        review.sort(key=lambda item: item['count'], reverse=False)

        for each in review[-10:]:
            positive = 0
            negative = 0
            neutral = 0
            total = col.find({"hotel": each["_id"]}).count()

            for e in col.find({"hotel": each["_id"]}):
                text = TextBlob(e['content'])
                sentiment = text.polarity
                if sentiment <= -0.7:
                    negative += 1
                elif -0.7 < sentiment <= 0:
                    negative += 1
                elif 0 < sentiment <= 0.4:
                    neutral += 1
                elif 0.4 < sentiment <= 0.7:
                    positive += 1
                elif sentiment > 0.7:
                    positive += 1

            result.append({"hotel": each["_id"], "positive": positive, "negative": negative, "neutral": neutral,
                           "p_positive": "{0:.1f}%".format(positive / total * 100),
                           "p_negative": "{0:.1f}%".format(negative / total * 100),
                           "p_neutral": "{0:.1f}%".format(neutral / total * 100),
                           })

        return result

    @staticmethod
    def get_rate():
        result = []
        col = db['positive']
        pipeline = [
            {"$unwind": "$date"},
            {"$group": {"_id": "$date", "count": {"$sum": 1}}}]
        positive = list(col.aggregate(pipeline))
        col = db['reviews']
        total = list(col.aggregate(pipeline))
        c = 0
        positive.sort(key=lambda item: item['_id'], reverse=False)
        total.sort(key=lambda item: item['_id'], reverse=False)
        years = ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015",
                 "2016", "2017", "2018", "2019", ]
        i = 0
        for each in total[:]:

            if each["_id"][0:4] == years[i]:
                c += each["count"]

            else:

                result.append([years[i], c])
                c = 0
                i = i + 1

        result.append([years[i], c])
        return result

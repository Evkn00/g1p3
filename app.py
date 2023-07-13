import pymongo
import json
from flask import Flask, jsonify
from bson import ObjectId 


#Setup DB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["Project3"]
collection = db["ship_wreck_data"]
app = Flask(__name__)

# JSON encoder function to handle ObjectId serialization
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

app = Flask(__name__)
app.json_encoder = JSONEncoder 


@app.route('/documents', methods=['GET'])
def get_documents():
    documents = list(collection.find({}))
    return jsonify(documents)

if __name__ == '__main__':
    app.run(debug=True)
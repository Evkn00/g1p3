import pymongo
import json
import re
import re
from flask import Flask, jsonify
from bson import ObjectId 
from flask_cors import CORS, cross_origin

#Setup DB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["Project3"]
collection = db["ship_wreck_data"]
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# JSON encoder function to handle ObjectId serialization
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return super().default(o)

app = Flask(__name__)
app.json_encoder = JSONEncoder 

#route with all documents
@app.route('/documents', methods=['GET'])
@cross_origin()
def get_documents():
    documents = list(collection.find({}))
    return jsonify(documents)

#route to filter by ship type
@app.route('/documents/ship/<ship_type>', methods=['GET'])
@cross_origin()
def get_ship_documents(ship_type):
    ship_documents = list(collection.find({"properties.RIGDESC": ship_type}))

    results = []
    #loop through the returned documents and append to results
    for document in ship_documents:
        # Convert MongoDB document to GeoJSON format
        geojson = {
            "type": "Feature",
            "geometry": document['geometry'],
            "properties": document['properties']
        }
        results.append(geojson)

    return jsonify(results)

# Route to filter by year
@app.route('/documents/<int:start_year>/<int:end_year>', methods=['GET'])
@cross_origin()
def getYearDocuments(start_year, end_year):
    # Modify the query to filter by build date and loss date
    ship_documents = list(collection.find({
        "$and": [
            {"properties.BUILDDATE": {"$gte": start_year}},
            {"properties.LOSSDATE": {"$lte": end_year}}
        ]
    }))

    results = []
    # Loop through the returned documents and append to results
    for document in ship_documents:
        # Convert MongoDB document to GeoJSON format
        geojson = {
            "type": "Feature",
            "geometry": document['geometry'],
            "properties": document['properties']
        }
        results.append(geojson)

    return jsonify(results)

#Launch the app 
if __name__ == '__main__':
    app.run(debug=True)
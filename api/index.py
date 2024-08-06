from flask import Flask, request
import json

# load the hospital information & trend data
f = open("data/hospital_averages.json")
hospital_trend_data = json.load(f)
f = open("data/hospital_information.json")
hospitals_information_data = json.load(f)
f.close()

# create the flask app
app = Flask(__name__)

@app.route("/api/hospitals")
def get_hospitals():
    hospitals_information = {} 
    for slug, information in hospitals_information_data.items():
        hospital_information = {}
        hospital_name = information["name"]
        hospital_information["slug"] = slug
        hospital_information["region"] = information["region"]
        hospitals_information[hospital_name] = hospital_information
    
    return hospitals_information

@app.route("/api/hospitals/<string:slug>")
def get_hospital(slug):
    if slug not in hospitals_information_data: raise LookupError(f"Hospital with slug {slug} does not exist")
    return hospitals_information_data[slug]

@app.route("/api/hospitals/<string:slug>/trend")
def get_hospital_trend(slug):
    try:
        hospital = get_hospital(slug)["name"]
    except LookupError:
        raise LookupError(f"Hospital with slug {slug} does not exist")
    
    if hospital not in hospital_trend_data: raise AssertionError(f"Hospital name of {hospital} does not exist")
    return hospital_trend_data[hospital]
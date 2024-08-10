from flask import Flask, request, abort
import requests # type: ignore
from datetime import datetime, timedelta
import json
import pytz

# mapping
hospital_acronyms = {
  "Alice Ho Miu Ling Nethersole Hospital": "AHMLNH",
  "Caritas Medical Centre": "CMC",
  "Kwong Wah Hospital": "KWH",
  "North District Hospital": "NDH",
  "North Lantau Hospital": "NLH",
  "Princess Margaret Hospital": "PMH",
  "Pok Oi Hospital": "POH",
  "Prince of Wales Hospital": "POWH",
  "Pamela Youde Nethersole Eastern Hospital": "PYNEH",
  "Queen Elizabeth Hospital": "QEH",
  "Queen Mary Hospital": "QMH",
  "Ruttonjee Hospital": "RH",
  "St John Hospital": "SJH",
  "Tseung Kwan O Hospital": "TKOH",
  "Tuen Mun Hospital": "TMH",
  "Tin Shui Wai Hospital": "TSWH",
  "United Christian Hospital": "UCH",
  "Yan Chai Hospital": "YCH"
}

wait_mapping = {
    'Around 1 hour': 1,
    'Over 1 hour': 2,
    'Over 2 hours': 3,
    'Over 3 hours': 4,
    'Over 4 hours': 5,
    'Over 5 hours': 6,
    'Over 6 hours': 7,
    'Over 7 hours': 8,
    'Over 8 hours': 9
}

day_names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

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
    return hospitals_information_data

@app.route("/api/hospitals/<string:slug>")
def get_hospital(slug):
    if slug not in hospitals_information_data: abort(400, description=f"Hospital with slug {slug} does not exist")
    return hospitals_information_data[slug]

@app.route("/api/hospitals/<string:slug>/trend")
def get_hospital_trend(slug):
    try:
        hospital = get_hospital(slug)["name"]
    except:
        abort(400, description=f"Hospital with slug {slug} does not exist")
    
    if hospital not in hospital_trend_data: abort(404, description=f"Hospital name of {hospital} does not exist")
    return hospital_trend_data[hospital]

@app.route("/api/hospitals/<string:slug>/hourly-trend/<int:day>/<string:hour>")
def get_hourly_hospital_trend(slug, day, hour):
    # Validate day and hour
    if not (0 <= day <= 6) or not (0 <= int(hour) <= 23):
        abort(400, description="Invalid day or hour. Day must be 0-6 and hour must be 0-23.")
    
    try:
        trend_data = get_hospital_trend(slug)
        # app.logger.info(trend_data[day_names[day]])
        app.logger.info(trend_data[day_names[day]][hour])
        trend_value = trend_data[day_names[day]][hour]
    except:
        abort(404, description=f"No trend data available for {slug} on day {day} hour {hour}")
    
    return str(trend_value)

@app.route("/api/hospitalsWaitTime")
def get_hospitals_wait_time():
    endpoint = "https://www.ha.org.hk/opendata/aed/aedwtdata-en.json"
    
    # Get the API response
    response = requests.get(endpoint)
    if response.status_code != 200:
        return None
    
    # Get data & parse JSON
    data = json.loads(response.text)
    
    # Modify response based on the hospital acronym mappings and wait time mappings
    wait_times = data["waitTime"]
    hospitals = {}
    
    for wait_time in wait_times:
        hosp_name = wait_time["hospName"]
        if hosp_name in hospital_acronyms:
            hospitals[hospital_acronyms[hosp_name]] = wait_mapping[wait_time["topWait"]]

    # Parse the updateTime using the correct format and set it to Hong Kong time zone
    # hong_kong_tz = pytz.timezone('Asia/Hong_Kong')
    # update_time = datetime.strptime(data['updateTime'], "%d/%m/%Y %I:%M%p")
    # update_time = update_time.replace(tzinfo=pytz.utc).astimezone(hong_kong_tz)
    
    hospitals_wait_time = {"updateTime": data['updateTime'], "hospitals": hospitals}
    
    return hospitals_wait_time

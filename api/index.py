from flask import Flask
import requests # type: ignore
import json

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

# create the flask app
app = Flask(__name__)

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
    
    hospitals_wait_time = {"updateTime": data['updateTime'], "hospitals": hospitals}
    
    return hospitals_wait_time

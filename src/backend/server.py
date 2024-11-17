from fastapi import FastAPI
from pgeocode import Nominatim
import requests
from datetime import datetime, date, timedelta, timezone
import time
import config

app = FastAPI()

isos = {
    "AL": "spp", "AZ": "caiso", "AR": "miso", "CA": "caiso",
    "CO": "spp", "CT": "isone", "DE": "pjm", "FL": "spp", "GA": "spp",
    "ID": "caiso", "IL": "miso", "IN": "miso", "IA": "miso",
    "KS": "spp", "KY": "pjm", "LA": "miso", "ME": "isone", "MD": "pjm",
    "MA": "isone", "MI": "miso", "MN": "miso", "MS": "miso", "MO": "miso",
    "MT": "miso", "NE": "spp", "NV": "caiso", "NH": "isone", "NJ": "pjm",
    "NM": "caiso", "NY": "nyiso", "NC": "pjm", "ND": "spp", "OH": "pjm",
    "OK": "spp", "OR": "caiso", "PA": "pjm", "RI": "isone", "SC": "pjm",
    "SD": "spp", "TN": "pjm", "TX": "ercot", "UT": "caiso", "VT": "isone",
    "VA": "pjm", "WA": "caiso", "WV": "pjm", "WI": "miso", "WY": "spp",
    "DC": "pjm"
}

headers = {
    "x-api-key" : config.grid_status_api_key
}

@app.get("/fuel_mix")
async def read_fuel_mix(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_fuel_mix/query"
        params = {
            "start_time" : datetime.combine(datetime.now(tz=timezone.utc), datetime.min.time()).strftime("%Y-%m-%d %H:%M:%S"),
            "end_time" : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }
        data = requests.get(url, headers=headers, params=params).json()
        fuel_mix = data['data']
        return fuel_mix
    else:
        return -1

@app.get("/loads")
async def read_loads(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_load/query"
        params = {
            "time" : "latest"
        }
        data = requests.get(url, headers=headers, params=params).json()
        load = data['data'][0]['load']
        return load
    else:
        return -1

@app.get("/main-source")
async def read_main_source(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_fuel_mix/query"
        params = {
            "time" : "latest"
        }
        response = requests.get(url, headers=headers, params=params)
        data = response.json()
        fuel_mix = data['data'][0]
        max = float('-inf')
        main_source = ""
        for fuel, use in fuel_mix.items():
            if fuel == 'interval_start_utc' or fuel == 'interval_end_utc':
                continue
            if int(use) > max:
                max = int(use)
                main_source = fuel
                
            name = main_source.split('_')
            name = [a.capitalize() for a in name]
            
        return ' '.join(name)
            
    else:
        return ""
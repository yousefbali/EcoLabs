

from fastapi import FastAPI
from pgeocode import Nominatim
import requests
from datetime import datetime, date, timedelta, timezone
import time
import config
from datetime import datetime
from zoneinfo import ZoneInfo
from pytz import timezone

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

# Returns a list of dictionaries with data from start of current day to current time
@app.get("/fuel_mix")
async def read_fuel_mix(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_fuel_mix/query"
        params = {
            "start_time" : datetime.combine(datetime.now(tz=timezone.utc), datetime.min.time()).strftime("%Y-%m-%d %H:%M:%S"),
        }
        data = requests.get(url, headers=headers, params=params).json()
        fuel_mix = data['data']
        return fuel_mix
    else:
        return -1

# Returns the current load of the state grid (int)
@app.get("/loads")
async def read_loads(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_load/query"
        params = {
            "time" : "latest"
        }
        data = requests.get(url, headers=headers, params=params).json()
        print(data)
        load = data['data'][0]['load']
        return load
    else:
        return -1

# Returns current (latest) main source of fuel for the given state (str)
@app.get("/main_source")
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

@app.get("/best_time")
async def best_time_usage(state: str):
    if state in isos:
        iso = isos[state]
        url = f"https://api.gridstatus.io/v1/datasets/{iso}_fuel_mix/query"
        params = {
            "start_time" : (datetime.now(tz=timezone.utc) - timedelta(days = 1)).strftime("%Y-%m-%d %H:%M:%S"),
        }
        data = requests.get(url, headers=headers, params=params).json()
        fuel_mix = data['data']
        renewables = ["geothermal", "hydro", "large_hydro", "other_renewables", "solar", "small_hydro", "wind", "refuse", "landfill_gas", "wood", "biogas", "biomass", "waste_disposal_services", "waste_heat"]
        
        max_ratio = float('-inf')
        best_time = datetime.now()
        
        for stamp in fuel_mix:
            renew_val = 0
            total_val = 0
            for fuel, use in stamp.items():
                if fuel == 'interval_start_utc' or fuel == 'interval_end_utc':
                    continue
                if fuel in renewables:
                    renew_val += use
                
                total_val += use
            
            curr_ratio = renew_val/total_val
            if curr_ratio > max_ratio:
                max_ratio = curr_ratio
                best_time = stamp['interval_start_utc']
        
        return best_time




#
#
#         from datetime import datetime, timedelta, timezone
#         from zoneinfo import ZoneInfo
#         import requests
#         from fastapi import FastAPI
#
#         app = FastAPI()
#
#         isos = {
#             "TX": "ercot",  # Example for Texas
#             # Add more state mappings
#         }
#
#         headers = {
#             "x-api-key": "your_api_key"
#         }
#
#         @app.get("/best_time")
#         async def best_time_usage(state: str):
#             if state in isos:
#                 iso = isos[state]
#                 url = f"https://api.gridstatus.io/v1/datasets/{iso}_fuel_mix/query"
#                 params = {
#                     "start_time": (datetime.now(tz=timezone.utc) - timedelta(days=1)).strftime("%Y-%m-%d %H:%M:%S"),
#                 }
#                 response = requests.get(url, headers=headers, params=params).json()
#                 fuel_mix = response['data']
#
#                 renewables = ["geothermal", "hydro", "solar", "wind", "biomass"]
#                 max_ratio = float('-inf')
#                 best_time_utc = None
#
#                 for stamp in fuel_mix:
#                     renew_val = 0
#                     total_val = 0
#                     for fuel, use in stamp.items():
#                         if fuel in renewables:
#                             renew_val += use
#                         total_val += use
#                     if total_val > 0:
#                         curr_ratio = renew_val / total_val
#                         if curr_ratio > max_ratio:
#                             max_ratio = curr_ratio
#                             best_time_utc = stamp['interval_start_utc']  # UTC timestamp
#
#                 if best_time_utc:
#                     # Convert UTC to Central Time
#                     best_time_ct = datetime.fromisoformat(best_time_utc).replace(tzinfo=timezone.utc).astimezone(ZoneInfo("America/Chicago"))
#                     return {"best_time_ct": best_time_ct.strftime("%Y-%m-%d %H:%M:%S")}
#                 else:
#                     return {"error": "No data available"}
#
#             return {"error": "Invalid state"}

import streamlit as st
import pandas as pd
import numpy as np
import requests
from datetime import datetime

states = ["AL", "AZ", "AR", "CA",
    "CO", "CT", "DE", "FL", "GA",
    "ID", "IL", "IN", "IA",
    "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO",
    "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH",
    "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT",
    "VA", "WA", "WV", "WI", "WY",
    "DC"]

st.write("# Welcome to EcoLabs")




# FastAPI base URL
base_url = "http://127.0.0.1:8000/best_time?state=TX"

# Fetch data from FastAPI
def fetch_best_time(state):
    url = f"{base_url}/best_time?state={state}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # Assuming FastAPI returns ISO timestamp
    else:
        st.error(f"Error fetching data: {response.status_code}")
        return None

# Fetch data for fuel mix
def fetch_fuel_mix(state):
    url = f"{base_url}/fuel_mix?state={state}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        st.error(f"Error fetching data: {response.status_code}")
        return None

# Fetch and display the best time to use electricity
# st.subheader("Best Time for Renewable Usage")
# if st.button("Get Best Time"):
#     best_time = fetch_best_time(state)
#     if best_time:
#         # Format and display the best time
#         best_time_dt = datetime.fromisoformat(best_time)
#         st.success(f"The best time for renewable usage in {state} is: {best_time_dt.strftime('%Y-%m-%d %H:%M:%S')}")
#
# # Fetch and display fuel mix data
# st.subheader("Fuel Mix Data")
# if st.checkbox("Show Fuel Mix"):
#     fuel_mix_data = fetch_fuel_mix(state)
#     if fuel_mix_data:
#         st.write(f"Fuel mix data for {state}:")
#         st.json(fuel_mix_data)  # Display raw JSON


















state_name = st.sidebar.selectbox("Choose your state", states)
st.sidebar.write("By selecting your state we will tell you more about the electricity grid in your area!")

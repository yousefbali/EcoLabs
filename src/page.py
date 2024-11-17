from time import sleep
import streamlit as st
import pandas as pd
import numpy as np
import requests
import matplotlib.pyplot as plt
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


state_name = st.sidebar.selectbox("Choose your state", states)
st.sidebar.write("By selecting your state we will tell you more about the electricity grid in your area!")

# FastAPI base URL
base_url = "http://127.0.0.1:8000/"

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

def fetch_load(state):
    url = f"{base_url}/loads?state={state}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # Assuming FastAPI returns ISO timestamp
    else:
        st.error(f"Error fetching data: {response.status_code}")
        return None

def fetch_main_source(state):
    url = f"{base_url}/main_source?state={state}"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()  # Assuming FastAPI returns ISO timestamp
    else:
        st.error(f"Error fetching data: {response.status_code}")
        return None

# This does not work
# st.success(fetch_best_time(state_name))

row = st.columns(3)

def add_row(row):
    with row[0]:
        st.success(f"Best time to use energy: {fetch_best_time(state_name)}")
        sleep(2)
    with row[1]:
        st.success(f"Grid load: {fetch_load(state_name)}")
        sleep(2)
    with row[2]:
        st.success(f"Main source: {fetch_main_source(state_name)}")
        sleep(2)

sleep(2)
add_row(row)

st.subheader("Fuel Mix Data")
fuel_mix_data = fetch_fuel_mix(state_name)
df = pd.DataFrame(fuel_mix_data)

col_list = []
name_list = []
for name, val in fuel_mix_data[0].items():
    if name != 'interval_start_utc' and name != 'interval_end_utc':
        col_list.append(df[name].to_list())
        name_list.append(name)

df['time'] = df['interval_start_utc'].str[11:16]

fig, ax = plt.subplots()
for col in col_list:
    ax.plot( df['time'].to_list(), col)

ax.set_xlabel('Time')
ax.set_ylabel('Fuel Mix')
ax.legend(name_list)
plt.tick_params(left = False, right = False , labelleft = False , 
                labelbottom = False, bottom = False) 
st.pyplot(fig)

# for fuel_mix_data:
#     # Prepare data for visualization
#     fuel_mix = fuel_mix_data.get("fuel_mix", {})
#     if fuel_mix:
#         df = pd.DataFrame(list(fuel_mix.items()), columns=["Fuel Type", "Percentage"])

#         # Display as a bar chart using Streamlit
#         st.bar_chart(data=df.set_index("Fuel Type"))

#         # Custom Matplotlib Visualization
#         st.write("### Fuel Mix Breakdown")
#         fig, ax = plt.subplots()
#         ax.bar(df["Fuel Type"], df["Percentage"], color="skyblue")
#         ax.set_title(f"Fuel Mix in {state_name}")
#         ax.set_xlabel("Fuel Type")
#         ax.set_ylabel("Percentage")
#         plt.xticks(rotation=45)
#         st.pyplot(fig)
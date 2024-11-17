import streamlit as st
import pandas as pd
import numpy as np

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

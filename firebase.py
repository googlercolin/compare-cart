import json
import pandas as pd
import requests
from urllib.parse import urlparse
import sys

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("cred.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

print("Firebase Initialized.")

# load json file
with open('onyxcoffeelab.json') as f:
    data = json.load(f)


doc_ref = db.collection("links").document()
doc_ref.set(data)
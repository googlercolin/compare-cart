# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

import sys
from pathlib import Path

sys.path.insert(0, Path(__file__).parent.as_posix())

# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

# The urllib.parse library to parse URL parameters.
import urllib.parse

import fn_scraper

from human_id import generate_id

app = initialize_app()

@https_fn.on_request()
def save_jsons(req: https_fn.Request) -> https_fn.Response:
    """Take the HTTP request passed to this HTTP endpoint and return a list of doc_ref.ids of the product_jsons added to Firestore."""

    firestore_client: google.cloud.firestore.Client = firestore.client()
    url_array = get_urls(req)

    domain_product_json_str_dict = {}
    for url in url_array:
        product_json_str, domain = fn_scraper.return_products_as_json_string_and_domain(url)
        domain_product_json_str_dict[domain] = product_json_str

    # Push the new dict into Cloud Firestore using the Firebase Admin SDK.
    custom_id = generate_id()
    _ = firestore_client.collection("product_jsons").document(custom_id).set(domain_product_json_str_dict)
    # Send back a message that we've successfully written the message
    return https_fn.Response(f"product_json_strs with doc ID {custom_id} added.")


def get_urls(req: https_fn.Request) -> list:
    """Take the urls parameter passed to this HTTP endpoint and return a list of URLs."""

    # Grab the urls parameter.
    encoded_url_array_string = req.args.get("urls")
    if encoded_url_array_string is None:
        return []  # Return an empty list

    # Decode the parsed string
    decoded_url_array_string = urllib.parse.unquote(encoded_url_array_string)

    # Convert the string back to a list
    decoded_url_array = eval(decoded_url_array_string)
    return decoded_url_array



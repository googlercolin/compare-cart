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
def add_products(req: https_fn.Request) -> https_fn.Response:
    """Take the HTTP request passed to this HTTP endpoint and return a list of doc_ref.ids of the product_jsons added to Firestore."""

    firestore_client: google.cloud.firestore.Client = firestore.client()

    url_array = req.json.get('urls')

    prods_added = []
    custom_id = req.json.get('id') or generate_id()

    for url in url_array:
        products_df, _ = fn_scraper.return_products_as_json_string_and_domain(url)
        products = products_df.to_dict(orient='records')

        for product in products:
            prods_added.append(product['handle'])
            firestore_client.collection('unique_links').document(custom_id).set({'id': custom_id}, merge=True)
            firestore_client.collection('unique_links').document(custom_id).collection('products').document(str(product['id'])).set(product, merge=True)

    return https_fn.Response(f"products: {prods_added} added to collection with unique link {custom_id}.")

@https_fn.on_request()
def delete_product(req: https_fn.Request) -> https_fn.Response:
    """Take the HTTP request passed to this HTTP endpoint and return a list of doc_ref.ids of the product_jsons added to Firestore."""

    firestore_client: google.cloud.firestore.Client = firestore.client()

    product_id = req.json.get('product_id')

    custom_id = req.json.get('id')
    firestore_client.collection('unique_links').document(custom_id).collection('products').document(product_id).delete()

    return https_fn.Response(f"products: {product_id} deleted from collection with unique link {custom_id}.")


# def get_urls(req: https_fn.Request) -> list:
#     """Take the urls parameter passed to this HTTP endpoint and return a list of URLs."""

#     # print("hi", req.json.get('urls'))
#     # Grab the urls parameter.
#     encoded_url_array_string = req.json.get("urls")
#     if encoded_url_array_string is None:
#         return []  # Return an empty list

#     # # Decode the parsed string
#     # decoded_url_array_string = urllib.parse.unquote(encoded_url_array_string)

#     # # Convert the string back to a list
#     # decoded_url_array = eval(decoded_url_array_string)
#     return encoded_url_array_string



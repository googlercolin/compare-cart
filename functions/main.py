# Deploy with `firebase deploy`

import sys
from pathlib import Path
from typing import Any

sys.path.insert(0, Path(__file__).parent.as_posix())

# The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
from firebase_functions import firestore_fn, https_fn, options

# The Firebase Admin SDK to access Cloud Firestore.
from firebase_admin import initialize_app, firestore
import google.cloud.firestore

import fn_scraper

from human_id import generate_id

app = initialize_app()

@https_fn.on_call(cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ))
def add_products_callable(req: https_fn.CallableRequest) -> Any:
    """
    Take the HTTP request passed to this HTTP endpoint and return a list of doc_ref.ids 
    of the product_jsons added to Firestore.
    
    Args:
        req (https_fn.CallableRequest): The HTTP request object containing data.

    Returns:
        Any: A response containing a message, list of products added, and the custom ID.
    """

    firestore_client: google.cloud.firestore.Client = firestore.client()

    url_array = req.data.get('urls')

    prods_added = []
    custom_id = req.data.get('id') or generate_id()

    for url in url_array:
        products_df, _ = fn_scraper.return_products_as_json_string_and_domain(url)
        products = products_df.to_dict(orient='records')

        for product in products:
            prods_added.append(product['handle'])
            firestore_client.collection('unique_links').document(custom_id).set({'id': custom_id}, merge=True)
            firestore_client.collection('unique_links').document(custom_id).collection('products').document(str(product['id'])).set(product, merge=True)

    return {"message": f"products: {prods_added} added to collection with unique link {custom_id}.", 
            "products": prods_added, "id": custom_id}

@https_fn.on_call(cors=options.CorsOptions(
        cors_origins="*",
        cors_methods=["get", "post"],
    ))
def delete_product_callable(req: https_fn.CallableRequest) -> Any:
    """
    Take the HTTP request passed to this HTTP endpoint and delete a product with the specified ID from Firestore.

    Args:
        req (https_fn.CallableRequest): The HTTP request object containing data.

    Returns:
        Any: A response containing a message, the product ID deleted, and the custom ID.
    """

    firestore_client: google.cloud.firestore.Client = firestore.client()

    product_id = req.data.get('product_id')

    custom_id = req.data.get('id')
    firestore_client.collection('unique_links').document(custom_id).collection('products').document(product_id).delete()

    return {"message": f"Product with ID {product_id} deleted from collection with unique link {custom_id}.", 
            "product_id": product_id, "id": custom_id}
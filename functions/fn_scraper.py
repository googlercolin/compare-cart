import json
import pandas as pd
import requests
from urllib.parse import urlparse
import sys


def get_json(url, page):
    """
    Get products.json from a store URL.

    Args:
        url (str): URL of the store.
        page (int): Page number of the products.json.
    Returns:
        products_json: Products.json from the store.
    """

    try:
        response = requests.get(f'{url}/products.json?limit=250&page={page}', timeout=5)
        content_type = response.headers.get('content-type', '')
        
        # Check if response is HTML
        if 'text/html' in content_type:
            print("Error: The link is not valid or is not supported at the moment.")
            sys.exit(1)
        
        products_json = response.text
        response.raise_for_status()
        return products_json

    except requests.exceptions.HTTPError as error_http:
        print("HTTP Error:", error_http)

    except requests.exceptions.ConnectionError as error_connection:
        print("Connection Error:", error_connection)

    except requests.exceptions.Timeout as error_timeout:
        print("Timeout Error:", error_timeout)

    except requests.exceptions.RequestException as error:
        print("Error: ", error)


def to_df(products_json):
    """
    Convert products.json to a pandas DataFrame.

    Args:
        products_json (json): Products.json from the store.
    Returns:
        df: Pandas DataFrame of the products.json.
    """

    try:
        products_dict = json.loads(products_json)
        df = pd.DataFrame.from_dict(products_dict['products'])
        return df
    except Exception as e:
        print(e)


def extract_image_links(images):
    """
    Extracts image links from the 'src' field in the 'images' column.

    Args:
        images (list): List of dictionaries containing image information.

    Returns:
        list: List of image links extracted from the 'src' field.
    """

    try:
        links = [image['src'] for image in images]
        return links
    except Exception as e:
        print("Error:", e)
        return []

def get_products(url):
    """
    Get all products from a store and select required fields.

    Returns:
        df: Pandas DataFrame of the products with selected fields.
    """

    results = True
    page = 1
    df = pd.DataFrame()

    while results:
        products_json = get_json(url, page)
        products_dict = to_df(products_json)

        if len(products_dict) == 0:
            break
        else:
            # Selecting required fields
            selected_fields = ['id', 'body_html', 'tags', 'images', 'updated_at', 'handle', 'title', 'variants']
            df = pd.concat([df, products_dict[selected_fields]], ignore_index=True)
            page += 1

    # Extract image links
    df['image_links'] = df['images'].apply(extract_image_links)
    df['url'] = f"{url}/products/" + df['handle']

    # Delete the 'images' column
    df.drop(columns=['images'], inplace=True)

    # Extract variant information
    df['variants'] = df['variants'].apply(lambda variants: [{'price': variant['price'], 'variant_title': variant['title']} for variant in variants])

    return df


def return_products_as_json_string_and_domain(url):
    """
    Save products from the provided URL into a JSON file.

    Args:
        url (str): The URL of the website.
    """

    # Extract domain name from URL
    domain_parts = urlparse(url).netloc.split('.')
    
    # Ignore "www" prefix if present
    if domain_parts[0] == "www":
        domain = domain_parts[1]
    else:
        domain = domain_parts[0]

    # Get products
    products = get_products(url).to_json(index=False, indent=4)

    return products, domain
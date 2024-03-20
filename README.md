# compare-cart
A product and price comparison service

### scraper.py

This module (`scraper.py`) provides functionalities to scrape product information from stores. It includes the following functions:

#### get_json(url, page)
- Retrieves products.json from a given store URL and page number.
- Parameters:
  - `url` (str): URL of the store.
  - `page` (int): Page number of the products.json.
- Returns:
  - `products_json` (str): Products.json from the store.

#### to_df(products_json)
- Converts products.json to a pandas DataFrame.
- Parameters:
  - `products_json` (str): Products.json from the store.
- Returns:
  - `df` (pd.DataFrame): Pandas DataFrame of the products.json.

#### extract_image_links(images)
- Extracts image links from the 'src' field in the 'images' column.
- Parameters:
  - `images` (list): List of dictionaries containing image information.
- Returns:
  - `links` (list): List of image links extracted from the 'src' field.

#### get_products(url)
- Gets all products from a store and selects required fields.
- Parameters:
  - `url` (str): URL of the store.
- Returns:
  - `df` (pd.DataFrame): Pandas DataFrame of the products with selected fields.

#### save_products_as_json(url)
- Saves products from the provided URL into a JSON file.
- Parameters:
  - `url` (str): The URL of the website.

#### InvalidLinkError
- Custom exception raised when the link is not valid or not supported.

### retrieve_json.py

This script (`retrieve_json.py`) is an example of how to use `scraper.py` to retrieve product information from a given URL and save it into a JSON file. It includes the following functionality:

- If executed as a standalone script, it expects a URL as an argument and calls the `save_products_as_json` function from `scraper.py` to save the products into a JSON file.

Usage:

```bash
python retrieve_json.py <url>
```

- `<url>`: The URL of the store.

Note: Ensure that `scraper.py` is in the same directory or in the Python path to run `retrieve_json.py` successfully.
"""
This script (`retrieve_json.py`) is an example of how to use `scraper.py` to retrieve product information from a given URL and save it into a JSON file. It includes the following functionality:

- If executed as a standalone script, it expects a URL as an argument and calls the `save_products_as_json` function from `scraper.py` to save the products into a JSON file.

Usage:

```bash
python retrieve_json.py <url>
```

- `<url>`: The URL of the store.

Note: Ensure that `scraper.py` is in the same directory or in the Python path to run `retrieve_json.py` successfully.
"""

import scraper
import sys

# url = "https://counterculturecoffee.com/collections/coffee"

if __name__ == "__main__":

    # Check if at least one URL is provided
    if len(sys.argv) < 2:
        print("Usage: python retrieval_json.py <url1> <url2> ...")
        sys.exit(1)

    # Iterate over each URL argument
    for url in sys.argv[1:]:
        scraper.save_products_as_json(url)
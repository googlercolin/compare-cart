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
import scraper
import sys

# url = "https://counterculturecoffee.com/collections/coffee"

if __name__ == "__main__":

    if len(sys.argv) != 2:
        print("Usage: python retrieval_json.py <url>")
        sys.exit(1)

    url = sys.argv[1]
    scraper.save_products_as_json(url)
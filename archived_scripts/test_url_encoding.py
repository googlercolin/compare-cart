import urllib.parse
import sys

if __name__ == "__main__":

    # Check if at least one URL is provided
    if len(sys.argv) < 2:
        print("Usage: python test_url_encoding.py <url1> <url2> ...")
        sys.exit(1)

    base_url = "https://save-jsons-3cke46bipq-uc.a.run.app?urls="
    url_array = []
    # Iterate over each URL argument
    for url in sys.argv[1:]:
        url_array.append(url)

    url_array_string = str(url_array)
    encoded_url_array_string = base_url + urllib.parse.quote(url_array_string, safe='')
    print(encoded_url_array_string)

    # # Decode the parsed string
    # decoded_url_array_string = urllib.parse.unquote(encoded_url_array_string)
    # print(decoded_url_array_string)

    # # Convert the string back to a list
    # decoded_url_array = eval(decoded_url_array_string)
    # print(type(decoded_url_array))
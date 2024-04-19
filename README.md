# Compare Cart

This repository contains code for a project that involves scraping product data from online stores and storing it in a Firebase Firestore database. The code consists of two main components:

1. **Cloud Functions for Firebase**: This directory contains Python code for Firebase Cloud Functions responsible for handling HTTP requests to add products to the Firestore database and delete products from it.

2. **Frontend**: This directory contains frontend code for the project, built using React.js. It includes Node modules and source files necessary for running the frontend application.

## Cloud Functions for Firebase

### `functions/main.py`

This Python script contains Cloud Functions for Firebase responsible for adding and deleting products from the Firestore database.

#### `add_products_callable`

- Description: This function takes an HTTP request containing URLs of products and adds them to the Firestore database. It returns a response containing a message confirming the addition, the list of products added, and a custom ID for the collection.

#### `delete_product_callable`

- Description: This function takes an HTTP request containing the ID of a product to delete and deletes it from the Firestore database. It returns a response containing a message confirming the deletion, the ID of the deleted product, and the custom ID of the collection.

### `functions/fn_scraper.py`

This Python script contains utility functions for scraping product data from online stores.

#### `get_json`

- Description: Retrieves products.json from a given store URL and page number.

#### `to_df`

- Description: Converts products.json to a Pandas DataFrame.

#### `extract_image_links`

- Description: Extracts image links from the 'src' field in the 'images' column of the DataFrame.

#### `get_products`

- Description: Retrieves all products from a store and selects required fields to create a DataFrame.

#### `return_products_as_json_string_and_domain`

- Description: Saves products from the provided URL into a JSON file and returns the products DataFrame along with the domain name.

## Frontend

### `frontend`

This directory contains frontend code for the project, built using React.js.

#### Running the Frontend

To start the frontend, run the following commands:
```bash
npm install
npm start
```

#### Deploying the Frontend

To deploy the frontend, run the following commands:
```bash
npm run build
firebase deploy --only hosting
```

Ensure you have a `.env` file with the `REACT_APP_API_KEY` and `REACT_APP_APP_ID`. Contact the developers for these keys if needed.

---

## Tested Links for the Web App
- https://2degrees.sg/collections/all
- https://kurasu.sg/collections/coffee-beans-1
- https://homegroundcoffeeroasters.com/collections/filter-coffee
- https://homegroundcoffeeroasters.com/collections/espresso-coffee
- https://latamcoffee.com/collections/all
- https://www.parchmen.co/collections/roasted-coffee-beans
- https://littlewolf.coffee/collections/coffee
- https://september.coffee/collections/coffee
- https://dayglow.coffee/collections/craft-coffee-1
- https://www.subtext.coffee/collections/filter-coffee-beans
- https://ethicaroasters.com/collections/filter-coffee
- https://shaughnessycafe.com/collections/coffee-beans
- https://rossocoffeeroasters.com/collections/coffee
- https://pilotcoffeeroasters.com/coffee
- https://onyxcoffeelab.com/collections/coffee
- https://counterculturecoffee.com/collections/coffee

---

For any queries or issues related to the keys or functionality, please contact the developers.
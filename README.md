
# Introduction

### Documentation for Product Filter API using mocky.io(https://www.mocky.io).  
You can use this API for filtering the products based on maxmium price, size , and frequent words used in this product description based on you search

## Get Products details 

This endpoint retrieves the products and other details like minimum & maxmium price, the sizes available and the frequent words used in this product description
The query params in the api is optional.If query params was not given , all the products will be fetching
`GET localhost:3000/filter/<Query Params>/json/`

### URL Parameters

Parameter | Description
--------- | -----------
maxPrice | Filter products based on the maximum price given
size 	 | Size of products which you are looking for(small,medium,large)
highlight | check for products with the words given in this parameter


[`curl localhost:3000/filter?maxprice=12&size=medium,large&highlight=green,blue/json/)



> The above command returns JSON structured like this:

 
```json
{
    "content": [
        {
            "title": "A Red Trouser",
            "price": 10,
            "sizes": [
                "small",
                "medium",
                "large"
            ],
            "description": "This trouser perfectly pairs with a <em>green</em> shirt."
        }
    ],
    "price": {
        "min": 10,
        "max": 10
    },
    "size": [
        "large",
        "medium",
        "small"
    ],
    "frequentWords": [
        "trouser",
        "<em>green</em>",
        "shirt",
        "<em>blue</em>",
        "hat."
    ]
}
```

## Configuration
1) Need to create .env file in config folder for dev & test with following details: (config => dev.env,test.env)
   PORT=3000
   product_fetch_url='https://www.mocky.io/v2/5e307edf3200005d00858b49'
2) Install the needed dependencies using npm.
	npm install
3) Make sure also devDependencies were installed
4) Use npm run dev - to run in local
5) For testing use npm run test
6) Make sure the env paths are correct by looking through the scripts in package.json 

#### Code samples in common languages 
nodejs- request
=================
var request = require('request');
var options = {
  'method': 'GET',
  'url': 'localhost:3000/filter?maxprice=10&size=medium,large&highlight=green,blue',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});



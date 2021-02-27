**USER**
-------------------------------
* POST /user/register
  
req.body:\
  name: string\
  email: string\
  password: string\
res status 201:
```
{
  "email": <user email>
  "name": <username>,
  "profPic": <profpic from ui avatars>
}
```
error response status 400:
```
{
  "errors": [
    "This email has been used",
    "name cannot be empty",
    "password cannot be empty",
    "minimum password length is 6 characters",
    "invalid email format"
  ]
}
```
-------------------------------
* POST /user/login
  
req body:\
  email: string\
  password: string\
res status 200:
```
{
  "access_token": "<access_token>",
  "dataUser": {
    "id": 1,
    "email": "<user_email>",
    "name": "<user_name>",
    "role": "<user_role>",
    "profPic": "<user_profPic>"
  }
}
```
res error status 400: wrong password or email
```
{
  "message": "Invalid email or password"
}
```
res error status 400: empty email or password
```
{
  "message": "Please fill all required fields"
}
```
-------------------------------
-------------------------------

**PRODUCTS**
-------------------------------
* POST /product

req.body: 
  - name: string,
  - image_url: string,
  - category: string,
  - price: integer,
  - stock: integer


req.headers: access_token\
res status 201:
```
{
  "id": <product_id>,
  "name": "<product_name>",
  "image_url": "<image_url>",
  "price": <product_price>,
  "stock": <product_stock>,
  "category": "<product_category",
  "updatedAt": <date>,
  "createdAt": <date>
}
```
-------------------------------
* GET /product

fetch all products\
req.headers = access_token\
res status 200:
```
[
  {
  "id": <product_id>,
  "name": "<product_name>",
  "image_url": "<image_url>",
  "price": <product_price>,
  "stock": <product_stock>,
  "category": "<product_category",
  "updatedAt": <date>,
  "createdAt": <date>
  },
  {
  "id": <product_id>,
  "name": "<product_name>",
  "image_url": "<image_url>",
  "price": <product_price>,
  "stock": <product_stock>,
  "category": "<product_category",
  "updatedAt": <date>,
  "createdAt": <date>
  }
]

```
-------------------------------

* DEL /product/:product_id

req.headers = access_token\
res status 200:
```
{
  "message": "Product deleted  successfully"
}
```
-------------------------------
* PUT /product/:product_id

req.body: 
  - name: string,
  - image_url: string,
  - category: string,
  - price: integer,
  - stock: integer


req.headers: access_token\
res status 200:
```
{
  "id": <product_id>,
  "name": "<product_name>",
  "image_url": "<image_url>",
  "price": <product_price>,
  "stock": <product_stock>,
  "category": "<product_category",
  "updatedAt": <date>,
  "createdAt": <date>
}
```
res status 404
```
{
  "message": "Error Product not found"
}
```
-------------------------------
-------------------------------
**BANNER**
-------------------------------
* POST /banner

req.body: 
  - title: string,
  - image_url: string,
  - status: boolean,


req.headers: access_token\
res status 201:
```
{
  "id": <banner_id>,
  "banner": "<banner_title>",
  "image_url": "<image_url>",
  "status": <banner_status>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```
-------------------------------
* GET /banner

fetch all banner\
req.headers = access_token\
res status 200:
```
[
  {
    "id": <banner_id>,
    "banner": "<banner_title>",
    "image_url": "<image_url>",
    "status": <banner_status>,
    "updatedAt": <date>,
    "createdAt": <date>
  },
  {
    "id": <banner_id>,
    "banner": "<banner_title>",
    "image_url": "<image_url>",
    "status": <banner_status>,
    "updatedAt": <date>,
    "createdAt": <date>
  },
]

```
-------------------------------

* DEL /banner/:banner_id

req.headers = access_token\
res status 200:
```
{
  "message": "Banner deleted  successfully"
}
```
-------------------------------
* PUT /banner/:banner_id

req.body: 
  - title: string,
  - image_url: string,
  - status: boolean,


req.headers: access_token\
res status 200:
```
{
  "id": <banner_id>,
  "banner": "<banner_title>",
  "image_url": "<image_url>",
  "status": <banner_status>,
  "updatedAt": <date>,
  "createdAt": <date>
}
```
res status 404
```
{
  "message": "Error Product not found"
}
```
-------------------------------
-------------------------------

**CARTS**
-------------------------------
* POST /cart

req.body: 
  - ProductId: integer

req.headers: access_token\
res status 201:
```
{
  "id": <cart_id>,
  "UserId": <user_id>,
  "ProductId": <product_id>,
  "isCheckedOut": false,
  "qty": 1,
  "createdAt": <date>,
  "updatedAt": <date>
}
```
if cart with UserId and ProductId already exist it will update qty instead
res status 200
```
{
  "id": <cart_id>,
  "UserId": <user_id>,
  "ProductId": <product_id>,
  "isCheckedOut": false,
  "qty": 2,
  "createdAt": <date>,
  "updatedAt": <date>
}
```
-------------------------------
* GET /cart

fetch user active carts (not checkedout yet) \
req.headers = access_token\
res status 200:
```
[
  {
    "id": <cart_id>,
    "UserId": <user_id>,
    "ProductId": <product_id>,
    "isCheckedOut": false,
    "qty": 1,
    "createdAt": <date>,
    "updatedAt": <date>,
    "Product": {
      "id": <product_id>,
      "name": <product_name,
      "image_url": <product_image_url>,
      "category": <product_category>,
      "price": <product_price>,
      "stock": <product_stock>,
      "createdAt": <date>,
      "updatedAt": <date>
    }
  }
]

```
-------------------------------
* GET /cart/history

fetch user checkedout history \
req.headers = access_token\
res status 200:
```
[
  {
    "id": <cart_id>,
    "UserId": <user_id>,
    "ProductId": <product_id>,
    "isCheckedOut": true,
    "qty": 1,
    "createdAt": <date>,
    "updatedAt": <date>,
    "Product": {
      "id": <product_id>,
      "name": <product_name,
      "image_url": <product_image_url>,
      "category": <product_category>,
      "price": <product_price>,
      "stock": <product_stock>,
      "createdAt": <date>,
      "updatedAt": <date>
    }
  }
]

```
-------------------------------
* DEL /cart/:cart_id

req.headers = access_token\
res status 200:
```
{
  "message": "Removed  successfully"
}
```
-------------------------------
* PATCH /cart/:cart_id
update qty in a cart
req.body: 
  - qty: integer

req.headers: access_token\
res status 200:
```
{
  "id": <cart_id>,
  "UserId": <user_id>,
  "ProductId": <product_id>,
  "isCheckedOut": false,
  "qty": 2,
  "createdAt": <date>,
  "updatedAt": <date>
}
```
res status 404
```
{
  "message": "Error not found"
}
```
res status 400 (if stock is less than qty requested)
```
{
  "message": "Stock is not sufficient"
}
```
-------------------------------
* PUT /cart
update isCheckedOut status to true\
req.body (must be json):
```
{
  "arrOfCartId": [1,2,3] <== example arr of cart_id
}
```

req.headers: access_token\
res status 200:
```
[
  {
    "id": <cart_id>,
    "UserId": <user_id>,
    "ProductId": <product_id>,
    "isCheckedOut": true,
    "qty": 2,
    "createdAt": <date>,
    "updatedAt": <date>
  }
]
```
res status 404
```
{
  "message": "Error not found"
}
```
-------------------------------
-------------------------------

**Global Error Response**

res error 401:
```
{
  "message": "invalid token"
}
```
res error 401:
```
{
  "message": "Unauthorized"
}
```
res error 500:
```
{
  "message": "internal server error"
}
```

# e-commerce
ecommerce project with Postgres, Express, Vue, and Nodejs Stack

## live demo:
### Client Side For Customer http://kawna-shop.web.app/
### Client Side For Admin http://ecomm-cms-ferd.web.app/
- admin account:
- email: admin@mail.com
- pass: 1234
### Server Restful API https://e-commerce-ferd.herokuapp.com/
- api doc available in ecommerce-cms-server folder

env variable (create your own .env file in ecommerce-cms-server directory):
```
JWTSECRET=secretjwt
ADMINPASSWORD=1234
CONFIG_DEV_USERNAME= ...fill it yourself...
CONFIG_DEV_PASSWORD= ...fill it yourself...
CONFIG_DEV_DATABASE= ...fill it yourself...
CONFIG_DEV_HOST= ...fill it yourself...
CONFIG_DEV_DIALECT= postgres
CONFIG_TEST_USERNAME= ...fill it yourself...
CONFIG_TEST_PASSWORD= ...fill it yourself...
CONFIG_TEST_DATABASE= ...fill it yourself...
CONFIG_TEST_HOST= ...fill it yourself...
CONFIG_TEST_DIALECT=postgres
```

dont forget to install node package for each folder (ecommerce-cms-client, ecommerce-cms-server, ecommerce-customer-client):
```
npm i
```
and then for server:
```
npm run dev
```
for client:
```
npm run serve
```
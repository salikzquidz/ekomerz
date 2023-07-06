## Backend Stack

- Express JS
- JWT
- Cookie Parser

## API docs (prefix /api/v1)

### Auth

| HTTP Verb | URL     | Description             | Req Body                                                    | Req Param | Note                          |
| --------- | ------- | ----------------------- | ----------------------------------------------------------- | --------- | ----------------------------- |
| POST      | /signup | to register a new user  | {"email" : "salikinbaik@gmail.com", "password" : "1234567"} | N/A       |
| POST      | /login  | login a registered user | {"email" : "salikinbaik@gmail.com", "password" : "1234567"} | N/A       | will return jwt inside cookie |

### Products

| HTTP Verb | URL          | Description                           | Req Body                                                                                       | Req Param                | Note                                   |
| --------- | ------------ | ------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------ | -------------------------------------- |
| POST      | /products    | to add a product for sell             | multipart/form-data { image : file upload, name, description, price, countInStock, numReviews} | N/A                      |
| GET       | /products    | get all products details for homepage | N/A                                                                                            | N/A                      |
| GET       | /product/:id | get specific product details          | N/A                                                                                            | 64955027bfca5575eb4d9ed8 | will reconsider this enpoint necessity |

### Cart

| HTTP Verb | URL          | Description                     | Req Body                                                                                                              | Req Param                | Note                                                                                                  |
| --------- | ------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| POST      | /products    | to add/update an item into cart | { "userId" : "649bdcf2186971ba51261448", "products" : { "productId" : "64954fc9bfca5575eb4d9ed3", "quantity" : 100 }} | N/A                      | if user not logged in, save cart info into browser cookie, should separate update and create endpoint |
| DELETE    | /product/:id | remove an item from the cart    | N/A                                                                                                                   | 64955027bfca5575eb4d9ed8 | not implemented yet                                                                                   |
| PUT       | /product/:id | to update an item in the cart   | { "quantity" : 100 }                                                                                                  | 64955027bfca5575eb4d9ed8 | not implemented yet                                                                                   |

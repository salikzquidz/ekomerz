# Ekomerz

## Goal

To launch as an independent e-commerce web application complete with these constantly-updating criterias :

- [ ] Have authentication system
- [ ] Have payment gateway integrated (fpx or paypal etc)
- [ ] Deployed on the cloud

## Types of user

- Guest
- Buyer
- Admin/Seller - only one

## List of permissions

- view products
- add products
- delete products
- update products
- add item into cart
- update cart
- create order / checkout
- view orders
- update order's status
- delete order

## Phases

### 1 - Plan User Flow

- Guest
  - visit site homepage -> view products -> click on product -> add to cart (but saved into user cookies) -> click checkout -> redirected to login page
  - if (guest == buyer), then the cart will be updated (get from cookies) ,but must immediately redirect to checkout page
- Buyer
  - login -> click on product -> add to cart -> view cart page -> click checkout -> confirmation page
  - if(payment success) redirect to order details page
- Admin
  - login -> site knows this is admin and display homepage but with additional navlink which is admin dashboard -> click dashboard -> shows the orders,
    manage products etc -> edit product with id 0123 to increase quantity to 100 -> save -> go to homepage -> the product is updated

### 2 - Plan the Pages/Components

- [x] Layout component
- [x] Homepage
- [x] Login Page
- [ ] Signup Page
- [ ] Cart Page

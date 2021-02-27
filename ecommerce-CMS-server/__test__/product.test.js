const request = require("supertest");
const app = require("../app");
const {generateToken} = require('../helpers/jwt');
const { sequelize } = require('../models');
let true_access_token;
let false_access_token;


  let dataUserAdmin = {
    id: 1,
    email: 'admin@mail.com',
    name: 'admin',
    role:"admin",
    profPic: "https://ui-avatars.com/api/?background=random&name=Admin&rounded=true"
  }
  let dataUserNonAdmin = {
    id: 2,
    email: 'user@mail.com',
    name: 'user aja',
    role:"customer",
    profPic: "https://ui-avatars.com/api/?background=random&name=Admin&rounded=true"
  }
  // true_access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBtYWlsLmNvbSIsIm5hbWUiOiJhZG1pbiIsInByb2ZQaWMiOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_YmFja2dyb3VuZD1yYW5kb20mbmFtZT1BZG1pbiZyb3VuZGVkPXRydWUiLCJpYXQiOjE2MTM0OTA4MTN9.wDH9D4qOHIcg0_w2N7MI73tIi21rG8GtWr5b5MIzVh0"
  true_access_token = generateToken(dataUserAdmin)
  false_access_token = generateToken(dataUserNonAdmin)
  let product_id;

describe("TESTING CREATE UPDATE DELETE PRODUCT", () => {
  describe("POST /product", () => {
    // test case 1 create product success
    test("create product should success if inputs are correct", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(201);
        expect(body).toHaveProperty("id");
        product_id = body.id;
        expect(body).toHaveProperty("name", 'Tas Kulit Croco');
        expect(body).toHaveProperty("image_url", 'tas-croco.jpg');
        expect(body).toHaveProperty("price", 100000);
        expect(body).toHaveProperty("stock", 10);
        expect(body).toHaveProperty("category", "tas wanita");
        done();
      })
    })  

    // test case 2 no access_token
    test("create product should fail when no access_token", done => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas keren',
        image_url: 'tas-keren.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'token must be provided')
        done()
      })
    })

    // test case 3 access_token non-admin
    test("create product should fail when access_token doesnt match with admin's", done => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas keren',
        image_url: 'tas-keren.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', false_access_token)
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'Unauthorized')
        done()
      })
    })

    //  test case 4 empty name
    test("create product should fail if name input is empty", (done) => {
      request(app)
      .post("/product")
      .send({
        name: '',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Product name cannot be empty')
        done()
      })
    })  

    //  test case 5 empty image_url
    test("create product should fail if image_url input is empty", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: '',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Image_url cannot be empty')
        done()
      })
    })  

    //  test case 6 empty price
    test("create product should fail if price input is empty", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: '',
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Price cannot be empty')
        done()
      })
    })  

    //  test case 7 empty stock
    test("create product should fail if stock input is empty", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: '',
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Stock cannot be empty')
        done()
      })
    })  

    //  test case 8 empty category
    test("create product should fail if stock input is empty", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 10,
        category: ''
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Category cannot be empty')
        done()
      })
    }) 

    //  test case 9 negative price
    test("create product should fail if price input is negative", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: -100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Minimum price is 0')
        done()
      })
    })  

    //  test case 10 negative stock
    test("create product should fail if stock input is negative", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: -10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Minimum stock is 0')
        done()
      })
    })  

    //  test case 11 wrong datatype for price
    test("create product should fail if price is not a number", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 'abcdef',
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Price must be in number')
        done()
      })
    })

    //  test case 12 wrong datatype for stock
    test("create product should fail if stock is not a number", (done) => {
      request(app)
      .post("/product")
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 'abcdef',
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Stock must be in number')
        done()
      })
    })

    //  test case 13 multiple errors
    test("create product should fail if multiple errors", (done) => {
      request(app)
      .post("/product")
      .send({
        name: '',
        image_url: '',
        price: 'abcdef',
        stock: 'abcdef',
        category: ''
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Product name cannot be empty, Image_url cannot be empty, Category cannot be empty, Price must be in number, Stock must be in number')
        done()
      })
    })
  })

  ///////////////////////// TEST UPDATE ///////////////////////////////////////////

  describe("PUT /product/product_id", () => {
    // test case 1 update product success
    test("update product should success if inputs are correct", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 90000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("name", 'Tas Kulit Croco');
        expect(body).toHaveProperty("image_url", 'tas-croco.jpg');
        expect(body).toHaveProperty("price", 90000);
        expect(body).toHaveProperty("stock", 10);
        expect(body).toHaveProperty("category", "tas wanita");
        done();
      })
    })  

    // test case 2 no access_token
    test("update product should fail when no access_token", done => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas keren',
        image_url: 'tas-keren.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'token must be provided')
        done()
      })
    })

    // test case 3 access_token non-admin
    test("update product should fail when access_token doesnt match with admin's", done => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas keren',
        image_url: 'tas-keren.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', false_access_token)
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'Unauthorized')
        done()
      })
    })

    //  test case 4 empty name
    test("update product should fail if name input is empty", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: '',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Product name cannot be empty')
        done()
      })
    })  

    //  test case 5 empty image_url
    test("update product should fail if image_url input is empty", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: '',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Image_url cannot be empty')
        done()
      })
    })  

    //  test case 6 empty price
    test("update product should fail if price input is empty", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: '',
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Price cannot be empty, Price must be in number')
        done()
      })
    })  

    //  test case 7 empty stock
    test("update product should fail if stock input is empty", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: '',
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Stock cannot be empty, Stock must be in number')
        done()
      })
    })  

    //  test case 8 empty category
    test("update product should fail if stock input is empty", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 10,
        category: ''
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Category cannot be empty')
        done()
      })
    }) 

    //  test case 9 negative price
    test("update product should fail if price input is negative", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: -100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Minimum price is 0')
        done()
      })
    })  

    //  test case 10 negative stock
    test("update product should fail if stock input is negative", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: -10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Minimum stock is 0')
        done()
      })
    })  

    //  test case 11 wrong datatype for price
    test("update product should fail if price is not a number", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 'abcdef',
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Price must be in number')
        done()
      })
    })

    //  test case 12 wrong datatype for stock
    test("update product should fail if stock is not a number", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: 'Tas Kulit Croco',
        image_url: 'tas-croco.jpg',
        price: 100000,
        stock: 'abcdef',
        category: 'tas wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Stock must be in number')
        done()
      })
    })

    //  test case 13 multiple errors
    test("update product should fail if multiple errors", (done) => {
      request(app)
      .put(`/product/${product_id}`)
      .send({
        name: '',
        image_url: '',
        price: 'abcdef',
        stock: 'abcdef',
        category: ''
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(400);
        expect(body).toHaveProperty("message", 'Product name cannot be empty, Image_url cannot be empty, Category cannot be empty, Price must be in number, Stock must be in number')
        done()
      })
    })

    //  test case 14 product id doesnt exist
    test("update product should fail if product id not found", (done) => {
      request(app)
      .put(`/product/0`)
      .send({
        name: 'dompet sasha',
        image_url: 'sasha.jpg',
        price: 2000000,
        stock: 9999,
        category: 'dompet wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", 'Error Product not found')
        done()
      })
    })
  })

  ///////////////////////// TEST DELETE  ///////////////////////////////////////////


  describe("DELETE /product/:product_id", () => {

    // test case 1 no access_token
    test("delete product should fail when no access_token", done => {
      request(app)
      .delete(`/product/${product_id}`)
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'token must be provided')
        done()
      })
    })

    // test case 2 access_token non-admin
    test("update product should fail when access_token doesnt match with admin's", done => {
      request(app)
      .delete(`/product/${product_id}`)
      .send({
        name: 'Tas keren',
        image_url: 'tas-keren.jpg',
        price: 100000,
        stock: 10,
        category: 'tas wanita'
      })
      .set('access_token', false_access_token)
      .end((err,res) => {
        const { body,status } = res
        if(err){
          done(err)
        }
        expect(status).toBe(401);
        expect(body).toHaveProperty("message", 'Unauthorized')
        done()
      })
    })

    //  test case 3 product id doesnt exist
    test("delete product should fail if product id not found", (done) => {
      request(app)
      .delete(`/product/0`)
      .send({
        name: 'dompet sasha',
        image_url: 'sasha.jpg',
        price: 2000000,
        stock: 9999,
        category: 'dompet wanita'
      })
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(404);
        expect(body).toHaveProperty("message", 'Error Product not found')
        done()
      })
    })

    // test case 4 update product success
    test("delete product should success if id and access_token are correct", (done) => {
      request(app)
      .delete(`/product/${product_id}`)
      .set('access_token', true_access_token)
      .end((err,res) => {
        const { body, status } = res
        if(err){
          console.log(err)
          done(err)
        }
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Product deleted successfully");
        done();
      })
    })
  })

/////////////////////////// DONE TESTING PRODUCT //////////////////////
  afterAll((done) => {
    sequelize.close();
    done();
  })
})


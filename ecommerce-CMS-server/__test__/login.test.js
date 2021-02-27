const request = require("supertest");
const app = require("../app");
const { sequelize } = require('../models');

describe("POST /user/login", () => {
  // it case login success
  it("login should success", done => {
    request(app)
    .post("/user/login")
    .send({
      email: "admin@mail.com",
      password: "1234",

    })
    .end((err,res) => {
      const { body,status } = res
      if(err){
        return done(err)
      }
      expect(status).toBe(200);
      // console.log(body.access_token, ' <<< ini access token')
      expect(body).toHaveProperty("access_token")
      expect(body).toHaveProperty("dataUser")
      expect(body.dataUser).toHaveProperty("email","admin@mail.com")
      expect(body.dataUser).toHaveProperty("profPic")
      expect(body.dataUser).toHaveProperty("name")
      expect(body.dataUser).toHaveProperty("id")
      done()
    })
  })  

  //it case email true, password false
  it("login should failed wrong password", done => {
    request(app)
    .post("/user/login")
    .send({
      email: "admin@mail.com",
      password: "1233"
    })
    .end((err,res) => {
      const { body,status } = res
      if(err){
          return done(err)
      }
      expect(status).toBe(400)
      expect(body).toHaveProperty("message", "Invalid email or password")
      
      done()
    })
  })  


  // it case email not found
  it("login should failed email not registered on database", done => {
    request(app)
    .post("/user/login")
    .send({
      email: "upilnaga@gmail.com",
      password: "astaganaga"
    })
    .end((err,res) => {
      const { body,status } = res
      if(err){
        return done(err)
      }
      expect(status).toBe(400)
      expect(body).toHaveProperty("message", "Invalid email or password")
      done()
    })
  })  

  // it case null email and null password
  it("login should failed not fill email and password form", done => {
    request(app)
    .post("/user/login")
    .send({
      user: "",
      password: ""
    })
    .end((err,res) => {
      const { body,status } = res
      if(err){
        return done(err)
      }
      expect(status).toBe(400)
      expect(body).toHaveProperty('message','Please fill all required fields')
      return done()
    })
  })  
  afterAll((done) => {
    sequelize.close();
    done();
  })
})
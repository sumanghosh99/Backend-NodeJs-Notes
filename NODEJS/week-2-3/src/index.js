const express=require("express");

const connect=require("./config/db");

const userController=require("./controllers/usercontroller");
const sectionController=require("./controllers/sectionController");
const booksController=require("./controllers/booksController");
const authorController=require("./controllers/authorController");
const checkoutController=require("./controllers/checkoutCOntroller");
//================Crud Operation ======================
const app=express();
app.use(express.json());
app.use("/users",userController);
app.use("/sections",sectionController);
app.use("/books",booksController);
app.use("/authors",authorController);
app.use("/checkouts",checkoutController);

//server run
app.listen(3000 ,async()=>{
    try {
       await connect();
       console.log("Listen to the port 3000");
    } catch (error) {
       console.log(error.message);
    }
})


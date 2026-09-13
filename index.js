const express = require("express");

const app = express();
const main = require("./database");
const User = require("./models/user")
const validUser= require("./utils/validateUser")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(cookieParser())

app.post("/register",async (req,res)=>{

    try{
      
    validUser(req.body);
    //converting pass into hass

  req.body.password =   await bcrypt.hash(req.body.password,10);
    
       await User.create(req.body);
       res.send("User Register Successfully")

    }
    catch(err){
        res.send("Error"+ err.message);
    }
})


app.post("/login", async(req,res)=>{


    try{
  //validate 


  const people = await User.findById(req.body._id);

  if(!(req.body.emailId === people.emailId))
  
    throw new Error("Invalid credentials");


   const IsAllowed = await bcrypt.compare(req.body.password, people.password);
   
   if(!IsAllowed)
       throw new Error("Invalid credentials");

   //jwt token

   const token = jwt.sign({_id:people._id, emailId:people.emailId},"Pawan@5256");

   res.cookie("token",token);
   res.send("Login Successfully");

    }

    catch(err){

        res.send("Error:"+err.message);
    }
})
  
app.get("/info", async(req,res)=>{

    try{
    
        //validate the user first 

        const payload = jwt.verify(req.cookies.token,"Pawan@5256");

       console.log(payload);

        const result = await User.find();

        console.log(req.cookies);
        res.send(result);

    }
  
    catch(err){
        res.send("Error" +err.message);

    }
})

app.get("/user/:id", async(req, res)=>{

    try{

   const result = await User.findById(req.params.id);
   res.send(result);
    }

    catch(err){

        res.send("Error"+ err.message)

    }
});

app.delete("/user/:id", async(req,res)=>{


    try{
     await User.findByIdAndDelete(req.params.id);
     res.send("delete succesfully");

    }

    catch(err){
  res.send("Error"+err.message)
    }
})


app.patch("/user", async(req,res)=>{

    try{

        const {_id, ...update} = req.body;
    await User.findByIdAndUpdate(_id,update);
    res.send("Update Succesfully");
    }

    catch(err){

        res.send("Error"+err.message)
    }
})
main()
    .then(() => {
        console.log("Connected to DB")
        app.listen(3000, () => {
            console.log("listening at port 3000");
        })
    })
    .catch((err) => console.log(err));


//
const express = require("express");

const app = express();
const main = require("./database");
const User = require("./models/user")
const validUser= require("./utils/validateUser");

app.use(express.json());

app.post("/register",async (req,res)=>{

    try{
      
    validUser(req.body);
    
       await User.create(req.body);
       res.send("User Register Successfully")

    }
    catch(err){
        res.send("Error"+ err.message);
    }
})

  
app.get("/info", async(req,res)=>{

    try{
    
        const result = await User.find();
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



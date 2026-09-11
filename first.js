const bcrypt = require("bcrypt")


const password  = "Rohit@123";

async function Hashing(){

    //hashcode + salt

    // console.time("hash");

    // const ans = await bcrypt.compara(password,hashpass);


 const hashpass = await bcrypt.hash(password,10);


 console.log(hashpass);
}
 
Hashing();
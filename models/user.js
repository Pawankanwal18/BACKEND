const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
         required : true,
       minlength: 3,
       maxlength: 20
    },
    lastName: {
        type: String
      
    },

    age: {
        type: Number,
        min: 14,
        max:70
    },

    gender: {

        type: String,
        enum: ["male","female","others"]
    },

    emailId: {
        type: String,
        required : true,
        unique : true,
        trim : true,
        lowercase:true,
        immutable: true,
    },
    password: {
        type: String,
        //   minlength:8,
        // maxlength:12,
        required: true,
    },

    photo: {
        type: String,
        default: "This is the default photo"

    },
},  { timestamps : true})

userSchema.methods.getJWT = function(){

    Jwt.sign({_id:this._id,  emailId:this.emailId},"Pawan@5256");
}

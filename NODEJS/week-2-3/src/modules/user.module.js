const mongoose=require("mongoose");


const userSchema= new mongoose.Schema(
    {
        first_name:{type:String,require:true},
        last_name:{type:String,require:false},
        email:{type:String,require:true},
        gender:{type:String,require:false,default:"Male"},
        age:{type:Number,require:true},
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

module.exports=mongoose.model("user", userSchema);
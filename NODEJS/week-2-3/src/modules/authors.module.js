const mongoose=require("mongoose");

const authorSchema= new mongoose.Schema(
    {
        first_name:{type:String,require:true},
        last_name:{type:String,require:false},
        books_ids:[{type:mongoose.Schema.Types.ObjectId,ref:"book",required:1}]
        
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

module.exports=mongoose.model("author", authorSchema);
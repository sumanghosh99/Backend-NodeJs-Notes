const mongoose=require("mongoose");

const booksSchema= new mongoose.Schema(
    {
        name:{type:String,require:true},
        body:{type:String,require:false},
        section_id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"section",
            required:true
        }
        
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

module.exports=mongoose.model("book", booksSchema);
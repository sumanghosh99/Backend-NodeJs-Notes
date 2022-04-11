const mongoose=require("mongoose");

const checkoutSchema= new mongoose.Schema(
    {
        user_id:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:1},
        book_id:{type:mongoose.Schema.Types.ObjectId,ref:"book",required:1}
        
    },
    {
      versionKey:false,
      timestamps:true,
    }
);

module.exports=mongoose.model("checkout", checkoutSchema);
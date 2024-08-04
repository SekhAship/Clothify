const mongoose=require('mongoose');
const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:50,
    },
    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories',
    },
    level:{
        type: Number,
        required: true,
    }
})
const categoriy=mongoose.model('categories',categorySchema);
module.exports=categoriy;
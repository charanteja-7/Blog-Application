const mongoose = require('mongoose')

const blogSchema =new mongoose.Schema({
    title :{
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    coverImageURL : {
        type: String,
        required : false
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    },
    category : {
        type:  String,
        enums : ["Technology", "Life Style", "Education", "Entertainment", "Business", "Arts and Culture", "Society and Politics"],
        default : "Technology",
    }
    ,
    views :{
        type: Number,
        default : 0,
    },
    likes:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
],
}, {timestamps : true});

const Blog = mongoose.model('blog', blogSchema);
module.exports = Blog;
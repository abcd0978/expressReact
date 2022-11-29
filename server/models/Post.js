const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title:{
        type:String,
        maxlength:100
    },
    desc:{
        type: String,
    },
    author:{
        type: Object,
    },
},{
    timestamps:true
})
const Post = mongoose.model('Post',postSchema)//Post컬렉션을 몽고db에
module.exports = {Post}
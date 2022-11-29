const express = require('express');
const router = express.Router();
const {auth} = require('../middlewares/auth')
const {Post} = require('../models/Post');

router.post("/post", auth,(req,res)=>{
    const reqdata = req.body
    const data = {
        title:reqdata.title,
        author:req.user,
        desc:reqdata.description
    }
    const post = new Post(data)
    console.log(post);
    post.save((err,info)=>{
        if(err){
            console.log("에러")
            console.log(err)
            res.status(400).json({success:true})
        }
        return res.status(200).json({success:true})
    })
})

router.get('/getpost',async (req,res)=>{
    try {
        const data = await Post.find();
        let temp = []
        for(let i=0;i<data.length;i++){
            temp.push({
                title:data[i].title,
                author:data[i].author.name,
                createdAt:data[i].createdAt
            })
        }
        return res.status(200).json({success:true,temp})
      } catch (error) {
        return res.render("server-error");
      }
})
module.exports = router
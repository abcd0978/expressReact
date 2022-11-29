const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/user');//라우터 분리함
const postRouter = require('./routes/post');

dotenv.config();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cookieParser())

const port = process.env.PORT
mongoose.connect(process.env.MONGO_URL)
.then((db)=>{
    console.log(db)
    console.log('db connected.')
}).catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRouter);//  "/api/users/주소" 형식으로 주소가 분리됨
app.use('/api/post',[postRouter])

app.listen(port,()=>console.log(` ${port}번 포트에서 돌아감`));
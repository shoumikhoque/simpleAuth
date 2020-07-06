const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

const app=express();


const User = require("./models/User");

//bodyparser middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.static(__dirname+'/'))
//routing
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/',(req,res)=>{
    const user=new User({
        email:req.body.email,
        password:req.body.password
    })
    console.log(user);
    
    User.findOne({email:user.email,password:user.password}).then((user)=>{
        console.log(user);
        if(user.name){
            res.render('success',{name:user.name})
        } else{
            res.render('error',{name:user.name})
        }
        
    }).catch((err)=>{
        res.render('error',{name:user.name})
    })


})
app.get('/register',(req,res)=>{
    res.render('register')
})
app.post('/register',(req,res)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    user.save().then((user)=>{
        res.json(user)
    }).catch((err)=>{
        res.json({error:err})
    })
    console.log(user);
})

//DB config
const dbURI=require('./config/keys').mongoURI;
//connect mongo
mongoose.connect(dbURI,{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log("\n mongoDB connected");
    
}).catch((err)=>{
    console.log(err);
    
})


const port=process.env.port||5000;
app.listen(port,()=>{
    console.log(`server started on ${port}`);
    
})
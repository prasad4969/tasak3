const express=require('express');
var bodyParser = require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Blog=require('./models/blog');
const { render } = require('ejs');
const Feed = require('./models/blog');
const User = require('./models/user');

const app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const dbURI='mongodb+srv://iit:iit@cluster0.oavxm.mongodb.net/node?retryWrites=true&w=majority';
mongoose.connect(dbURI)
  .then((result)=>app.listen(3009))
  .catch((err)=>console.log(err));


app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

// app.get('/add-feed',(req,res)=>{
//     const feed=new Feed({
//         title:'new feed',
//         body:'about feed',
//         author:'prasad'

//     });

//     feed.save()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log('err');
//     })
// })

// app.get('/all-feeds',(req,res)=>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })
// })

// app.get('/add-feed',(req,res)=>{
//     const user=new User({
//         username:'suzuki',
//        });
//     user.save()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log('err');
//     })
// })




app.set('view engine','ejs');

//app.listen(3005);
app.get('/',(req,res)=>{
    res.redirect('/login');
})
 

app.get('/login',(req,res)=>{
   res.render('index');
})


app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/feed',(req,res)=>{
    // const feeds=[
    //         {title:'yoshi finds eggs',body:'good morning its a plesant day  and happy to meet u all looking for forward discussions',author:'prasad'},
    //         {title:'mario finds eggs',body:'good afternoon  good morning its a plesant day  and happy to meet u all looking for forward discussions',author:'ram'},
    //         {title:'prasad finds eggs',body:'good night good morning its a plesant day  and happy to meet u all looking for forward discussions',author:'shyam'},
    //        ];
    // res.render('feed',{feeds});
    Feed.find().sort({createdAt:-1})
         .then((result)=>{
            res.render('feed',{feeds:result})
         })
         .catch((err)=>{
            console.log('err');
          });
});

app.post('/feed',urlencodedParser,(req,res)=>{
    
    const feed=new Feed(req.body);
   console.log(feed);
   feed.save()
    .then((result)=>{
        res.render('feed',{feeds,data:req.body});
     })
    .catch((err)=>{
       console.log('err');
     });
})



app.get('/register',(req,res)=>{
   User.find()
         .then((result)=>{
            res.render('register',{user:result})
         })
         .catch((err)=>{
            console.log('error');
          });
});

app.post('/register',urlencodedParser,(req,res)=>{
    
    const user=new User(req.body);
   console.log(user);
   user.save()
    .then((result)=>{
        res.render('register',{user,data:req.body});
     })
    .catch((err)=>{
       console.log('err');
     });
     
})

app.post('/register',urlencodedParser,async(req,res)=>{
    const type=req.body;
    console.log(type);
    
    try{
         const user=await User.findOne({username});
         if(user){
            res.redirect('/login');
         }
    }catch(err){
        console.log(err)
    }

})

app.get('/feeds/:id',(req,res)=>{
    const id=req.params.id;
    Feed.findById(id)
    .then((result)=>{
        res.render('details',{feed:result})
    })
    .catch((err)=>{
        console.log(err);
    })
    console.log(id);  
})

app.delete('/feeds/:id',(req,res)=>{
    const id=req.params.id;

    Feed.findByIdAndDelete(id)
    .then(result=>{
        res.json({redirect:'/feed'})
    })
    .catch(err=>{
        console.log(err);
    });
})



app.get('/create/post',(req,res)=>{
    res.render('create');
})


app.use((req,res)=>{
    res.status(404).render('404');
});

const http = require('http');

var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
/*var expressValidator=require('express-validator');
var session=require('express-session');
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;



var routes=require('./routes/index');
var routes=require('./routes/users');*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/music_store";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("music_store");
    dbo.createCollection("users", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });

var app=express();
var port=3000;


        app.use(function(req,res,next)
        {
            console.log('Time :',Date.now());
            next();
        });


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'includes')));
//app.use(express.static(path.join(__dirname,'public')));
var urlencodedParser=bodyParser.urlencoded({extended:false});

/*app.use(session({
    secret:'secret',
    saveUninitialized:true,
    resave:true
}));

app.use(passport.initialize());
app.use(passport.session());

/*app.use(express-validator({
    errorFormatter:function(param,msg,value){
        var namespace=param.split('.'),
        root=namespace.shift(),
        formparam=root;

        while(namespace.length){
            formparam+= '['+namespace.shift() +']';
        }
        return{
            param:formparam,
            msg:msg,
            value:value
        };
    }
}));*/

/*app.use(flash());
app.use(function(req,res,next){
    res.locals.messages=require('express-messages')(req,res);
    next();
});*/

//app.use('/',routes);
//app.use('/users',users);




app.get('/',function(req,res){
    res.render('index',{
     "title":"MobiStore.com"
    });
});

app.get('/login',function(req,res){
    res.render('index',{
     "title":"MobiStore.com"
    });
});


app.get('/home',function(req,res){
    res.render('index',{
     "title":"MobiStore.com",
     success:''
    });
});

app.get('/about',function(req,res){
    res.render('about',{
        "title":"MobiStore.com"
       });
});


app.get('/contact',function(req,res){
    res.render('contact',{
        "title":"AudioMack"
       });
});


app.get('/register',function(req,res){
    res.render('register',{
        "title":"AudioMack"
       });
});



app.post('/register_val', function(req,res){ 
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var db = db.db("music_store");

        var data = { 
            "name": req.body.name, 
            "email":req.body.email, 
            "username":req.body.username, 
            "password":req.body.pass, 
        
        } 
    db.collection('users').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Record inserted Successfully"); 
           // res.send('<script>alert("register successfuly")');
           
                  
        }); 
      
      });
    
      
   
   
    return res.redirect('/'); 
}) 


app.post('/login', function(req, res){
    
    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        var email=req.body.email;
        console.log(req.body.pass);
        
        dbs = db.db('music_store');
        dbs.collection('users').findOne({email:req.body.email, password: req.body.pass}, function(req, result){
            if(err) throw err;
            if(result){
               // res.send("<script>alert('hello')</script>");
                
              
                res.render('music',
                {
                    "title":email
                   });
            
            
            }
            else{
                res.send("Invalid Credentials");
               
            }
           
            
        });
       
        
    });
    
});

  


app.listen(port);
console.log("server started at port "+port);

module.exports=app;



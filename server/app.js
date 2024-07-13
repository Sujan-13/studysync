const express = require("express");
const bodyParser=require("body-parser");
const cors=require("cors")
const {Pool}=require("pg");                     
const passport=require("passport");
const LocalStrategy=require("passport-local");
const bcrypt=require("bcrypt");
const session=require("express-session");
const crypto=require("crypto");
require("dotenv").config();

const PORT=process.env.PORT || 3001;

const secretKey=crypto.randomBytes(64).toString("hex");

const app=express();

app.use(cors({
    origin:"http://localhost:3000",
    credential:true
}));

app.use(bodyParser.json());


app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

passport.use(new LocalStrategy({
  usernameField:"email"
},async function verify(email,password,cb){
  console.log("Authenticating",email);
  const selectQuery=`SELECT email,password FROM users WHERE email=$1`;
  try {
  const result=await pool.query(selectQuery,[email]);
  const user=result.rows[0];
  if(result.rows.length===0){
    console.log("No user found");
    return cb(null,false,{message:"Incorrect Username!"});}
    try {
          const match =await bcrypt.compare(password, user.password);
          if(!match){
          return cb(null,false,{message:"Incorrect Password"});}

        return cb(null,user);
      }
      catch (error) {
          console.error('Error',error);
          return cb(error);
        }
  } catch (error) {
    console.error('Error',error);
    return cb(error);
  }}
));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.email, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


const pool = new Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
  });

  
app.post("/api/signup",async (req,res)=>{
    usrInp=req.body;
    console.log(usrInp);
    let name=usrInp.name;
    let email=usrInp.email;
    let password=await bcrypt.hash(usrInp.password,10);
    const insertQuery=`
    INSERT INTO users VALUES
    ($1::text,$2::text,$3::text);
    `;

    try {
      const client=await pool.connect();
      console.log("Connection Success");
        try {
          const query=await client.query(insertQuery,[email,password,name]);
          console.log("Query Success");
          const user={
            id:usrInp.email,
            username:usrInp.email
          };
          console.log(user.id);
          req.logIn(user,(err)=>{
            if (err) {
            console.log(err);  
            res.status(500).send(err);           
            }
            else{
              res.status(200).send(user);           
            }
          })
          // res.json({message:"Query Success!"});
          client.release();
          // pool.end();

        } catch (error) {
          console.error("Query Error",error);
           res.json(error);
        }
    } catch (error) {
      console.error("Connection Error",error);
       res.send("Connection Error",error);
    }

   
});

app.post("/api/login",passport.authenticate("local",{
  successRedirect:"/success",
  failureRedirect:"/failure"
}));

app.get("/success",(req,res)=>{
  res.send("Succeuuuss");
})

app.get("/failure",(req,res)=>{
  res.send("Failureyy");
})

app.get("/check",(req,res)=>{
  if (req.isAuthenticated()) {
    res.send("Hello, is Authenticated");
  }
  else{
    res.send("Not Authenticated");
  }
});

app.listen(PORT,()=>{
    console.log("Server started on "+PORT);
});
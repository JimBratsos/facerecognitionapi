const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const postgres = knex({
  client: 'pg',
  version: '11',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Markiplier1',
    database : 'facerecognition'
  }
});


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req,res)=>{ res.send('it is working!')})


app.post('/signin', (req,res)=>{signin.handleSignin(req,res,postgres,bcrypt)})


app.post('/register',(req,res)=>{register.handleRegister(req,res,postgres,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,postgres,bcrypt)})


app.put('/image',(req,res)=>{image.handleImage(req,res,postgres)})

app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)})


app.listen(process.env.PORT || 3001, ()=>{

	console.log(`App is all good on ${process.env.PORT} mate.`)
})
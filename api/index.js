const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User');
const Post = require('./models/Post');
const Contact = require('./models/Contact');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

//app.use(cors({credentials:true,origin:['https://foodies-blog-frontend.vercel.app'], methods:['POST', 'PUT', 'PUT']}));
app.use(cors({
  origin: 'https://foodies-blog-frontend.vercel.app', // Allow this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));


const username = 'faithdb';
const password = '1999ime.'; // URL-encoded password
const clusterUrl = 'alxproject.ji10y.mongodb.net';
const dbName = 'faithdb'; // Replace with your database name

const connectionString = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionString)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));



//mongoose.connect('mongodb+srv://faithdb:faithdb:1999ime.@alxproject.ji10y.mongodb.net/?retryWrites=true&w=majority&appName=alxproject')

app.get("/", (req, res) => 
  res.status(200).json({message: "Deployed to vercel Successful"})
  )

app.post('/register', async (req, res) => {
    const {username, useremail,password} = req.body;
    try{
        const userDoc = await User.create({
          username,
          useremail,
          password:bcrypt.hashSync(password,salt),
        });
        res.json(userDoc);
      } catch(e) {
        console.log(e);
        res.status(400).json(e);
      }
});

//Contact Request

app.post('/contact', async (req, res) => {
  const {name, email,phone, message} = req.body;
  try{
      const contactDoc = await Contact.create({
        name,
        email,
        phone,
        message,
      });
   
      res.json(contactDoc);
    } catch(e) {
      console.log(e);
      res.status(400).json(e);
    }
});


app.post('/login', async (req,res) => {
    const {useremail,password} = req.body;
    const userDoc = await User.findOne({useremail});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({useremail,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          useremail,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });

  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err,info) => {
      if (err) throw err;
      res.json(info);
    });
  });

  app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok');
  });

  //create post
  app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {title,summary,content} = req.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        file:newPath,
        author:info.id,
      });
      res.json(postDoc);
    });
  
  });
//Edit Post 

  app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path + '.' + ext;
      fs.renameSync(path, newPath);
    }
  
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
  
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
  
      if (!postDoc) {
        return res.status(404).json('Post not found');
      }
  
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json('You are not the author');
      }
  

      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.file = newPath ? newPath : postDoc.file;
  
      await postDoc.save();
      res.json(postDoc);
    });
  });
  
  //getting posts

  app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', 'username')
        .sort({createdAt: -1})
        .limit(20)
    );
  });

  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', 'username');
    res.json(postDoc);
  })

//app.listen(4000);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

//1999ime.

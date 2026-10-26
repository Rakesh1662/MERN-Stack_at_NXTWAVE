
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
//const sqlite3 = require('sqlite3').verbose();
const User = require('./models/users');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/user');

app.post('/register', (req, res) => {
    User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// app.get('/', (req, res) => {
//     res.send("Server started on port 3005");
// });

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                const token = jwt.sign(
                    {id: user._id, email: user.email}, 'secretkey', {expiresIn: '1h'});
                res.json({token})
            }else{
                return res.status(400).json({message : "Incorrect Password"})
            }
        }else{
            return res.status(400).json({message : "User Not Found"})
        }
    })
    .catch(err => res.json(err))
})

app.get('/index', async (req, res) => {
    let data = await axios.get('https://openlibrary.org/subjects/programming.json')
    console.log(data.data.works)
    res.json(data.data)
    
})

const quizdata = require('./quiz.json')
app.get('/quiz', (req, res) => {
    res.json(quizdata)   
})

app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3005,'0.0.0.0', () => {
    console.log("Server started on port 3005");
});
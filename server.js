const questionRouter = require('./routes/questions.js');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Question = require('./models/question.js')
const express = require('express');
const app = express();

//  TO ALLOW ENCODING
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view-engine', 'ejs');

const dbURI = 'mongodb+srv://batman:__pass_use__@cluster0.m21v6.mongodb.net/<dbname>?retryWrites=true&w=majority';
// now connecting to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function(result) {
        console.log('connected');
        app.listen(5000)
    }).catch(function(err) {
        console.log(err);
    })

app.use('/questions', questionRouter)

app.get('/', async function(req, res) {
    const questions = await Question.find().sort({ createdAt: 'desc' });
    res.render('questions/index.ejs', { questions: questions })
});

const express = require('express');
const Question = require('./../models/question.js')
const router = express.Router();

// to ask a new question
router.get('/new', function(req, res) {
    // will render
    res.render('questions/new.ejs')
});

// ROUTE FOR EDITING A POST
router.get('/edit/:id', async function(req, res) {
    // find the question by id
    const question = await Question.findById(req.params.id);
    res.render('questions/edit.ejs', { question: question });
})

router.post('/', function(req, res) {
    console.log(req.body.title);
    console.log(req.body.description);
    console.log(req.body.text);
    // now saving the question in the database
    const question = new Question({
        title: req.body.title,
        description: req.body.description,
        text: req.body.text
    })
    question.save()
        .then(function(result) {
            //console.log(result);
            res.redirect(`/questions/${question.id}`)
        }).catch(function(err) {
            console.log(err)
        })
});

// WAS WORKING HERE!


router.put('/:id', async function(req, res) {
    // finding by id
    let question = await Question.findById(req.params.id);
    question.title = req.body.title;
    question.description = req.body.description;
    question.text = req.body.text;
    question.save()
        .then(function(result) {
            res.redirect(`/questions/${question.id}`);
        }).catch(function(err) {
            console.log(err)
        })
    /*
    try {
        question = await question.save();
        res.redirect(`/questions/${question.id}`);

    } catch(e) {
        console.log(e);
    }*/
});


//  TO SHOW A QUESTION
router.get('/:id', async function(req, res) {
    // getting the question from the database by id
    const question = await Question.findById(req.params.id);
    // if there is no such question
    if (question == null) {
        res.redirect('/')
    } else {
        res.render('questions/show.ejs', { question: question })
    }
    
})

//  FOR DELETING A QUESTION
router.delete('/:id', async function(req, res) {
    await Question.findByIdAndDelete(req.params.id);
    res.redirect('/');
})

/*

function saveQuestion(path) {
    return async function(req, res) {
        let question = req.question;
        question.title = req.body.title;
        question.description = req.body.description;
        question.text = req.body.text;

        // now
        try {
            article = await article.save();
            console.log('success')
            res.redirect('/articles');

        } catch(e) {
            res.redirect('/new')
            console.log(e);
        }
    }
}
*/


// we need to export this router
module.exports = router
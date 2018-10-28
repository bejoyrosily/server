const express = require('express');
const app = express();
const Joi = require('joi');
const cors = require('cors'); 
var bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.json());

const QUESTIONS =[
    {
        qtn: 'Profession',
        option1: 'IT',
        option2: 'Academics',
        option3: 'Business',
        option4: 'Others'   
    },
    {
        qtn: 'Job Environment',
        option1: 'Very Bad',
        option2: 'Bad',
        option3: 'Good',
        option4: 'Very Good'  
    }
];

app.get('/api/questions',(req,res)=>{
    res.send(QUESTIONS);
})

app.post('/api/questions', (req,res)=>{
    console.log(req.body)
    const schema = {
        qtn: Joi.string().required(),
        option1: Joi.string().required(),
        option2: Joi.string().required(),
        option3: Joi.string().required(),
        option4: Joi.string().required()
    };

    const result = Joi.validate(req.body,schema);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const question = {
        qtn: req.body.qtn,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4, 
    }

    QUESTIONS.push(question);
    console.log('successfully saved..');
})

app.listen(3000,()=>console.log('Listening on port 3000..'))
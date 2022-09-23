const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Student = require('../models/club')

router.get('/', (req, res) => {
    Student.find((err, data) => {
        if(err) {
            throw err;
        }

        res.render('pages/list', {
            student: data
        })
    })
})

router.get('/add', (req, res) => {
    res.render('pages/add')
});

router.post('/add', [
    check('name', 'Name is required').exists().notEmpty(),
    check('email', 'Email is required').exists().notEmpty(),
    check('password', 'Password is required').exists().notEmpty(),
    check('confirmPassword', 'Confirm Password is required').exists().notEmpty()
], (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render('pages/add', {
           alert : errors.array()
        })
    } else {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword
    
        const student = new Student({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        })
    
        student.save(err => {
            if(err) {
                res.render('pages/add', {
                    alert : [{'msg': err.message}]
                })
            } else {
                res.redirect('/')
            }
        })
    }
});


router.get('/update/:id', (req, res) => {
    Student.findOne({_id: req.params.id}, null, {new:true}, (err, data) => {
        if(err) {
            throw err;
        }

        res.render('pages/update', {'student': data})
    })
})

router.post('/update/:id', (req, res) => {
    Student.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
        if(err) {
            throw err;
        }

        res.redirect('/')
    })
})

router.get('/view/:id', (req, res) => {
    Student.findById({_id: req.params.id}, null, (err, data) => {
        if(err) {
            throw err;
        }

        res.render('pages/view', {
            student: data
        })
    })
})

router.get('/delete/:id', (req, res) => {
    Student.deleteOne({_id: req.params.id}, null, (err) => {
        if(err) {
            throw err;
        }

        res.redirect('/')
    })
})

module.exports = router
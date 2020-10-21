let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Book = require('../models/book');

module.exports.displayComponentList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('component/list', 
            {title: 'Components', 
            BookList: bookList, 
            displayName: req.user ? req.user.displayName : ''});            
        }
    });
}

module.exports.displayAddPage = (req, res, next) =>{
    res.render('component/add', {title: 'Add Component', 
    displayName: req.user ? req.user.displayName : ''});
}

module.exports.processAddPage = (req, res, next) =>{
    let newComponent = Book({
        "username": req.body.username,
        "name": req.body.name,
        "password": req.body.password,
        "email": req.body.email,
        "cellphone": req.body.cellphone
    });

    Book.create(newComponent, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the component list
            res.redirect('/book-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) =>{
    let id = req.params.id;

    Book.findById(id, (err, componentToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('component/edit', {title: 'Edit Component', component: componentToEdit, 
            displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) =>{
    let id = req.params.id

    let updateComponent = Book({
        "_id": id,
        "username": req.body.username,
        "name": req.body.name,
        "password": req.body.password,
        "email": req.body.email,
        "cellphone": req.body.cellphone
    });

    Book.updateOne({_id: id}, updateComponent, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }

        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}


module.exports.performDelete = (req, res, next) =>{
    let id = req.params.id;
    
    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });
}
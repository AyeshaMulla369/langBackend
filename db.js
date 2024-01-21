const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ayeshamulla369:ayesha@cluster0.86yzehl.mongodb.net/?retryWrites=true&w=majority').then(
    () => {
        console.log('Connected to database');
    }).catch((err) => {
        console.log('Error connecting to database ' + err);
    })
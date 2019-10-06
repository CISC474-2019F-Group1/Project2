const express = require('express');

const app = express();

// app.use((req,res,next) => {
//     console.log('First');
//     next();
// });
// app.use((req,res,next) => {
//     res.send('First sent');
//     next();
// });



app.use('/api/text',(req,res,next) => {
    const Texts = [{
        id:"asdsadasd",
        title: "First server text",
        content:"coming from server"
    }];
    res.status(200).send(
        {message: 'text fetched succesfully',
        Texts: Texts}
    );
});

module.exports = app;
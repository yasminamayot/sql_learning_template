const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => {
    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card";

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
         res.render('home', { people: result });

         // , { data: result }
    })
});

router.get('/users/:id', (req, res) => {
    console.log('hit a dynamic route!');
    console.log(req.params.id);

    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;
// dynamic selection based on the id
    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }
        
        console.log(result); //should see objects in array
        
        //turn on social property into an array - it's just text in the DB
        //which isn't anything we can work with
        result[0].social = result[0].social.split(",").map(function(item) {
            item = item.trim(); // remove the extra spaces from each word

            return item;
        })

        // console.log('after split: ', result[0]);

        res.json(result); // sends the DB query back to the broswer
    })
})

module.exports = router;
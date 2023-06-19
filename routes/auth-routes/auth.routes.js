const express = require('express');
const router = express.Router();
const User = require('../../models/users');

router.post('/signup', function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = new User({ username: username, password: password });

    user.save(function(err) {
        if (err) {
            res.render('error', { errorMessage: 'An error occurred during signup.' });
        } else {
            res.redirect('/login');
        }
    });
});

// Other routes...

module.exports = router;
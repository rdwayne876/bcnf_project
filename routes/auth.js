var express = require('express');
var conn = require('../bin/db')
var router = express.Router();

router.post('/login', (req, res, next) => {
  var email = req.body.email
  var password =  req.body.password

  var sql = 'SELECT * FROM teachers WHERE email = ? and BINARY password = ?'

  conn.query(sql, [email, password], (err, results) => {
    // console.log(results);

    if( results.length <= 0) {
      req.flash('error', 'Invalid Credentials. Please try again!')
      res.redirect('/')
    } else {
      req.session.loggedIn = true;
      req.session.teach_id = results[0].id;
      req.session.first_name = results[0].first_name;
      req.session.last_name =  results[0].last_name;

      // console.log(req.session);
      res.redirect('../users/dashboard')
    }
  })
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;

var express = require('express');
var conn = require('../bin/db')
var router = express.Router();

router.get('/index', (req, res) => {

  if (req.session.loggedIn === true) {
    // console.log(req.session);

    var sql = "SELECT * FROM courses;"

    conn.query(sql, (err, results) => {
      if (err)
        throw err
      else
        // console.log(results);
      res.render('./pages/courses/index',
        {
          title: 'Courses',
          data: results
        })
    })
  } else {
    res.redirect('/')
  }
})



module.exports = router;

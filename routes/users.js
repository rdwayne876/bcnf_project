var express = require('express');
var conn = require('../bin/db')
var router = express.Router();

router.get('/dashboard', (req, res) => {

  if (req.session.loggedIn === true) {
    // console.log(req.session);

    var sql = "SELECT COUNT(id) AS total_students FROM students ; SELECT COUNT(id) AS total_courses FROM courses; SELECT COUNT(id) AS my_courses FROM course_teachers WHERE id = ?; SELECT COUNT(st.first_name) AS my_students FROM  students st , courses cs , teachers tr,  course_teachers ct , student_courses sc WHERE ct.teacher_id = tr.id AND ct.course_id = cs.id AND sc.student_id = st.id AND sc.course_id = cs.id AND tr.id = ?; SELECT * FROM students;"

    conn.query(sql, [req.session.teach_id, req.session.teach_id], (err, results) => {
      if (err)
        throw err
      else
        // console.log(results);
      res.render('./pages/dashboard/dashboard',
        {
          title: 'Dashboard',
          data: results

        })
    })
  } else {
    res.redirect('/')
  }
})



module.exports = router;

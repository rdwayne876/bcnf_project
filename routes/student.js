var express = require('express');
var conn = require('../bin/db')
var router = express.Router();

router.get('/dashboard', (req, res) => {

    if( req.session.loggedIn === true) {
        var sql = "SELECT st.id, st.first_name, st.last_name, st.email FROM students st , courses cs , teachers tr, course_teachers ct , student_courses sc WHERE ct.teacher_id = tr.id AND ct.course_id = cs.id AND sc.student_id = st.id AND sc.course_id = cs.id AND tr.id = ?;"
    
        conn.query(sql, req.session.teach_id, (err, results) => {
            if (err)
                throw err
            else
            res.render('./pages/students/index',
            {
              title: 'Students',
              data: results
    
            })
        })
    } else{
        res.redirect('/')
    }

    

})

router.get('/add', (req, res) => {

    if (req.session.loggedIn === true) {

        res.render('./pages/students/add', 
        {
            title: "Add Student"
        })
    } else {
        res.redirect('/')
    }
})

router.post('/add', ( req, res) => {
    if( req.session.loggedIn === true) {
        var data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }

        var sql = 'INSERT INTO students SET ?'

        conn.query(sql, data, (err, results) => {
            if (err)
                throw err
            else
                req.flash('success', 'Student Added Successfully!')
                res.redirect('/users/dashboard')
        })
    }
})

router.get('/edit/:id', (req, res) => {

    if (req.session.loggedIn === true) {

        var sql = "SELECT * FROM `students` WHERE id = ?;"
        console.log(req.params.id)

        conn.query(sql, req.params.id, (err, results) => {
            if (err)
                throw err
            else
                console.log(results);
                res.render('edit',
                    {
                        title: 'Edit',
                        data: results
                    }
                )
            }
        )
    } else {
        res.redirect('/')
    }
})

router.post('/update/:id', (req, res) => {

    var fname = req.body.first_name
    var lname = req.body.last_name
    var email = req.body.email
    var sql = `UPDATE students SET first_name = ?, last_name = ?, email = ? WHERE students.id = ?`

    console.log(fname, lname, email, req.params.id)

    conn.query(sql, [fname, lname, email, req.params.id], (err, results) => {
        if (err)
            throw err
        else
            res.redirect('/students/dashboard')
    })
})

module.exports = router;

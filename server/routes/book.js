let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let bookController = require('../controllers/book');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Book List page - READ OPeration */
router.get('/', bookController.displayComponentList);

/* GET Route for displaying Add page - CREATE OPeration */
router.get('/add', requireAuth, bookController.displayAddPage);

/* Post Route for processing the Add page - CREATE OPeration */
router.post('/add', requireAuth, bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE OPeration */
router.get('/edit/:id', requireAuth, bookController.displayEditPage);

/* Post Route for processing the Edit page - UPDATE OPeration */
router.post('/edit/:id', requireAuth, bookController.processEditPage);

/* GET to perform Deletion - DELETE OPeration */
router.get('/delete/:id', requireAuth, bookController.performDelete);


module.exports = router;
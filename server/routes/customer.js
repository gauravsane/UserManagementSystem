const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController')

// customer routes


//Home
router.get('/',customerController.homepage)

//About
router.get('/about',customerController.aboutPage)


//add 
router.get('/add',customerController.addCustomer);
//Post
router.post('/add',customerController.postCustomer);




router.get('/view/:id', customerController.view);

router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);

router.delete('/edit/:id', customerController.deleteCustomers);


router.post('/search',customerController.searchCustomer);

module.exports = router;
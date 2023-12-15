const Customer = require('../models/schema');
const mongoose = require('mongoose');


// Get Home Page
exports.homepage = async (req, res) => {
    const messages = await req.flash("info");
  
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };
  
    let perPage = 12;
    let page = req.query.page || 1;
  
    try {
      const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
      const count = await Customer.countDocuments({});
  
      res.render("dashboard", {
        locals,
        customers,
        current: page,
        pages: Math.ceil(count / perPage),
        messages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  exports.aboutPage = async (req,res)=>{

    const locals = {
        title: "About Page",
        content: "Simple User Management System"
    }

    res.render('about',locals)
}


// Get New Customer form
exports.addCustomer = async (req,res)=>{

    const locals = {
        title: "Add New Customer",
        content: "Simple User Management System"
    }

    res.render('customer/add',locals)
}


// Post Create New Customer 
exports.postCustomer = async (req,res)=>{

    console.log(req.body);
    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email
    })
    try {
        await Customer.create(newCustomer);
        await req.flash('info','New Customer has been Added')
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}


//Get Customer Data
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
}; 


//Get Edit Customer Data
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
}; 


//Get Update Customer Data
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updateAt: Date.now()
    })
    res.redirect(`/edit/${req.params.id}`)
  } catch (error) {
    console.log(error);
  }
}; 


//Delete Customer Data
exports.deleteCustomers = async (req, res) => {
  try {
    await Customer.deleteOne({_id: req.params.id});
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}; 


//Get Search Customer Data
exports.searchCustomer = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const noSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: {$regex: new RegExp(noSpecialChar, "i") }},
        { lastName: {$regex: new RegExp(noSpecialChar, "i") }},
      ]
    });
    
    res.render("search",{
      customers,
      locals
    })
  } catch (error) {
    console.log(error);
  }
}
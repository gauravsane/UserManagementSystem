require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
// const { flash } = require('express-flash-message');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db')

const app = express();
const port = 3421 || process.env.PORT

// To connect Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// middleware
app.use(methodOverride('_method'));

//static files(html,css)
app.use(express.static('public'));

// express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
    }
}));

// midelware flash messages
app.use(flash({sessionKeyName: 'flashMessage'}));


//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/',require('./server/routes/customer'));

//This will render the error page
app.get('*',(req,res)=>{
    res.render('Error');
})

app.listen(port,()=>{
    console.log('listening on port http://localhost:3421')
})
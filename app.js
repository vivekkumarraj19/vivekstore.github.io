const express = require("express");
const path = require("path");

const app = express();
var mongoose =require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const port = 800;


//define mongooes schema
var contactSchema= new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    date: String

  });
var Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{                                                                       
    
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    
  var myData = new Contact(req.body);
  myData.save().then(()=>{
      res.send("this item has been saved to the database ")
  }).catch(()=>{
      res.status(200).send("the item was not saved to the database")
  });

    //res.status(200).render('contact.pug');
})

app.get('/services', (req, res)=>{
    
    const params = {}
    res.status(200).render('services.pug', params);
})
app.get('/womens', (req, res)=>{
    
    const params = {}
    res.status(200).render('womens.pug', params); 

})
app.get('/about', (req, res)=>{
    
    const params = {}
    res.status(200).render('about.pug', params);
})
app.get('/mobile', (req, res)=>{
    
    const params = {}
    res.status(200).render('mobile.pug', params);

})
app.get('/reg', (req, res)=>{
    
    const params = {}
    res.status(200).render('reg.pug', params); 
})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
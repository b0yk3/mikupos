const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

const app = express();
const bars = exphbs({ 
	defaultLayout: 'main'
})

const auth = jwt({ secret: 'harussudahd13ncrypted', requestProperty: 'auth'})
.unless({ path:  ["/favicon.ico","/","/logout", 
                  "/item","/trans", // /^\/data\/view\/.*/ ,
                  "/auth" , /^\/login\/.*/]  });

// Generate valid JWT
// console.log(jsonwebtoken.sign({ foo: 'bar' }, 'thisIsSecret'));

app.engine('handlebars', bars)
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(require("path").join(__dirname, 'public')))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    
     next();
    });

app.use(function(err, req, res, next) {
      if (err.constructor.name === 'UnauthorizedError') {
          res.status(401).send('invalid token...');
      }
});

app.use(auth);
app.set('trust proxy',1);

app.use(cookieSession(
  {
    name: "session" ,
    keys: ['ini_bukan_kunci']
  
  }
))

    /*
app.use(jwt(
{
  secret : '1e8caa4bd327832d6d1e236e097d8f1b' ,
  credentialsRequired: false
  //audience : ''
}
));

//.unless({ path: ["/tokenauth" ,"/"]}));

  /*
var iauth = function(req, res, next){
  console.log("iaut calling");
  console.log( req.headers)
 if( req.headers.xtoken ){
  console.log("iaut calling satu");  
  return next();
    
 }{
  console.log("iaut calling dua");
    return res.json({ error: 'No credentials sent!' });
  }
}

*/

let login = require("./controllers/frmlogin");
app.get('/login/:userlogin/:password', login.checklogin );
app.get('/logout', (req,res) =>{

    req.session = null;
    res.redirect('/');

});

let menu = require("./menu");
app.get('/', 	 (req, res) => {
     console.log(req.session);
    // let _s = (...req.session);

     if( req.session.login == null ){
      res.render('login', menu(req) )
     } else {
      res.render('home', menu(req))
     }
     
    });  
app.get('/item', (req,res) => 
{
  console.log(req.session)
  if( req.session.login == null ){   
      res.redirect('/');
  } else {
      res.render('item', menu(req))
  }

});
app.get('/trans', (req,res) => 
{ 
  console.log(req.session)
  if( req.session.login == null ){   
      res.redirect('/');
  } else {
      res.render('trans', menu(req))
}
});

app.get('/auth', (req,res) =>
 { 
  console.log(req.session);
  res.render('login', menu(req) )
            
       
 });


let frmitem = require("./controllers/frmitem")
app.get('/data/item' ,frmitem.itemData );
app.post('/data/item', frmitem.itemSave );
app.put('/data/item/:itemId', frmitem.itemUpdate );
app.delete('/data/item/:itemId', frmitem.itemDelete);

app.get('/data/itemopt' , frmitem.itemgrpOptions);
app.get('/data/itemfinder/:itemdesc' , frmitem.itemSearch);

let frmtrans = require("./controllers/frmtrans");
app.get('/data/htrans', frmtrans.frmhtrans );
app.get('/data/dtrans/:transid', frmtrans.frmdtrans );

app.get('/data/htrans/getlast/id', frmtrans.getlasthid );
app.post('/data/htrans', frmtrans.htranssave );
app.put('/data/htrans/:transid', frmtrans.htransupdate );


app.post('/data/dtrans', frmtrans.dtranssave );
app.put('/data/dtrans/:dtransid', frmtrans.dtransupdate );
app.delete('/data/dtrans/:dtransId', frmtrans.dtransdelete);

let dashboard = require("./controllers/dashboard");
app.get('/data/view/trans/:tgl', dashboard.daytrans );
app.get('/data/view/itemtrans/:tgl', dashboard.dailyitems );
app.get('/data/view/sales/:tgl', dashboard.dailysale);


console.log("app start on port : 9829 ");

app.listen(9829,"127.0.0.1");

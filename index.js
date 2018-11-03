var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var bars = exphbs({ 
	defaultLayout: 'main'
})

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


var menu = require("./menu");
app.get('/', 	 (req, res) => res.render('home', menu(req) ));  
app.get('/item', (req,res) => res.render('item', menu(req) ));
app.get('/trans', (req,res) => res.render('trans', menu(req) ));

var frmitem = require("./controllers/frmitem")
app.get('/data/item',  frmitem.itemData );
app.post('/data/item', frmitem.itemSave );
app.put('/data/item/:itemId', frmitem.itemUpdate );
app.delete('/data/item/:itemId', frmitem.itemDelete);

app.get('/data/itemopt' , frmitem.itemgrpOptions);
app.get('/data/itemfinder/:itemdesc' , frmitem.itemSearch);

var frmtrans = require("./controllers/frmtrans");
app.get('/data/htrans', frmtrans.frmhtrans );
app.get('/data/dtrans/:transid', frmtrans.frmdtrans );

console.log("app start on port : 9829 ");

app.listen(9829);

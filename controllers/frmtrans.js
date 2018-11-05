var db = require("../models/posdb");

var frmhtrans = function(req, res){
    db.Htrans.findAll().then( d => res.json(d))
}

var frmdtrans = function(req, res){
    var hid = req.params.transid;
    db.Dtrans.findAll({
        where: {poshtranId: hid},
        include:[
            { model: db.Item ,             
              required: false
            }
        ]
    })    
    .then( d => res.json(d))
}

var htranssave = function( req, res){
   console.log(req.body);
     db.Htrans.create(req.body).then( (o) => 
     res.json({ id: o.id}));
}

var getlasthid = function( req , res ){
    db.Htrans.max('id').then( d => res.json(d));
}    

var htransupdate = function( req, res ){
    var id = req.params.transid;
    db.Htrans.findById(id)
    .then((htrans) => htrans.update(req.body))
    .then(() => res.json({}));
    
}

var dtransupdate = function( req , res ){
    db.Dtrans.findById(req.params.dtransid)
    .then((dtrans) => dtrans.update(req.body))
    .then(() => res.json({}));
}

var dtranssave = function( req, res){
    console.log(req.body);
      db.Dtrans.create(req.body).then( (o) => 
      res.json({ id: o.id}));
 }

 var dtransdelete = function ( req, res ){
    db.Dtrans.findById(req.params.dtransId)
      .then( (dtrans) => dtrans.destroy())
      .then( () => res.json({}));
}

module.exports = { frmdtrans, frmhtrans, htranssave, getlasthid, dtransdelete,
                   htransupdate,dtransupdate, dtranssave }
const db = require("../models/posdb");

let frmhtrans = function(req, res){
    db.Htrans.findAll().then( d => res.json(d))
}

let frmhtransdate = function(req, res){
  let tgl= req.params.tgl || "2018-11-10";
    let sql= `select a.*,(select sum(price*qty) from posdtrans b where b.poshtranId=a.id) jmltotal from poshtrans a
    where DATE(a.date)="${tgl}"`;

    db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
    .then( xobj => {
     res.json(xobj);
  })
}

let frmdtrans = function(req, res){
    let hid = req.params.transid;
    db.Dtrans.findAll({
        where: {poshtranId: hid},
        include:[
            { model: db.Item , 
              attributes: ['itemdesc','itemprices'],            
              required: false
            }
        ]
    })    
    .then( d => res.json(d))
}

let htranssave = function( req, res){
   console.log(req.body);
     db.Htrans.create(req.body).then( (o) => 
     res.json({ id: o.id}));
}

let getlasthid = function( req , res ){
    db.Htrans.max('id').then( d => res.json(d));
}    

let htransupdate = function( req, res ){
    var id = req.params.transid;
    db.Htrans.findById(id)
    .then((htrans) => htrans.update(req.body))
    .then(() => res.json({}));
    
}

let dtransupdate = function( req , res ){
    db.Dtrans.findById(req.params.dtransid)
    .then((dtrans) => dtrans.update(req.body))
    .then(() => res.json({}));
}

let dtranssave = function( req, res){
    console.log(req.body);
      db.Dtrans.create(req.body).then( (o) => 
      res.json({ id: o.id}));
 }

 let dtransdelete = function ( req, res ){
    db.Dtrans.findById(req.params.dtransId)
      .then( (dtrans) => dtrans.destroy())
      .then( () => res.json({}));
}

module.exports = { frmdtrans, frmhtrans, frmhtransdate, htranssave, getlasthid, dtransdelete,
                   htransupdate,dtransupdate, dtranssave }
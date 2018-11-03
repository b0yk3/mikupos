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

module.exports = { frmdtrans, frmhtrans }
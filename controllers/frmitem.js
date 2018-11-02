var db = require("../models/posdb");

var itemSave = function( req, res ){
    console.log(req.body);
    db.Item.create(req.body).then( (o) => 
        res.json({ id: o.id})
    );
} 

var itemData = function(req, res){
        db.Item.findAll().then( d => res.json(d))
}

var itemUpdate = function(req,res){
    console.log( req.body)
    var { itemcode, itemdesc, itemprices, itemhpp, itemunit, posigrpId } = req.body;
    db.Item.findById(req.params.itemId)
     .then((item) => item.update(req.body))
     .then(() => res.json({}));
}

var itemDelete = function ( req, res ){
    db.Item.findById(req.params.itemId)
      .then( (item) => item.destroy())
      .then( () => res.json({}));
}

var itemgrpOptions = function(req, res){
    db.Itemgrp.findAll({ attributes: ["id", ["grpdesc", "value"]] }).then((data) => res.json(data));
}

module.exports = { itemSave, itemData, itemUpdate, itemDelete , itemgrpOptions }
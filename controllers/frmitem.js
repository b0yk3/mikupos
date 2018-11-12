const db = require("../models/posdb");

let itemSave = function( req, res ){
    console.log(req.body);
    db.Item.create(req.body).then( (o) => 
        res.json({ id: o.id})
    );
} 

let itemData = function(req, res){
        db.Item.findAll().then( d => res.json(d))
}

let itemUpdate = function(req,res){
    console.log( req.body);
    var { itemcode, itemdesc, itemprices, itemhpp, itemunit, posigrpId } = req.body;
    db.Item.findByPk(req.params.itemId)
     .then((item) => item.update(req.body))
     .then(() => res.json({}));
}

let itemDelete = function ( req, res ){
    db.Item.findById(req.params.itemId)
      .then( (item) => item.destroy())
      .then( () => res.json({}));
}

let itemgrpOptions = function(req, res){
    db.Itemgrp.findAll({ attributes: ["id", ["grpdesc", "value"]] }).then((data) => res.json(data));
}

let itemSearch = function(req, res){
    var f = "%" + req.params.itemdesc + "%";
    db.Item.findAll({ attributes: ["id", ["itemdesc", "value"], ["itemprices","harga"]],
                     where: { itemdesc: {[db.op.like] : f }} }).then((data) => res.json(data));
}

module.exports = { itemSave, itemData, itemUpdate, itemDelete , itemgrpOptions, itemSearch }
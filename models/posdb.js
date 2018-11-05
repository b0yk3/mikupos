const Sequelize = require('sequelize');

var sequelize = new Sequelize('dbpos001', 'root', '',{
  host:"localhost",
  dialect:"mysql"
});

const op = Sequelize.Op;

var Item = sequelize.define( 'positem',
{
  itemcode: Sequelize.STRING(10),
  itemdesc: Sequelize.STRING,
  itemprices: Sequelize.DECIMAL(12,2),
  itemhpp: Sequelize.DECIMAL(12,2),
  itemunit: Sequelize.STRING(3)
});

var Itemgrp = sequelize.define('posigrp',{
    grpdesc: Sequelize.STRING
});

Item.belongsTo(Itemgrp)

var Htrans = sequelize.define('poshtrans',{
    date: Sequelize.DATE,
    desc: Sequelize.STRING,
    status: Sequelize.STRING(5),
    text: Sequelize.TEXT,
    tags: Sequelize.STRING(3)
});

var Dtrans = sequelize.define('posdtrans',{
    qty: Sequelize.NUMERIC,
    desc: Sequelize.STRING
}); 

Dtrans.belongsTo(Item);
Dtrans.belongsTo(Htrans);
Htrans.hasMany(Dtrans);

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.INTEGER,
  group_id: Sequelize.INTEGER
});


  
module.exports = {
 User, Item, Htrans, Dtrans, Itemgrp, op 
};


sequelize.sync({ force: true}).then( () => { 

Itemgrp.create({
   grpdesc: "beverage"
});

Itemgrp.create({
  grpdesc: "food"
})

Item.create({
  itemcode: "bean01",
  itemdesc: "Espresso",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemcode: "bean02",
  itemdesc: "Americano",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemcode: "bean03",
  itemdesc: "V60 Arabica honey",
  itemprices: 25000,
  itemhpp: 20000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemcode: "food01",
  itemdesc: "Nasi Goreng",
  itemprices: 25000,
  itemhpp: 20000,
  itemunit: "SET",
  posigrpId: 2
});

Item.create({
  itemcode: "food02",
  itemdesc: "Kentang Goreng",
  itemprices: 20000,
  itemhpp: 12000,
  itemunit: "SET",
  posigrpId: 2
});

Htrans.create({
  date: "2018-10-11",
  desc: "test",
  text: "data penjualan",
  status: "new",
  tags: "POS"
});

Dtrans.create({
  poshtranId: "1",
  positemId: "1",
  qty: 10,
  desc: "test data"
});




console.log('success')

});


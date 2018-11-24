const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize('dbpos001', 'root', '',{
  host:"localhost",
  dialect:"mysql",
  operatorsAliases
    });

let Item = sequelize.define( 'positem',
{
  itemdesc: Sequelize.STRING,
  itemprices: Sequelize.DECIMAL(12,2),
  itemhpp: Sequelize.DECIMAL(12,2),
  itemunit: Sequelize.STRING(3),
  itemactive: Sequelize.BOOLEAN
});

let Itemgrp = sequelize.define('posigrp',{
    grpdesc: Sequelize.STRING
});

Item.belongsTo(Itemgrp)

let Htrans = sequelize.define('poshtrans',{
    date: Sequelize.DATE,
    status: Sequelize.STRING(5),
    text: Sequelize.TEXT,
    tags: Sequelize.STRING(3)
});

let Dtrans = sequelize.define('posdtrans',{
    qty: Sequelize.NUMERIC,
    price: Sequelize.NUMERIC,
    ddesc: Sequelize.STRING
}); 

Dtrans.belongsTo(Item);
Dtrans.belongsTo(Htrans);
Htrans.hasMany(Dtrans);

let User = sequelize.define('user', {
  username: Sequelize.STRING,
  joindate: Sequelize.DATE,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING(32)
});

 
module.exports = {
 User, Item, Htrans, Dtrans, Itemgrp, Op, sequelize
};


/*

let gndate = `create or replace view _vgendate as select * from 
 (select adddate('1990-01-01',t4*10000 + t3*1000 + t2*100 + t1*10 + t0) gen_date from
 (select 0 t0 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
 (select 0 t1 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
 (select 0 t2 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
 (select 0 t3 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
 (select 0 t4 union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v`;

let vtrans = `create or replace view _vtrans as 
              select poshtranid,date,positemid,itemdesc,qty,price,qty*price hrgjual,status,text,tags,ddesc 
              from posdtrans 
              left join positems on positems.id=positemid 
              left join poshtrans on poshtrans.id=poshtranid and status<>"cnl"`;

sequelize.sync({ force: true}).then( (s) => { 

s.query(vtrans);

User.create({
  username: "Admin",
  password: "d8bd79cc131920d5de426f914d17405a", //min
  joindate : "2018-01-01",
  name: "Aa Admin"
})

Itemgrp.create({
   grpdesc: "beverage"
});

Itemgrp.create({
  grpdesc: "food"
})

Item.create({
  itemdesc: "Espresso (Double)",
  itemprices: 22000,
  itemhpp: 12000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Espresso (Single)",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Long Black (Americano)",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Single Origin Natural",
  itemprices: 25000,
  itemhpp: 20000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Cappucino",
  itemprices: 18000,
  itemhpp: 20000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "HOT Coffee Latte",
  itemprices: 18000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Coffee Latte Ice",
  itemprices: 20000,
  itemhpp: 15000,
  itemunit: "CUP",
  posigrpId: 1
});


Item.create({
  itemdesc: "Milk Coffe Ice Miku (*)",
  itemprices: 18000,
  itemhpp: 15000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Hot Chocolatte",
  itemprices: 13000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});


Item.create({
  itemdesc: "Chocolatte Ice",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "HOT Tea (Lipton)",
  itemprices: 10000,
  itemhpp: 10000,
  itemunit: "CUP",
  posigrpId: 1
});

Item.create({
  itemdesc: "Kentang Goreng",
  itemprices: 15000,
  itemhpp: 12000,
  itemunit: "SET",
  posigrpId: 2
});

Item.create({
  itemdesc: "Nasi Goreng",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "SET",
  posigrpId: 2
});

Item.create({
  itemdesc: "Roti Bakar",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "SET",
  posigrpId: 2
});

Item.create({  
  itemdesc: "Aneka Cemilan",
  itemprices: 15000,
  itemhpp: 10000,
  itemunit: "SET",
  posigrpId: 2
});



console.log('success')

});
*/
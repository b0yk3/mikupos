const db = require("../models/posdb");


let daytrans = function( req, res){
    let tgl = req.params.tgl || "2018-11-10";
    let sql = `SELECT * FROM _vtrans WHERE DATE(date)="${tgl}";`;
   
    db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
    .then( xobj => {
     res.json(xobj);
  })
}

let dailyitems = function( req ,res ){
    let tgl = req.params.tgl || "2018-11-10";
    let sql = `select a.*,qty*itemprices total from
    (select id,itemdesc,(select "${tgl}") tgl,
          ifnull(( select sum(qty) from  _vtrans b 
              where date(date)=tgl and positemid=id group by positemid ),0) qty,itemprices 
              from positems c)  a order by qty desc
              `;

    db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
    .then( xobj => {
     res.json(xobj);
  })

}

let dailysale = function( req, res ){
    let tgl= req.params.tgl || "2018-11-10";
    let sql= `select id,date,status, 
    (select count(1) from posdtrans b where b.poshtranid=a.id group by b.poshtranid) as jmlitems,text,tags,
    (select sum(price*qty) from posdtrans c where c.poshtranid=a.id group by c.poshtranid) as total from poshtrans a
    where DATE(a.date)="${tgl}"`;

    db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
    .then( xobj => {
     res.json(xobj);
  })

}

let dailysumsales = function( req, res){
  let tgl= req.params.tgl || "2018-11-10";
  let sql = `select Date(a.date) tgl,sum(price*qty) sales from poshtrans a 
             left join posdtrans b on a.id=b.poshtranid 
             where status <> "cnl" and DATE(a.date)="${tgl}" 
             group by (date(a.date));`;

  db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
  .then( xobj => {
   res.json(xobj);
})

}

module.exports = {
    daytrans,
    dailyitems,
    dailysale,
    dailysumsales
}


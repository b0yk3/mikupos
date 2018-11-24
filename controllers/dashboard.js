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
  .then( (sales) => {
     res.json(sales); 
  })

}

let uptoomzet = (req,res) => {
  let sql = 'select itemdesc,sum(hrgjual) omzet,sum(qty) qty from _vtrans group by itemdesc order by omzet desc;'           
  db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
  .then( (omzet) => {
     res.json(omzet); 
  })
}

let graphomzet30 = (req,res) =>
{
  let sql = `select date_format(gen_date,"%d") id,a.gen_date tgl,
  ifnull((select sum(hrgjual) from _vtrans where Date(date) = tgl group by Date(date)),0) omzet,
  ifnull((select sum(qty) from _vtrans where Date(date) = tgl group by Date(date)),0) qty
  from _vgendate a where gen_date  between (current_date - interval 31 day) and current_date order by tgl`;

  db.sequelize.query(sql, { type: db.sequelize.QueryTypes.SELECT})
  .then( (graphomzet) => {
     res.json(graphomzet); 
  });

}

module.exports = {
    daytrans,
    dailyitems,
    dailysale,
    dailysumsales,
    uptoomzet,
    graphomzet30
}


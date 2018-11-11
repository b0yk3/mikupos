const db = require("../models/posdb");
const jsonwebtoken = require('jsonwebtoken');
const md5hash = require("md5");

let checklogin = function ( req, res ){
    console.log( req.params );
    db.User.findOne({
      where : { username: req.params.userlogin ,
                password: md5hash(req.params.password) },
      attributes : [ 'name', 'password' ]
    }).then(function(u){
  //    console.log(u);
      console.log(req.session);
     if( u == null ){
        req.session = null;
        res.json({ error: 'There is not valid users using that name!'});
         
     }   else {
      let useracs = { name : u.password }
      let token =  jsonwebtoken.sign(useracs, 'harussudahd13ncrypted')

      useracs.name = u.name;
      useracs.token = token;

      req.session.login = useracs;

      console.log(useracs);

      res.json( useracs);
    }
}) 
    
    // (
     //   u => res.json({ error: 'There is not valid users using that name!' })
     
    //)
}

module.exports = { checklogin }

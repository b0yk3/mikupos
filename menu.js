module.exports = function(req){

  var menu = [
    { value:"Master data", data:[
      { href:'/item', value:"Pemeliharaan data barang" },
      { href:'/Group', value:"Pemeliharaan data group barang" },
      { href:'/user', value:"Pemeliharaan data user" },
    ]},
    { value:"Transaksi", data:[
      { href:'/trans', value:"Transaksi penjualan" },
    ]},
    { value:"Laporan", data:[
      { href:'/lap1', value:"Rekap laporan penjualan harian" },
      { href:'/lap2', value:"Analisa laporan" }
    ]},
    { value:"Bantuan", data:[
      { href:'/about', value:"Tentang Program" },
      { href:'/logout', value:"Logout" }
    ]}
  ];

  for (var i=0; i<menu.length; i++)
    for (var j = 0; j < menu[i].data.length; j++) {
      var item = menu[i].data[j];
      if (item.href == req.url)
        item.css = "selected";
    }

  return { menu };
};
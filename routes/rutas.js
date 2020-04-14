// server
const { conec } = require('../server');
const {body} = require('../server'); // nejorar el envio de uinf

const path = require("path");
const port = process.env.PORT || 8080;
const { app } = require('../server');
const { express1 } = require('../server');
app.use(express1.static(path.join(__dirname,"../views")));
app.use("/static",express1.static('./static/'));
app.use(body.urlencoded({ extended: false }));
app.use(body.json());
app.set("public", __dirname + "/public");

// static files
app.use("/public", express1.static('./public/'));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

app.get("/datos", (req, res) => {
    if (conec) {
        var sql = "SELECT * FROM Syrus ORDER BY id DESC limit 1 ";
        conec.query(sql, function(err, result) {
            if (err) throw err;
            res.json(result[0]);
            //console.log('La base de datos: ',result[0]);
            //con.end();
        });
    } else {
        console.log("error conection with db");
    }
    //res.json(`${mensaje}`);
});

app.post("/historicos", (req,res)=>{
        
        if (conec) {
            console.log("Connected!");
            var sql =
              "SELECT * FROM Syrus where fecha between ? and ? and hora between ? and ? ";
            var value = [
              req.body.fecha1,
              req.body.fecha2,
              req.body.hora1,
              req.body.hora2
            ];
            conec.query(sql, value, function(err, result) {
              if (err) throw err;
              res.json(result);
              //con.end();
            });
          } else {
            console.log("Error conection with db");
          }
});
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});

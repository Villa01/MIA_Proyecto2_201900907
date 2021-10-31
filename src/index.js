const path = require('path')
const express = require('express');
const morgan = require('morgan');
var mysql = require('mysql')
const cors = require('cors');


//var oracledb = require('oracledb')
const app = express();

//oracledb.initOracleClient({libDir: './instantclient_21_3/'});
/*
try {
    oracledb.getConnection({
        user: "Admin",
        password: 'Idania421383.',
        connectionString: "mia_high"
    }, function(err, connection) {
        if (err) {
            console.log(err)
        } else{
            console.log(connection)
        }
        
    })
} finally {
    
} 

*/

var connection = mysql.createConnection(
    {
        host : "localhost", 
        user: "root",
        password: "Idania4213."
    }
);

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

// Settings
app.use(cors())
app.set('port', process.env.PORT || 5000 ); // Toma el puerto predefinido 

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.get('/', function (req, res){
    res.send('Hello World')
});

app.post('/login',async function(req, res){
    const { usuario, password } = req.body
    peticion = `select contrasenia from mia.usuario where nombre_usuario = '${usuario}';`
    
    await connection.query(peticion, function(err, result){
        if (err) {
            console.log(err)
        }

        if (result === undefined || result.length == 0 ){
            res.status(500).send({mensaje : "Credenciales incorrectas. "})
        } else {
            console.log(result)
            if (result[0].contrasenia == password){
                res.status(200).send({mensaje : "Login correcto "})
            } else {
                res.status(500).send({mensaje : "Credenciales incorrectas. "})
            }
        }

    });
    
    
    

});

// Static files

app.use(express.static(path.join(__dirname, 'public')))


// Starting the server

app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
});

// Database

async function doQuery ( sql, con ) {
    
    return await con.query(sql, function(err, result){
        if (err) {
            console.log(err)
        }
        console.log(result)
        return result
    });
}
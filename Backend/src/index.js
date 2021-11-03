const path = require('path')
const express = require('express');
const morgan = require('morgan');
var mysql = require('mysql')
const cors = require('cors');
const bodyParser = require('body-parser');
const convert = require('xml-js')
const jwt = require('jsonwebtoken')

const fileUpload = require('express-fileupload')
fs = require('fs');

//var oracledb = require('oracledb')
const app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const access_key = 'idania';
const refresh_key = 'amor'
const time_access = '1m'
const time_refresh = '15m'
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
    peticion = `select contrasenia, codigo_rol, activo from mia.usuario where nombre_usuario = '${usuario}';`
    user = {usuario, password}
    // Generacion de token de acceso
    const access_token = jwt.sign(user, access_key)
    const refresh_token = jwt.sign(user, refresh_key, { expiresIn: time_refresh})
    console.log(`Se generó un token de acceso : ${access_token}`)
    console.log(`Se generó un token de refresco : ${refresh_token}`)
    
    await connection.query(peticion, function(err, result){
        if (err) {
            console.log(err)
        }

        if (result === undefined || result.length == 0 ){
            return res.status(500).send({mensaje : "Credenciales incorrectas. "})
        } else {
            if (result[0].contrasenia == password){
                if (result[0].activo == 1){
                    r = {mensaje : "Login correcto ", tipo: result[0].codigo_rol, correcto: true, cred: {access_token, refresh_token}}
                    res.setHeader('Content-Type', 'application/json')
                    return res.status(200).send(r)
                } else {
                    r = {mensaje : "Usuario inactivo"}
                    return res.status(500).send(r)
                }
            } else {
                return res.status(500).send({mensaje : "Credenciales incorrectas. "})
            }
        }

    });
});

app.get("/pruebaDatos", (req, res) => {
    const token = req.headers['authorization']
    if (token) {
        jwt.verify(token, access_key, (err, user) => {
            if(err){
                console.log(`El token de acceso no es válido: ${token}`)
                res.status(403).json({msg:'No autorizado'})
            } else {
                let usuario = user.usuario
                console.log(`Se validó el token de acceso : ${token}`)
                res.status(200).json({msg:'Exito', usuario})
            }
        })
    } else {
        console.log(`El token de acceso no es válido: ${token}`)
        res.status(403).json({msg:'No autorizado'})
    }
})


app.get('/refreshtoken', (req, res)=> {
    const refresh_token = req.headers['authorization']
    jwt.verify(refresh_token, refresh_key, (err, user) => {
        if (err) {
            console.log(`${refresh_token} rechazado`)
            res.status(403).json({msg:'Token de refresco inválido'})
        } else {
            const access_token = jwt.sign(user, access_key)
            res.status(200).json({cred: access_token})
        }
    })
})



app.use(fileUpload())

app.post('/subirxml', (req, res) => {
    let EDFile = req.files.file
    EDFile.mv(path.resolve(`${__dirname}/Files/${EDFile.name}`), err => {
        if (err){
            console.log(err)
        }
    })
    fs.readFile(`${__dirname}/Files/${EDFile.name}`, "utf8", function (err, data) {
        if (err) return res.status(500).send({ message: err })
        console.log(data)
        let json = convert.xml2json(data, {compact:true, spaces:2})
        console.log(json)
        let obj_json = JSON.parse(json)

        procesar_departamento(obj_json.departamentos.departamento)
        return res.status(200).send(obj_json)
    });


})

app.post('/mostarcarga', (req, res) => {
    
    let EDFile = req.files.file

    EDFile.mv(path.resolve(`${__dirname}/Files/${EDFile.name}`), err => {
        if (err){
            console.log(err)
        }
    })

    fs.readFile(path.resolve(`${__dirname}/Files/${EDFile.name}`), "utf8", function (err, data) {
        if (err){
            console.log(err)
            return res.status(500).send({ message: err })
        } 

        let json = convert.xml2json(data, {compact:true, spaces:2})
        let obj_json = JSON.parse(json)
        return res.status(200).send(obj_json)
    });

})

app.post('/usuarios', (req, res) => {
    const { order, filtro } = req.body
    peticion = ''
    if (filtro) {
        if ( typeof(filtro) === 'string'){
            peticion = `select nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, activo, nombre_rol, nombre_departamento from mia.usuario 
            left join mia.rol on mia.usuario.codigo_rol = mia.rol.codigo_rol
            left join mia.departamento on mia.usuario.codigo_departamento = mia.departamento.codigo_departamento
            where ${order} like '%${filtro}%';`
        } else {
            peticion = `select nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, activo, nombre_rol, nombre_departamento from mia.usuario 
            left join mia.rol on mia.usuario.codigo_rol = mia.rol.codigo_rol
            left join mia.departamento on mia.usuario.codigo_departamento = mia.departamento.codigo_departamento
            where ${order} = '${filtro}';`
        }
    } else {
        peticion = `select nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, activo, nombre_rol, nombre_departamento from mia.usuario 
        left join mia.rol on mia.usuario.codigo_rol = mia.rol.codigo_rol
        left join mia.departamento on mia.usuario.codigo_departamento = mia.departamento.codigo_departamento order by ${order};`
    }
    connection.query(peticion, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    })
});

app.get('/usuariosordenados', (req, res) => {
    connection.query(`select nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, activo, nombre_rol, nombre_departamento from mia.usuario 
    left join mia.rol on mia.usuario.codigo_rol = mia.rol.codigo_rol
    left join mia.departamento on mia.usuario.codigo_departamento = mia.departamento.codigo_departamento;`, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    })
});

app.get('/puestos', (req, res) => {
    consulta = 'select codigo_puesto, nombre_puesto, salario, nombre_departamento, imagen from mia.puesto left join mia.departamento on puesto.codigo_departamento = departamento.codigo_departamento;'
    connection.query(consulta, (err, result) => {
        if ( err) {
            console.log(err)
        } else {
            res.status(200).send(result)
        }
    })
})

app.post('/crearusuario', (req, res) => {

    const { nombre_usuario,CUI, contrasenia, fecha_inicio, rol, departamento}  = req.body

    connection.query(`insert into mia.usuario(nombre_usuario, cui, contrasenia, fecha_inicio, activo, codigo_rol, codigo_departamento) values ('${nombre_usuario}',${CUI},
        '${contrasenia}', curdate(), true, (select codigo_rol from mia.rol where nombre_rol like '%${rol}%' limit 1),
        (select codigo_departamento from mia.departamento where nombre_departamento like '%${departamento}%' limit 1)
        );`, (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({mensaje:err})
        } else {
            res.status(200).send({mensaje:"Insertado correctamente"})
        }
    })
})

app.post('/eliminarusuario', (req, res) => {
    const { nombre_usuario } = req.body
    connection.query(`update mia.usuario set activo = false, fecha_fin = curdate() where nombre_usuario = '${nombre_usuario}';`,
    (err, result)=>{
        if (err) {
            console.log(err)
            res.status(500).send({mensaje:err})
        } else { 
            res.status(200).send({mensaje: "Usuario eliminado"})
        }
    });
});

app.post('/buscarusuario', (req, res) => {
    const { nombre_usuario } = req.body
    connection.query(`select nombre_usuario, cui, contrasenia, fecha_inicio, fecha_fin, activo, nombre_departamento, nombre_rol from mia.usuario 
    left join mia.departamento on mia.departamento.codigo_departamento = mia.usuario.codigo_departamento
    left join mia.rol on mia.rol.codigo_rol = mia.usuario.codigo_rol
    where nombre_usuario = '${nombre_usuario}';`,
    (err, result)=>{
        if (err) {
            console.log(err)
            res.status(500).send({mensaje:err})
        } else { 
            if (result.length >= 1){
                let { 
                    nombre_usuario,
                    cui,
                    contrasenia,
                    fecha_inicio, 
                    fecha_fin, 
                    activo, 
                    nombre_rol, 
                    nombre_departamento
                 } = result[0]

                 res.status(200).send({
                    nombre_usuario,
                    cui,
                    contrasenia,
                    fecha_inicio, 
                    fecha_fin, 
                    activo, 
                    nombre_rol, 
                    nombre_departamento
                 })
            } else {
                res.status(500).send({mensaje:"No se encontró el usuario"})
            }
        }
    });
});

app.post('/editarusuario', (req, res) => {
    let {
        nombre_usuario, 
        cui, 
        contrasenia, 
        fecha_inicio, 
        activo,
        fecha_fin, 
        nombre_departamento, 
        nombre_rol
    } = req.body

    if (!fecha_fin) {
        fecha_fin = '0000-00-00'
    }
    if (!fecha_inicio){
        fecha_inicio = '0000-00-00'
    }


    consulta = `update mia.usuario
    set 
    nombre_usuario = '${nombre_usuario}',
    cui = ${cui},
    contrasenia = '${contrasenia}',
    fecha_inicio = '${fecha_inicio}',
    fecha_fin = '${fecha_fin}',
    activo = ${activo},
    codigo_rol = (select codigo_rol from mia.rol where nombre_rol like '%${nombre_rol}%' limit 1),
    codigo_departamento = (select codigo_departamento from mia.departamento where nombre_departamento like '%${nombre_departamento}%' limit 1)
    where nombre_usuario = '${nombre_usuario}';`

    connection.query(consulta, (err, result) => {
        if ( err ) {
            console.log(err)
            res.status(500).send({msg : 'No se pudo actualizar el registro'})
        } else {
            res.status(200).send({msg: "Registro actualizado"})
        }
    })
})


app.use('/filtropuestos', (req, res) => {
    let { parametro, campo } = req.body
    let consulta = `select distinct nombre_puesto, salario, nombre_categoria, nombre_departamento
    from mia.puesto, mia.puesto_categoria, mia.categoria, mia.departamento
    where puesto.codigo_puesto = puesto_categoria.codigo_puesto and
    puesto_categoria.codigo_categoria = categoria.codigo_categoria and 
	departamento.codigo_departamento = puesto.codigo_departamento and
    ${campo} like '%${parametro}%' group by nombre_puesto
    ;`
    if (typeof(parametro) == 'number'){
        consulta = `select distinct nombre_puesto, salario, nombre_categoria, nombre_departamento
        from mia.puesto, mia.puesto_categoria, mia.categoria, mia.departamento
        where puesto.codigo_puesto = puesto_categoria.codigo_puesto and
        puesto_categoria.codigo_categoria = categoria.codigo_categoria and 
        departamento.codigo_departamento = puesto.codigo_departamento and
        ${parametro} = %${campo} group by nombre_puesto%
        ;`
    }

    if (!parametro || !campo ){
        consulta = `select  nombre_puesto, salario, nombre_categoria, nombre_departamento
        from mia.puesto, mia.puesto_categoria, mia.categoria, mia.departamento
        where puesto.codigo_puesto = puesto_categoria.codigo_puesto and
        puesto_categoria.codigo_categoria = categoria.codigo_categoria and
        departamento.codigo_departamento = puesto.codigo_departamento and
        departamento.codigo_departamento = puesto.codigo_departamento group by nombre_puesto
        ;`
    }
    console.log(consulta)

    connection.query(consulta, (err, result) => {
        if (err){
            console.log(err);
            res.status(500).send({msg:err})
        } else {
            res.status(200).send({puestos: result})
        }
    })

})

app.use('/calificarPuesto', (req, res) => {
    let { calificacion, nombre_puesto } = req.body

    consulta = `insert into mia.puesto_calificacion(codigo_puesto, codigo_calificacion, fecha) values (
        (
        select codigo_puesto from mia.puesto p where nombre_puesto like '%${nombre_puesto}%'
        ),${calificacion}, now());`

    connection.query(consulta, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send({msg:err})
        } else {
            res.status(200).send({msg:'Insertado correctamente'})
        }
    })

})

app.post('/aplicacionpuesto', (req, res) => {
    let { puesto, nombre, apellido, correo, direccion, telefono, cui, file } = req.body

    // Creacion aplicante
    let consulta = `insert into mia.aplicante(nombre, apellido, correo, direccion, fecha_aplicacion, cui, telefono, cv ) 
    values ('${nombre}', '${apellido}', '${correo}', '${direccion}', curdate(), ${cui}, ${telefono}, '${file}');`

    connection.query(consulta, (err, result) => {
        if(err){
            console.log(err)
            res.status(500)
        } else {
            let consulta_p_a = `
                insert into mia.puesto_aplicante(codigo_puesto, codigo_aplicante) values (
                (select codigo_puesto from mia.puesto where puesto.nombre_puesto like '%${puesto}%' limit 1),
                (select codigo_aplicante from mia.aplicante where aplicante.cui = ${cui} limit 1)
            );`
            connection.query(consulta_p_a, (err, result) => {
                if(err){
                    console.log(err)
                    res.status(500)
                } else {
                    let consulta_expediente = `insert into mia.expediente(codigo_aplicante, estado) values (
                        (select codigo_aplicante from mia.aplicante where aplicante.cui = ${cui} limit 1),
                        'pendiente'
                        );`
                    connection.query(consulta_expediente, err => {
                        if(err) {
                            console.log(err)
                            res.status(500)
                        } else {
                            consulta_asignar = `
                            update mia.aplicante set aplicante.nombre_usuario = (
                                select b.nombre_usuario from (
                                    select a.nombre_usuario, min(a.aplicantes) from (
                                        select u.nombre_usuario nombre_usuario, count(codigo_aplicante) aplicantes from mia.usuario u
                                        inner join mia.rol on u.codigo_rol = rol.codigo_rol
                                        left join mia.aplicante a on u.nombre_usuario = a.nombre_usuario
                                        inner join mia.departamento d on u.codigo_departamento = d.codigo_departamento
                                        inner join mia.puesto p on d.codigo_departamento = p.codigo_departamento
                                        where rol.nombre_rol like '%Revisor%' and
                                        p.nombre_puesto like '%${puesto}%' and u.activo = 1
                                        group by u.nombre_usuario
                                    ) as a limit 1
                                ) as b
                            )
                            where aplicante.cui = ${cui}
                            ;
                            `
                            connection.query(consulta_asignar, err => {
                                if(err){
                                    console.log(err)
                                    res.status(500)
                                } else {
                                    res.status(200).send({msg:'Asignacion correcta'})
                                }
                            })
                        }
                    })
                }
            })
        }

    })

    res.status(500)
})

app.post('/upload', (req, res) => {
    
    let EDFile = req.files.file
    let p = path.resolve(`${__dirname}/Files/${EDFile.name}`)
    EDFile.mv(p, err => {
        if (err){
            console.log(err)
        } else {
            res.status(200).send({path : p})
        }
    })

})

app.post('/aplicantes', (req, res) => {
    // Verificacion de token
    const token = req.headers['authorization']
    if (token) {
        jwt.verify(token, access_key, (err, user) => {
            if(err){
                console.log(`El token de acceso no es válido: ${token}`)
                res.status(403).json({msg:'No autorizado'})
            } else {
                
                const { usuario } = req.body
                let qu = `select a.nombre, a.apellido, a.correo, a.apellido, a.direccion, a.fecha_aplicacion, a.cui, a.telefono, a.cv from mia.aplicante a
                inner join mia.usuario u on u.nombre_usuario = a.nombre_usuario
                inner join mia.expediente e on a.codigo_aplicante = e.codigo_aplicante
                where u.nombre_usuario = '${usuario}' and e.estado like 'pendiente';`
                connection.query(qu, (err, result) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({msg:'err'})
                    } else {
                        res.status(200).json({aplicantes: result})
                    }
                })
            }
        })
    } else {
        console.log(`El token de acceso no es válido: ${token}`)
        res.status(403).json({msg:'No autorizado'})
    }

})


app.post('/filtroaplicantes', (req, res)=> {
    
    const token = req.headers['authorization']

    if (token) {
        jwt.verify(token, access_key, (err, user) => {
            if(err){
                console.log(`El token de acceso no es válido: ${token}`)
                res.status(403).json({msg:'No autorizado'})
            } else {
                let { parametro, campo, usuario } = req.body

                let query = `select p.nombre_puesto,  a.nombre, a.correo, a.apellido, a.direccion, a.fecha_aplicacion, a.cui, a.telefono, a.cv from mia.aplicante a
                inner join mia.usuario u on u.nombre_usuario = a.nombre_usuario
                inner join mia.puesto_aplicante pa on pa.codigo_aplicante = a.codigo_aplicante
                inner join mia.puesto p on p.codigo_puesto = pa.codigo_puesto
                inner join mia.expediente e on a.codigo_aplicante = e.codigo_aplicante
                where e.estado like 'pendiente' and
                a.nombre_usuario = '${usuario}' and
                ${campo} like '%${parametro}%';`
                console.log(query)
                connection.query(query, (err, result) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({msg:'err'})
                    } else {
                        res.status(200).json({aplicantes:result})
                    }
                })
            }
        })
    } else {
        console.log(`El token de acceso no es válido: ${token}`)
        res.status(403).json({msg:'No autorizado'})
    }



})

app.post('/modificarestado', (req, res)=> {
    const token = req.headers['authorization']
    if (token) {
        jwt.verify(token, access_key, (err, user) => {
            if(err){
                console.log(`El token de acceso no es válido: ${token}`)
                res.status(403).json({msg:'No autorizado'})
            } else {
                
                const { cui, estado } = req.body
                let qu = `update mia.expediente e set e.estado = '${estado}' where e.codigo_aplicante = (
                    select codigo_aplicante from mia.aplicante a
                    where a.cui = '${cui}' limit 1
                );`
                connection.query(qu, (err, result) => {
                    if(err) {
                        console.log(err)
                        res.status(500).json({msg:'err'})
                    } else {
                        res.status(200).json({msg:result})
                    }
                })
            }
        })
    } else {
        console.log(`El token de acceso no es válido: ${token}`)
        res.status(403).json({msg:'No autorizado'})
    }
})

function procesar_departamento(departamento, padre) {
    if (departamento.constructor === Array){
        departamento.forEach( dep => {
            let { nombre, capital_total, puestos, departamentos } = dep
            console.log("---------- Departamento")
            
            console.log(nombre._text)
            console.log(capital_total._text)
            
            // 1. Insertar el departamento
            q = `select codigo_departamento from mia.departamento where nombre_departamento = '${nombre._text}';`
            connection.query(q, function(err, result){
                if (err) {
                    console.log(`${nombre}, error.`)
                } else if (result.length == 0) {
                    peticion = `insert into mia.departamento (nombre_departamento, capital_total, departamento_padre) values('${nombre._text}', ${capital_total._text}, (select dep.codigo_departamento from (select * from mia.departamento) as dep where nombre_departamento = '${padre}'));`
                    insert(peticion, nombre._text)
                }
            });

            // 2. Insertar puestos
            procesar_puesto(puestos.puesto, nombre._text)
            // 3. Insertar subdepartamentos
            if (departamentos){
                procesar_departamento(departamentos.departamento)
            }

            
        });
    } else {
        let { nombre, capital_total, puestos, departamentos } = departamento
        console.log("---------- Departamento")
        q = `select codigo_departamento from mia.departamento where nombre_departamento = '${nombre._text}';`
        connection.query(q, function(err, result){
            if (err) {
                console.log(`${nombre}, error.`)
            } else if (result.length == 0) {
                peticion = `insert into mia.departamento (nombre_departamento, capital_total, departamento_padre) values('${nombre._text}', ${capital_total._text}, (select dep.codigo_departamento from (select * from mia.departamento) as dep where nombre_departamento = '${padre}'));`
                insert(peticion, nombre._text)
            }
        });

        procesar_puesto(puestos.puesto, nombre._text)
        if (departamentos){
            procesar_departamento(departamentos.departamento)
        }
        console.log(nombre._text)
        console.log(capital_total._text)
    }
}

function procesar_puesto(puesto, departamento) {
    if ( puesto.constructor == Array ){
        puesto.forEach( puest => {
            console.log("---------- Puesto")
            let { nombre, salario, categorias, requisitos, imagen } = puest
            q = `select * from mia.puesto where nombre_puesto = '${nombre._text}'`;
            connection.query(q, function(err, result){
                if (err) {
                    //console.log(`${nombre}, error.`)
                    console.log(err)
                } else if (result.length == 0) {
                    imagen = imagen? `'${imagen._text}'`:'null'
                    peticion = `insert into mia.puesto (nombre_puesto, salario, imagen,  codigo_departamento) values('${nombre._text}', ${salario._text},${imagen}, (select dep.codigo_departamento from (select * from mia.departamento) as dep where nombre_departamento = '${departamento}' limit 1));`
                    insert(peticion, nombre._text)
                } else {
                    // Ya existe   
                }
            });

            connection.query(`insert into mia.puesto_calificacion(codigo_puesto, codigo_calificacion, fecha) values(
                (select codigo_puesto from mia.puesto where nombre_puesto like '%${nombre._text}%' limit 1),0, now());`, (err) => {
                    if(err) {
                        console.log(err)
                    }
                });

            procesar_categoria(categorias.categoria, nombre._text)
            procesar_requisito(requisitos.requisito,  nombre._text)
            console.log(nombre._text)
            console.log(salario._text)
            //console.log(imagen._text)
            
        })
    } else {
        let { nombre, salario, categorias, requisitos } = puesto
        console.log("---------- Puesto")

        q = `select * from mia.puesto where nombre_puesto = '${nombre._text}'`;
        connection.query(q, function(err, result){
            if (err) {
                //console.log(`${nombre}, error.`)
                console.log(err)
            } else if (result.length == 0) {
                peticion = `insert into mia.puesto (nombre_puesto, salario, codigo_departamento) values('${nombre._text}', ${salario._text}, (select dep.codigo_departamento from (select * from mia.departamento) as dep where nombre_departamento = '${departamento}' limit 1));`
                insert(peticion, nombre._text)
            }
        });

        connection.query(`insert into mia.puesto_calificacion(codigo_puesto, codigo_calificacion, fecha) values(
            (select codigo_puesto from mia.puesto where nombre_puesto like '%${nombre._text}%' limit 1),0, now());`, (err) => {
                if(err) {
                    console.log(err)
                }
            });

        procesar_categoria(categorias.categoria, nombre._text)
        procesar_requisito(requisitos.requisito, nombre._text)
        console.log(salario._text)
        console.log(nombre._text)
    }
}

function procesar_categoria(categoria, puesto){
    if (categoria.constructor === Array){
                
        categoria.forEach( categor => {
            console.log("---------- Categoria")
            let { nombre } = categor
            console.log(nombre._text)
            
            connection.query(`select codigo_categoria from mia.categoria where nombre_categoria = '${nombre._text}';`, function(err, result){
                if (err) {
                    console.log(`${nombre}, error`)
                } 
                if (result.length == 0){
                    peticion = `insert into mia.categoria(nombre_categoria) values ('${nombre._text}');`
                    insert(peticion, nombre._text)
                }
                
                insert(`insert into mia.puesto_categoria (codigo_puesto, codigo_categoria) select puest.codigo_puesto, cat.codigo_categoria from
                        (select codigo_puesto from mia.puesto where puesto.nombre_puesto = '${puesto}' limit 1) as puest,
                        (select codigo_categoria from mia.categoria where categoria.nombre_categoria = '${nombre._text}' limit 1) as cat;`, nombre._text)
                
            }); 
        });
    } else {
        let { nombre } = categoria
        console.log("---------- Categoria")
        console.log(nombre._text)
        // Insercion requisito
        connection.query(`select codigo_categoria from mia.categoria where nombre_categoria = '${nombre._text}';`, function(err, result){
            if (err) {
                console.log(`${nombre}, error`)
            } 
            if (result.length == 0){
                peticion = `insert into mia.categoria(nombre_categoria) values ('${nombre._text}');`
                insert(peticion, nombre._text)
            }
            
            insert(`insert into mia.puesto_categoria (codigo_puesto, codigo_categoria) select puest.codigo_puesto, cat.codigo_categoria from
            (select codigo_puesto from mia.puesto where puesto.nombre_puesto = '${puesto}' limit 1) as puest,
            (select codigo_categoria from mia.categoria where categoria.nombre_categoria = '${nombre._text}' limit 1) as cat;`, nombre._text)
            
        }); 
    }
}

function procesar_requisito(requisito, puesto){
    
    if (requisito.constructor === Array){
        requisito.forEach( req => {
            let { nombre, formatos, tamaño, obligatorio } = req

            console.log("---------- requisito")
            console.log(nombre._text)
            console.log(tamaño._text)
            console.log(obligatorio._text)
            // Insercion requisito
            connection.query(`select codigo_requisito from mia.requisito where nombre_requisito = '${nombre._text}';`, function(err, result){
                if (err) {
                    console.log(`${nombre} ya se encuentra en la base de datos a`)
                } 
                if (result.length == 0){
                    peticion = `insert into mia.requisito(nombre_requisito, size, obligatorio) values ('${nombre._text}', ${tamaño._text}, ${obligatorio._text});`
                    insert(peticion, nombre._text)
                }

                insert(`insert into mia.puesto_requisito (codigo_puesto, codigo_requisito) select puest.codigo_puesto, req.codigo_requisito from
                (select codigo_puesto from mia.puesto where puesto.nombre_puesto = '${puesto}' limit 1) as puest,
                (select codigo_requisito from mia.requisito where requisito.nombre_requisito = '${nombre._text}' limit 1) as req;`, nombre._text)

                
            });
            procesar_formato(formatos.formato, nombre._text)

        })
    } else {
        
        let { nombre, formatos, tamaño, obligatorio } = requisito
        
        console.log("---------- requisito")
        console.log(nombre._text)
        console.log(tamaño._text)
        console.log(obligatorio._text)

        connection.query(`select codigo_requisito from mia.requisito where nombre_requisito = '${nombre._text}';`, function(err, result){
            if (err) {
                console.log(`${nombre} ya se encuentra en la base de datos b`)
            } 
            if (result.length == 0){
                peticion = `insert into mia.requisito(nombre_requisito, size, obligatorio) values ('${nombre._text}', ${tamaño._text}, ${obligatorio._text});`
                insert(peticion, nombre._text)

                insert(`insert into mia.puesto_requisito (codigo_puesto, codigo_requisito) select puest.codigo_puesto, req.codigo_requisito from
                    (select codigo_puesto from mia.puesto where puesto.nombre_puesto = '${puesto}' limit 1) as puest,
                    (select codigo_requisito from mia.requisito where requisito.nombre_requisito = '${nombre._text}' limit 1) as req;`, nombre._text)
            }
        });

        procesar_formato(formatos.formato, nombre._text)
    }
    
}

function procesar_formato(formato, nombre_requisito){
    if (formato.constructor === Array){
        formato.forEach( format => {
            let { nombre } = format
            console.log("---------- formato")
            console.log("Nombre ", nombre._text)
            let peticion = `insert into mia.formato(nombre_formato) values ('${nombre._text}');`
            insert(peticion, nombre._text)

            // Llenar requisito_formato
            insert(`insert into mia.requisito_formato (codigo_requisito, nombre_formato) select req.codigo_requisito, f.nombre_formato from(select codigo_requisito from mia.requisito where requisito.nombre_requisito = '${nombre_requisito}' limit 1) as req,(select nombre_formato from mia.formato where nombre_formato like '%${nombre._text}%' limit 1) as f;`, nombre._text)
        });
    } else {
        let { nombre } = formato
        console.log("---------- formato")
        console.log("Nombre ", nombre._text)
        let peticion = `insert into mia.formato(nombre_formato) values ('${nombre._text}');`
        insert(peticion, nombre._text)
        // Llenar requisito_formato
        insert(`insert into mia.requisito_formato (codigo_requisito, nombre_formato) select req.codigo_requisito, f.nombre_formato from
        (select codigo_requisito from mia.requisito where requisito.nombre_requisito = '${nombre_requisito}' limit 1) as req, 
        (select nombre_formato from mia.formato where nombre_formato like '%${nombre._text}%' limit 1) as f;`, nombre._text)
    }
    
}

// Static files

app.use(express.static(path.join(__dirname, 'public')))


// Starting the server

app.listen(app.get('port'), ()=>{
    console.log(`server on port ${app.get('port')}`)
});

// Database


function insert (q, nombre){
    connection.query(q, function(err, success){
        if (err) {
            if (err.code == 'ER_DUP_ENTRY'){
                
                console.log(`No se insertó, ${nombre} porque ya estaba en la base de datos. `)
            } else {
                console.log(err)
            }
        } else {
            console.log(`${nombre} insertado `)
        }
    });
}
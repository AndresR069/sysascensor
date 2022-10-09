const express = require("express");
const router = express.Router();
const conexion = require('../database/db');
const crud = require('../controllers/crud');
//....LLAMADA DE PLANTILLAS.....................

//constante para definir el controlador
const authControllers = require('../controllers/authController')
//router para las vistas

router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

router.get("/register", (req, res) => {
  res.render("register");
});

//rutas de redireccion dashboard

router.get("/clientes", (req, res) => {
  res.render("clientes");
});

router.get("/indexTec", (req, res) => {
  conexion.query('SELECT ascensor.id_ascensor, asignacion_fallos.fecha_asignacion, ascensor.nombre_lugar, estado_fallos.nombre_estado,  ascensor.observacion, sector.nombre_sector , persona.nombres, persona.apellidos from ascensor INNER JOIN persona ON persona.id_persona = ascensor.id_persona INNER JOIN asignacion_fallos ON asignacion_fallos.id_asignacion_fallos = ascensor.id_asignacion INNER JOIN estado_fallos ON estado_fallos.id_estado_fallos = asignacion_fallos.id_estado inner join sector ON sector.id_sector = ascensor.id_sector;', (error, result) => {
    if (error) throw error;
    res.render("indexTec", {
      result: result,

    });
  })


});

router.get('/hojamanten/:id', (req, res) => {
  const id = req.params.id;
  conexion.query('SELECT ascensor.id_ascensor,ascensor.id_asignacion, ascensor.descripcion_ascensor, ascensor.nombre_lugar, ascensor.descripcion_ascensor, asignacion_fallos.fecha_asignacion, persona.direccion, sector.nombre_sector , persona.nombres, persona.apellidos, ascensor.observacion, estado_fallos.nombre_estado from ascensor INNER JOIN persona ON persona.id_persona = ascensor.id_persona INNER JOIN asignacion_fallos ON asignacion_fallos.id_asignacion_fallos = ascensor.id_asignacion INNER JOIN estado_fallos ON estado_fallos.id_estado_fallos = asignacion_fallos.id_estado inner join sector ON sector.id_sector = ascensor.id_sector WHERE  ascensor.id_ascensor=?', [id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render('hojamanten', { tarea: results[0] });
    }
  });
});


router.get("/dashAdmiAs", (req, res) => {
  res.render("dashAdmiAs");
});

router.get("/index", (req, res) => {
  // anidacion de callbacks-- mas de una consulta mysql enviada a la misma vista

  conexion.query('select count(*) as conteo from ascensor;', (error, resp, fields) => {
    if (error) throw error;
    res.render('index', {
      resp: resp
    });
  })
});

router.get("/adminuser", (req, res) => { //Plantilla adminser -->tecnicos de usuario
  conexion.query('SELECT persona.id_persona, persona.nombres, persona.apellidos, persona.correo, persona.direccion,persona.telefono, persona.estado_logeo,rol.nombre_rol FROM persona inner join rol on persona.id_rol=rol.id_rol', (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render('adminuser', { result: result });
    }
  })
});



router.get("/tareas", (req, res) => { //consulta de las tareas
  conexion.query('SELECT ascensor.id_ascensor, ascensor.nombre_lugar, ascensor.descripcion_ascensor, asignacion_fallos.fecha_asignacion, persona.direccion, sector.nombre_sector , persona.nombres, persona.apellidos, ascensor.observacion, estado_fallos.nombre_estado from ascensor INNER JOIN persona ON persona.id_persona = ascensor.id_persona INNER JOIN asignacion_fallos ON asignacion_fallos.id_asignacion_fallos = ascensor.id_asignacion INNER JOIN estado_fallos ON estado_fallos.id_estado_fallos = asignacion_fallos.id_estado inner join sector ON sector.id_sector = ascensor.id_sector;', (error, result) => {
    if (error) throw error;
    conexion.query('select persona.id_persona, persona.nombres, persona.apellidos from persona where (id_rol = 2);', (error, tecnicos) => {
      // console.log(tecnicos) 
      if (error) throw error;
      res.render('tareas', {
        result: result,
        tecnicos: tecnicos
      });
    })

  })
});

//router para los metodos del controller
router.post('/register', authControllers.register)
router.post('/login', authControllers.login)//exportamos para al usarlo en el controlador, tome la captura de datos
router.post('/eliminar_persona', crud.eliminar_persona);
router.post('/editar_persona', crud.editar_persona)

//Metodos CRUD para el registro de tareas--------------
router.post('/addTarea', crud.addTarea)
router.post('/addBitacora', crud.addBitacora)
module.exports = router;

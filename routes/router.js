const express = require("express");
const router = express.Router();
const conexion = require('../database/db');
const crud = require('../controllers/crud');
//....LLAMADA DE PLANTILLAS.....................

//constante para definir el controlador
const authControllers=require('../controllers/authController')
//router para las vistas

router.get("/login", (req, res) => {
  res.render("login",{alert:false});
});

router.get("/register", (req, res) => {
  res.render("register");
});

//rutas de redireccion dashboard

router.get("/clientes", (req, res) => {
  res.render("clientes");
});

router.get("/indexTec", (req, res) => {
  res.render("indexTec");
});

router.get("/hojamanten", (req, res) => {
  res.render("hojamanten");
});

router.get("/dashAdmiAs", (req, res) => {
  res.render("dashAdmiAs");
});


router.get("/index", (req, res) => {

  //conexion.query('select ubicacion_elevador.id_ubicacion, ubicacion_elevador.can_ascensores, ubicacion_elevador.nombre_lugar, ubicacion_elevador.direccion, asignacion_tarea.falla, sector_fusa.nombre_sector from ubicacion_elevador INNER JOIN asignacion_tarea ON asignacion_tarea.id_ubicacion = ubicacion_elevador.id_ubicacion INNER JOIN sector_fusa ON sector_fusa.id_sector = ubicacion_elevador.id_sector;',(error, result)=>{
   /* if(error){
    
      throw error;
    } else { 
 */
     res.render('index',/* {result:result}*/); 
             
   /* }   
 })*/
});


router.get("/adminuser", (req, res) => { //Plantilla adminser -->tecnicos de usuario
  conexion.query('SELECT persona.id_persona, persona.nombres, persona.apellidos, persona.correo, persona.direccion,persona.telefono, persona.estado_logeo,rol.nombre_rol FROM persona inner join rol on persona.id_rol=rol.id_rol',(error, result)=>{
    if(error){
      throw error;
   } else {     
        res.render('adminuser',{result:result});            
    }   
})
});


router.get("/tareas", (req, res) => { //consulta de las tareas
//  conexion.query('SELECT asignacion_tarea.id_tarea, asignacion_tarea.falla, asignacion_tarea.fecha_asigna,ubicacion_elevador.nombre_lugar,tipo_mantenimiento.tipo_mantenimiento, estado_mantenimiento.nombre_estado, tecnico_encargado.nombre_tecnico, users.name FROM asignacion_tarea INNER JOIN ubicacion_elevador ON asignacion_tarea.id_ubicacion= ubicacion_elevador.id_ubicacion INNER JOIN tipo_mantenimiento ON asignacion_tarea.id_tipomante = tipo_mantenimiento.id_tipo_mantenimiento INNER JOIN estado_mantenimiento ON asignacion_tarea.id_estado = estado_mantenimiento.id_estado INNER JOIN tecnico_encargado ON asignacion_tarea.id_tecnico = tecnico_encargado.id_tecnico INNER JOIN users ON asignacion_tarea.id_usuario = users.id',(error, result)=>{
  //  if(error){
      //  throw error;
  //  } else {                       
        res.render('tareas');    // ', {result:result}        
   // }   
//})
});


//.....METODOS del CRUD TECNICOS..............
//Eliminar (recordatorio... pasarlo al archivo crud)
router.get('/delete/:id_tecnico', (req, res) => {
  const id_tecnico = req.params.id_tecnico;
conexion.query('DELETE FROM tecnico_encargado WHERE id_tecnico = ?',[id_tecnico], (error, results)=>{
    //conexion.query('DELETE FROM tecnico_encargado WHERE id_tecnico = ? INNER JOIN asignacion_tarea ON asignacion_tarea.id_tecnico = tecnico_encargado;',[id_tecnico], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/adminuser');         
      }
  })
});

//.....METODOS del CRUD TAREAS..............
/*
router.get('/delete/:id_tarea', (req, res) => {
  const id_tecnico = req.params.id_tarea;
 // console.log(id_tecnico)
conexion.query('DELETE tecnico_encargado FROM tecnico_encargado INNER JOIN asignacion_tarea ON tecnico_encargado.id_tecnico = asignacion_tarea.id_tecnico WHERE asignacion_tarea.id_tecnico = ?',[id_tarea], (error, results)=>{
      if(error){
          console.log(error);
      }else{           
          res.redirect('/tareas');         
      }
  })
});
*/

//router para los metodos del controller
router.post('/register', authControllers.register)
router.post('/login',authControllers.login)//exportamos para al usarlo en el controlador, tome la captura de datos
router.post('/eliminar_persona', crud.eliminar_persona);
router.post('/editar_persona',crud.editar_persona)
module.exports = router;

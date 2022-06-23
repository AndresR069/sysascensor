//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO Tecnico
/*
module.exports.guardar_tecnico = (req, res)=>{
    const nombre_tecnico = req.body.nombre_tecnico;
    const correo_tecnico = req.body.correo_tecnico;
    const telefono = req.body.telefono;
    conexion.query('INSERT INTO tecnico_encargado SET ?',{nombre_tecnico:nombre_tecnico, correo_tecnico:correo_tecnico, telefono:telefono}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
           // console.log(results);   
            res.redirect('/adminuser');         
        }
});
};
/*
exports.saveTarea = (req, res)=>{
    const falla = req.body.falla;
    const correo_tecnico = req.body.correo_tecnico;
    const telefono = req.body.telefono;
    conexion.query('INSERT INTO asignacion_tarea SET ?',{nombre_tecnico:nombre_tecnico, correo_tecnico:correo_tecnico, telefono:telefono}, (error, results)=>{
        if(error){
            console.log(error);
        }else{   
            res.redirect('/tareas');         
        }
});
};
*/

//Editar_Persona........
exports.editar_persona = async (req, res)=>{
    const id_persona = req.body.id_editar;
    console.log(id_persona)
    const nombres = req.body.nombres_editar;
    const apellidos = req.body.apellidos_editar;
    const email = req.body.email_editar;
    const direccion = req.body.direccion_editar;
    console.log(direccion)
    const telefono = req.body.telefono_editar;
    const rol = req.body.rol_editar;
    console.log(rol)
    let id_rol=null;
    switch(rol){//seccion de busqueda de id
      case "administrador":
       console.log('entro a case administrador')
      id_rol='1';
        break;
      case "tecnico":
     //   console.log('entro a case tecnico')
        id_rol='2';
        break;
      case "usuario":
     //   console.log('entro a case usuario')
        id_rol='3';
        break;
    };

    conexion.query('UPDATE persona SET ? WHERE id_persona = ?',[{ nombres: nombres, apellidos: apellidos, correo: email, direccion: direccion,id_rol:id_rol, telefono: telefono}, id_persona], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/adminuser');          
        }
});


}

//ELIMINAR persona

exports.eliminar_persona = async (req, res)=>{

    const id_persona = req.body.id_eliminar;
    conexion.query('DELETE FROM persona WHERE id_persona = ?',[id_persona], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/adminuser');         
        }
    })

}
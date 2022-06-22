//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO Tecnico
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

//Editar_tecnico...
module.exports.editar_tecnico = (req, res)=>{
    const id_tecnico = req.body.id_editar
    const nombre_tecnico = req.body.nombre_editar;
    const correo_tecnico = req.body.correo_editar;
    const telefono = req.body.telefono_editar;
    conexion.query('UPDATE tecnico_encargado SET ? WHERE id_tecnico = ?',[{nombre_tecnico:nombre_tecnico, correo_tecnico:correo_tecnico, telefono:telefono}, id_tecnico], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/adminuser');          
        }
});
};



//ELIMINAR Tecnico


//Invocamos a la conexion de la DB
const conexion = require('../database/db');

//Editar_Persona........
exports.editar_persona = async (req, res) => {
  const id_persona = req.body.id_editar;
  // console.log(id_persona)
  const nombres = req.body.nombres_editar;
  const apellidos = req.body.apellidos_editar;
  const email = req.body.email_editar;
  const direccion = req.body.direccion_editar;
  // console.log(direccion)
  const telefono = req.body.telefono_editar;
  const rol = req.body.rol_editar;
  // console.log(rol)
  let id_rol = null;
  switch (rol) {//seccion de busqueda de id
    case "administrador":
      //console.log('entro a case administrador')
      id_rol = '1';
      break;
    case "tecnico":
      //   console.log('entro a case tecnico')
      id_rol = '2';
      break;
    case "usuario":
      //   console.log('entro a case usuario')
      id_rol = '3';
      break;
  };

  conexion.query('UPDATE persona SET ? WHERE id_persona = ?', [{ nombres: nombres, apellidos: apellidos, correo: email, direccion: direccion, id_rol: id_rol, telefono: telefono }, id_persona], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/adminuser');
    }
  });


}

//ELIMINAR persona

exports.eliminar_persona = async (req, res) => {

  const id_persona = req.body.id_eliminar;
  conexion.query('DELETE FROM persona WHERE id_persona = ?', [id_persona], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/adminuser');
    }
  })

}


//----------------METODOS CRUD DE USUARIO ADMINISTRADOR PARA LA SECCION TAREAS---------------------

exports.addTarea = async (req, res) => {
  //Metodo registrar tareas
  //captura los datos desde el front
  try {
    //datos tabla ascensor
    const falla = req.body.falla;
    // console.log('la falla es: ' + falla);
    const conjunto = req.body.conjunto;
    // console.log('ubicacion conjunto: ' + conjunto);

    //Manipulacion de la cadena tecnico para obtener solo id
    const tecnico = req.body.tecnico;

    //console.log(tecnico);

    const id_tecnico = tecnico.split(" ", 1);
    // console.log('id del tecnico: ' + id_tecnico);

    //-------------------------------------------------------
    const observaciones = req.body.observaciones;
    //console.log(observaciones);
    const sector = req.body.sector;
    // console.log(sector);
    //datos tabla asignacion fallos
    const now = new Date(); //Extraer fecha actual 
    year = now.getFullYear();
    month = now.getMonth();
    day = now.getDate();
    let fechaActual = year + '-' + month + '-' + day;
    //console.log(fechaActual)
    const estado = req.body.estado;
    //console.log(estado);

    //switch Estado -------------------------------------

    let id_estado = null;

    switch (
    estado //seccion de busqueda de id
    ) {
      case "En espera":
        // console.log('entro a case estado en espera')
        id_estado = "1";
        break;
      case "En curso":
        //  console.log('entro a case en curso')
        id_estado = "2";
        break;
      case "Finalizado":
        //console.log('entro a case finalizado')
        id_estado = "3";
        break;
    }

    //switch Sector -------------------------------------

    let id_sector = null;

    switch (
    sector //seccion de busqueda de id_sector
    ) {
      case "Norte":
        //  console.log('entro a case sector Norte')
        id_sector = "1";
        break;
      case "Sur":
        // console.log('entro a case sector Sur')
        id_sector = "2";
        break;
      case "Centro":
        //  console.log('entro a case sector Centro')
        id_sector = "5";
        break;
      case "Este":
        // console.log('entro a case sector Este')
        id_sector = "3";
        break;
      case "Oeste":
        // console.log('entro a case sector Oeste')
        id_sector = "4";
        break;
    }
    //id_aleatorio no repetitivo de asignacion fallos

    // RECORDATORIO: Realizar funcion para verificar que no se repita
    let aleatorio = Math.random() * (100000);
    const id_random = Math.floor(aleatorio);
    //console.log(id_random)
    conexion.query(
      "INSERT INTO asignacion_fallos SET ?",
      {
        id_asignacion_fallos: id_random,
        fecha_asignacion: fechaActual,
        id_estado: id_estado

      }, (error, results) => {
        if (error) throw error;

        conexion.query(
          "INSERT INTO ascensor SET ?",
          {
            nombre_lugar: conjunto,
            descripcion_ascensor: falla,
            observacion: observaciones,
            id_persona: id_tecnico,
            id_sector: id_sector,
            id_asignacion: id_random
          },
          (error, result) => {
            if (error) throw error;

            res.redirect("/tareas");

          })
      }
    ); //al colocar query ya podemos especificar una sentencia MYSQL


  } catch (error) {
    console.log(error);
  }

};


//------------METODO DE INSERCCION DE BITACORAS---------------------------------------

exports.addBitacora = async (req, res) => {
  //Metodo REGISTAR BITACORA
  //captura los datos desde el front
  try {
    //datos tabla bitacora
    const mensaje = req.body.mensaje;
     //console.log('la falla es: ' + mensaje);
    const postMantenimiento = req.body.postMantenimiento;
     //console.log('ubicacion conjunto: ' + postMantenimiento);

    //Manipulacion de la cadena tecnico para obtener solo id
    const situacion = req.body.situacion;
    //console.log('ubicacion conjunto: ' + situacion);
    const reporte = req.body.reporte;
       console.log('N°: ' + reporte);
    const now = new Date(); //Extraer fecha actual 
    year = now.getFullYear();
    month = now.getMonth();
    day = now.getDate();
    let fechaActual = year + '-' + month + '-' + day;
    //console.log(fechaActual)

    //switch Estado -------------------------------------

    let id_situacion = null;

    switch (
    situacion //seccion de busqueda de id
    ) {
      case "POSPONER MANTENIMINETO":
       // console.log('entro a case POSPONER MANTENIMINETO')
        id_situacion = "1";
        break;
      case "NO SE PUEDE ARREGLAR":
        //  console.log('NO SE PUEDE ARREGLAR')
        id_situacion = "2";
        break;
      case "ARREGLADO EXITOSAMENTE":
        //console.log('ARREGLADO EXITOSAMENTE')
        id_situacion = "3";
        break;
    }
    conexion.query(
      "INSERT INTO bitacora SET ?",
      {
        fecha_bitacora: fechaActual,
        revision: mensaje,
        postMantenimiento: postMantenimiento,
        id_situacion_mantenimiento: id_situacion

      }, (error, results) => {
        if (error) throw error;

        res.redirect("/indexTec");
      }
    ); //al colocar query ya podemos especificar una sentencia MYSQL

  } catch (error) {
    console.log(error);
  }

};
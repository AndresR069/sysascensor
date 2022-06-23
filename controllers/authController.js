const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

exports.register = async (req, res) => {
  //Nuevo metodo registrar PERSONAS
  //caputa los datos desde el front

  try {
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const email = req.body.email;
    const direccion = req.body.direccion;
    const telefono = req.body.telefono;
    const pass = req.body.password;
    const rol = req.body.rol;
    console.log(rol);
    let id_rol = null;
    switch (
      rol //seccion de busqueda de id
    ) {
      case "administrador":
        //  console.log('entro a case administrador')
        id_rol = "1";
        break;
      case "tecnico":
        //   console.log('entro a case tecnico')
        id_rol = "2";
        break;
      case "usuario":
        //   console.log('entro a case usuario')
        id_rol = "3";
        break;
    }
    // console.log(nombres +' '+apellidos +' ' + pass)
    // console.log(id_rol);
    let passHash = await bcrypts.hash(pass, 8);
    //console.log(passHash);
    conexion.query(
      "INSERT INTO persona SET ?",
      {
        nombres: nombres,
        apellidos: apellidos,
        correo: email,
        direccion: direccion,
        pass: passHash,
        id_rol: id_rol,
        telefono: telefono,
      },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/adminuser");
      }
    ); //al colocar query ya podemos especificar una sentencia MYSQL
  } catch (error) {
    console.log(error);
  }
};

//procedimiento para ingreso al LOGIN.............................................................
exports.login = async (req, res) => {
  //captura de datos del login
  try {
    const email = req.body.email;
    const pass = req.body.pass;
    //console.log(user + pass)

    if (!email || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario o password",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login", //importante
      });
    } else {
      //en el caso de que si se ingreso
      //buscar usuario ingresado

      conexion.query(
        "SELECT persona.correo, persona.pass, persona.id_rol FROM persona WHERE correo = ?",
        [email],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcrypts.compare(pass, results[0].pass))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Advertencia",
              alertMessage: "Ingrese un usuario o password",
              alertIcon: "info",
              showConfirmButton: true,
              timer: false,
              ruta: "login", //importante
            });
          } else {
            //Consultas para el ingreso a los dashborad segun el rol...........
            console.log("entro 1"); //consulta "prototipo"

            //inicio de sesion ok

            if (results[0].id_rol == "1") {
              //consulta usuario: Administrador
              console.log("entro if rol Administrador");

              const id = results[0].id_persona;
              /* const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                 expiresIn: process.env.JWT_TIEMPO_EXPIRA
             })*/
              const token = jwt.sign({ id: id }, process.env.JWT_SECRETO);
              console.log(token);

              //cokies

              const cookiesOptios = {
                expires: new Date(
                  Date.now() +
                    process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
              };
              res.cookie("jwt", token, cookiesOptios); //nombre del token en cokie sera jwt

              res.render("login", {
                alert: true,
                alertTitle: "Conexion exitosa",
                alertMessage: "LOGIN CORRECTO!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 800, //milisegundos
                ruta: "index", //importante
              });
            }

            if (results[0].id_rol == "2") {
              //consulta usuario: usuario Tecnico
              console.log("entro if rol tecnico");

              const id = results[0].id_persona;
              /* const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                 expiresIn: process.env.JWT_TIEMPO_EXPIRA
             })*/
              const token = jwt.sign({ id: id }, process.env.JWT_SECRETO);
              console.log(token);

              //cokies

              const cookiesOptios = {
                expires: new Date(
                  Date.now() +
                    process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
              };
              res.cookie("jwt", token, cookiesOptios); //nombre del token en cokie sera jwt

              res.render("login", {
                alert: true,
                alertTitle: "Conexion exitosa",
                alertMessage: "LOGIN CORRECTO!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 800, //milisegundos
                ruta: "indexTec", //importante
              });
            }//cierra if de tecnico

            if (results[0].id_rol == "3") {

              console.log("entro if rol usuario");

              const id = results[0].id_persona;
              /* const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                 expiresIn: process.env.JWT_TIEMPO_EXPIRA
             })*/
              const token = jwt.sign({ id: id }, process.env.JWT_SECRETO);
              console.log(token);

              //cokies

              const cookiesOptios = {
                expires: new Date(
                  Date.now() +
                    process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true,
              };
              res.cookie("jwt", token, cookiesOptios); //nombre del token en cokie sera jwt

              res.render("login", {
                alert: true,
                alertTitle: "Conexion exitosa",
                alertMessage: "LOGIN CORRECTO!",
                alertIcon: "success",
                showConfirmButton: false,
                timer: 800, //milisegundos
                ruta: "dashAdmiAs", //importante
              });
              //consulta usuario: Usuario
            }
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

//------------- autenticacion del usuario--------------------------------
exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    //condicional para preguntar por nuestra cookie
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );

      //consulta que chekear si el usuario efectivamente esta en la base de datos

      conexion.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    res.redirect("/login");
  }
};
/*
exports.logout = (req,res)=>{
  res.clearCookie('jwt')
  return res.redirect('/index.ejs')
}*/

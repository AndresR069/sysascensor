const jwt = require("jsonwebtoken");
const bcrypts = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");

//procedimiento para registros

exports.register = async (req, res) => {
  //caputa los datos desde el front

  try {
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    //console.log(name + user + pass)
    let passHash = await bcrypts.hash(pass, 8);
    console.log(passHash);
    conexion.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, pass: passHash },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    ); //al colocar query ya podemos especificar una sentencia MYSQL
  } catch (error) {
    console.log(error);
  }
};

//procedimiento para ingreso al login.............................................................
exports.login = async (req, res) => {
  //captura de datos del login
  try {
    const user = req.body.user;
    const pass = req.body.pass;
    console.log(user + pass)

    if (!user || !pass) {
      res.render('login', {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario o password",
        alertIcon: "info",
        showConfirmButton: true,
        timer:false,
        ruta: 'login' //importante
      });
    }else{//en el caso de que si se ingreso
        //buscar usuario ingresado
        conexion.query('SELECT * FROM users WHERE user = ?',[user], async(error,results)=>{

            if(results.length== 0 || !(await bcrypts.compare(pass,results[0].pass))){
                res.render("login", {
                    alert: true,
                    alertTitle: "Advertencia",
                    alertMessage: "Ingrese un usuario o password",
                    alertIcon: "info",
                    showConfirmButton: true,
                    timer:false,
                    ruta: 'login' //importante
                  });
           
            }else{
              console.log('entro 1')//consulta "prototipo"
              //Consultas para el ingreso a los dashborad segun el rol

              if(user=='tecnico'){//consulta usuario: Tecnico

              }
              if(user=='usuario'){//consulta usuario: usuario Ascensor

              }
              if(user=='admin'){//consulta usuario: Super usuario

                  console.log('entro 2')
                  //inicio de sesion ok

                const id = results[0].id
                /* const token = jwt.sign({id:id},process.env.JWT_SECRETO,{
                     expiresIn: process.env.JWT_TIEMPO_EXPIRA
                 })*/
                 const token = jwt.sign({id:id},process.env.JWT_SECRETO)
                 console.log(token)
 
                 
 
                 //cokies
 
                 const cookiesOptios = {
                     expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                     httpOnly:true
                 }
                 res.cookie('jwt',token,cookiesOptios)//nombre del token en cokie sera jwt
                 res.render('login', {
 
                     alert: true,
                     alertTitle: "Conexion exitosa",
                     alertMessage: 'LOGIN CORRECTO!',
                     alertIcon: "success",
                     showConfirmButton: false,
                     timer:800,//milisegundos
                     ruta: '' //importante
 
                 })

              }
                
                
            }   

        })
        
    }
  } catch (error) { console.log(error)}
};


//------------- autenticacion del usuario--------------------------------
exports.isAuthenticated = async(req, res,next)=>{

  if(req.cookies.jwt){//condicional para preguntar por nuestra cookie
try {
  const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)

  //consulta que chekear si el usuario efectivamente esta en la base de datos

  conexion.query('SELECT * FROM users WHERE id = ?',[decodificada.id],(error, results)=>{
    req.user = results[0]
    return next()
  })
} catch (error) {
  console.log(error)
  return next()
}
  }else{
    res.redirect('/login')
  }
}
/*
exports.logout = (req,res)=>{
  res.clearCookie('jwt')
  return res.redirect('/index.ejs')
}*/
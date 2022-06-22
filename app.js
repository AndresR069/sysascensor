const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express();

//.....SETEAMOS EL MOTOR DE PLANTILLAS
app.set('view engine','ejs');

app.use(express.static('public'))//mandamos de ruta statica de consulta public

//setear node para que procese estos datos
//para procesar datos enviados desde forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//----------------------------------------


//---seteamos las variables de entorno.............................

dotenv.config({path: './env/.env'})

//.................................................................


//....llamar al router...............................

app.use('/', require('./routes/router'))


//para poder trabajar las cookies........................
/*
app.use(cookieParser());

//..ELIMINAR EL CACHE PARA QUE NO RETORNEN CON UN SIMPLE BACK........................................................
app.use(function(req,res,next){
    if(!req.user){
        res.header('Cache-Control','private, no-cache, no-store, must-revalidate')
    }
    next();
})
*/
//...........LLAMADA AL PUERTO..............
app.listen(3000,()=>{
    console.log('Server UP running in http://localhost:3000')
})

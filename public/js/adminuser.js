
//traer el modal de boostrap e igualarlo a una variable
const editmodal = new bootstrap.Modal(document.getElementById('editmodal'))
const deletemodal = new bootstrap.Modal(document.getElementById('deletemodal'))


const on = (element, event, selector, handler) => {
  //  console.log(element)
   // console.log(event)
  //  console.log(selector)
   //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
//evento click-editar-mandar registros a los inputs de la ventana modal
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    id_editar.value = fila.children[0].innerHTML
    nombres_editar.value = fila.children[1].innerHTML
    apellidos_editar.value = fila.children[2].innerHTML
    email_editar.value = fila.children[3].innerHTML
    direccion_editar.value = fila.children[4].innerHTML
    telefono_editar.value = fila.children[5].innerHTML
editmodal.show() 
})

//evento click-DELETE-OPEN
on(document, 'click', '.btnDelete', e => {    
    const fila = e.target.parentNode.parentNode
    id_eliminar.value = fila.children[0].innerHTML
deletemodal.show() 
})




//traer el modal de boostrap e igualarlo a una variable
const editmodal = new bootstrap.Modal(document.getElementById('editmodal'))
//const deletemodal = new bootstrap.Modal(document.getElementById('deleteModal'))


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
    nombre_editar.value = fila.children[1].innerHTML
    correo_editar.value = fila.children[2].innerHTML
    telefono_editar.value = fila.children[3].innerHTML
editmodal.show() 
})

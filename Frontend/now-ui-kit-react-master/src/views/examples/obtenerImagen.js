

async function obtener(){
    let url = 'http://localhost:4000/image_perfil'
    var data = {username:'Hektor_Orozco'}

    let respuesta;

    await fetch(url,{
        method:'POST',
        body:JSON.stringify(data)
    })
    .then(Response => Response.json())
    .then(function(jsons){
        console.log(jsons);
        respuesta = jsons;
    })

    return respuesta;
}

export default obtener;
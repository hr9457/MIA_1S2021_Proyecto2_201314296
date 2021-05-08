

async function enviarData(informacion){
    var url = 'http://localhost:4000/carga_masiva'
    var data = {data:''+informacion}
    // console.log(data);
    let respueta;
    await fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
    })
    .then(Response => Response.json())
    .then(function(jsons){
        console.log(jsons);
        respueta = jsons
    })
    .catch(error=>{
        console.error('Error: ',error);
    })
    return respueta;
}

export default enviarData;
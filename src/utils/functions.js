

export function TransformISOdate(pickedDate){


// Fecha original en el formato "Sat Jul 08 2023 00:00:00 GMT-0300 (hora estándar de Uruguay)"
const fechaOriginal = new Date(pickedDate);

// Obtener los componentes individuales de la fecha
const year = fechaOriginal.getUTCFullYear();
const month = String(fechaOriginal.getUTCMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por lo que sumamos 1.
const day = String(fechaOriginal.getUTCDate()).padStart(2, '0');
/*const hours = String(fechaOriginal.getUTCHours()).padStart(2, '0');
const minutes = String(fechaOriginal.getUTCMinutes()).padStart(2, '0');
const seconds = String(fechaOriginal.getUTCSeconds()).padStart(2, '0');*/

// Construir la cadena de fecha en el formato requerido "YYYY-MM-DDTHH:mm:ssZ"
const fechaConvertida = `${year}-${month}-${day}T00:00:00.000Z`;

return fechaConvertida;
}


export function ConvertISOdateToRegular(isodate){

    let arr=isodate.split("T")
    let arr2=arr[0].split("-")

    return(`${arr2[2]}/${arr2[1]}/${arr2[0]}`)
}



export function orderByDate(array) {
    // Utilizamos el método sort para ordenar el array de objetos por la propiedad 'fecha'
    array.sort((a, b) => new Date(b.date_report) - new Date(a.date_report));
    return array;
  }

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export function TransformISOdate(pickedDate) {
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

export function ConvertISOdateToRegular(isodate) {
	if (isodate) {
		let arr = isodate.split('T');
		let arr2 = arr[0].split('-');

		return `${arr2[2]}/${arr2[1]}/${arr2[0]}`;
	}
}

export function orderByDate(array) {
	// Utilizamos el método sort para ordenar el array de objetos por la propiedad 'fecha'
	array.sort((a, b) => new Date(b.date_report) - new Date(a.date_report));
	return array;
}


export function orderAlphabetically(array){
    array.sort((a, b) => a.last_name.localeCompare(b.last_name, undefined, { sensitivity: "base" }));
    return array;
}





export function emailReport(report) {
	return `
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Globant</title>
      <style>
          
          .contenedor {height:100vh;}
          .contenedor2 {height:85%;width:30%;background-color:#f1f3f4 ;border:solid 0,0,10px #cac4c4;padding:2%;margin:0 auto }
          .contenedor3{width: 80%; margin: 0 auto;}
  
  
          
          img {height:35%; display: block; margin: 0 auto;}
          ul{ list-style:none;font-size:1.1rem; margin-top: 15%;}
          li{margin-bottom:2%;}
          span{font-weight:bolder;}
          h2{text-align: center;}
          
      </style>
  </head>
  <body>
  
      <div class="contenedor" >
  
  
          <div class="contenedor2">
          <h2>REPORT DETAIL</h2>
          <img src=${report.url_img} alt="foto"/>
         
          <div class="contenedor3">
          <ul>
           <li style=><span> USER:</span> ${report.user}</li>
          <li style=><span> DATE:</span> ${report.date_report.slice(0, 9)}</li>
          <li style=><span> STATUS:</span> ${report.status_report}</li>
          <li style=><span> DEVICE:</span> ${report.device}</li>
          <li style=><span> DESCRIPTION:</span>${report.description}</li>
          <li style=><span> LOCATION:</span> ${report.location}</li>
          <li style=><span> FLOOR:</span> ${report.floor_number}</li>
          <li style=><span> BOX:</span> ${report.box_number}</li>  
          
      </ul>
  </div>
          </div>
      
      
      
      
      
          
      </div>
  
  
      
  </body>
  </html>`;
}

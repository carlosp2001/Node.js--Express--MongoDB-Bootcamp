// Usando Modulos 1: Core Modules

const fs = require('fs');

// const hello = 'Hello world';
// console.log(hello);

//////////////////////////////////////////////////////////////////////////////
// Leyendo y escribiendo archivos con Node.js

// Esta funcion nos ayuda a leer archivos de sicrona, el primer parametro es la ubicacion del archivo y el segundo
// es la codificación de caracteres
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;

// Esta función nos ayuda a crear un archivo con texto, el primer parametro es el archivo que sera la salida
fs.writeFileSync('./txt/output.txt', textOut);
console.log('File written!');

//////////////////////////////////////////////////////////////////////////////
// Blocking y no blocking codigo: Naturalez asincrona de Node.js

/*
El codigo sincrono se puede considerear bloqueador, hace que cada linea espera por el resultado de la otra
*/

// Ejemplo de código asincrono
fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
    console.log(data);
});
console.log('Reading file...');
// Usando Modulos 1: Core Modules

const fs = require('fs');
const http = require('http');

//////////////////////////////////////////////////////////////////////////////
// ARCHIVOS

// const hello = 'Hello world';
// console.log(hello);

//////////////////////////////////////////////////////////////////////////////
// Leyendo y escribiendo archivos con Node.js

// Blocking, synchronous way
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

/////////////////////////////////////////////////////////////////////////////
// Leyendo y escribiendo en archivos de forma asíncrona

// Forma asincrona
fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
    if(err) return console.log('ERROR');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
                console.log('Your file has been written');
            })
            
        });
    });
});

console.log('Will read file!');

//////////////////////////////////////////////////////////////////////////////
// SERVER

//////////////////////////////////////////////////////////////////////////////
// Creando un servidor web simple

const server = http.createServer((req, res) => {
    res.end('Hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})
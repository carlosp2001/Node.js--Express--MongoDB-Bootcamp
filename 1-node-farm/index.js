// Usando Modulos 1: Core Modules

const fs = require('fs');
const http = require('http');
const url = require('url');

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
    if (err) return console.log('ERROR');
    fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);

            fs.writeFile(
                './txt/final.txt',
                `${data2}\n${data3}`,
                'utf-8',
                (err) => {
                    console.log('Your file has been written');
                }
            );
        });
    });
});

console.log('Will read file!');

//////////////////////////////////////////////////////////////////////////////
// SERVER

//////////////////////////////////////////////////////////////////////////////
// Creando un servidor web simple

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    console.log(req.url);

    const pathName = req.url;
    if (pathName === '/' || pathName === '/overview') {
        res.end('This is the overview');
    } else if (pathName === '/product') {
        res.end('This is the product');
    } else if (pathName === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        //     const productData = JSON.parse(data);
        //     console.log(productData);
        //     res.writeHead(200, {
        //         'Content-type': 'application/json',
        //     });
        //     res.end(data);
        // });
        
        res.writeHead(200, {
            'Content-type': 'application/json',
        });
        res.end(data);
    } else {
        // De esta forma enviamos encabezados HTTP
        // Un encabezado HTTP es basicamente una información sobre la respuesta que estamos enviando
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('Page not found!');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});

//////////////////////////////////////////////////////////////////////////////
// Routing

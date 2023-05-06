/*
Tipos de streams:
- Readable streams: Son las transmisiones de las cuales podemos leer datos (consumirlos) Ejemplo: http peticiones, fs leer transmisiones
Eventos: data end
Funciones: pipe() read()
- Writable streams: Transmisiones a las cuales nosotros podemos escribir datos
Ejemplo: http requests, fs write streams
Eventos: drain finish
Funciones: write() end()
- Transmisiones Duplex: Transmisiones que son ambos casos readable y writable
Ejemplo: net web socket 
- Transform Streams: Duplex streams que transforman datos como escritos o leídos
Ejemplo: zlib Gzip Creation
*/

const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    // Solution 1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    // Solution 2: Streams
    // const readable = fs.createReadStream("test-file.txt");
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500
    //     res.end('File not found')
    // })

    // Solution 3: 
    const readable = fs.createReadStream("test-file.txt");
    readable.pipe(res);
    // readableSource.pipe(wirtableDest)
});

server.listen(8001, '127.0.0.1', () => {
    console.log('Listening...');
})
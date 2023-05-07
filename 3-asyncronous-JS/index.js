const fs = require('fs');
const {resolve} = require('path');
const superagent = require('superagent');

// Usando callback hell

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//         .get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .end((err, res) => {
//             if(err) return console.log(err.message);
//             console.log(res.body.message);

//             fs.writeFile('dog-img.txt', res.body.message, err => {
//                 if(err) return console.log(err.message);
//                 console.log('Random dog image saved to file');
//             })
//         });
// });

// Promesas
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
    console.log(`Breed: ${data}`);

    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
        .then((res) => {
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, (err) => {
                if (err) return console.log(err.message);
                console.log('Random dog image saved to file');
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject('Could not write the file');
            resolve('success');
        });
    });
};

readFilePro(`${__dirname}/dog.txt`)
    .then((data) => {
        console.log(`Breed: ${data}`);

        return superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
    })
    .then((res) => {
        console.log(res.body.message);
        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Usando async await

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);

        await writeFilePro('dog-img.txt', res.body.message);
        console.log('Random dog image saved to file');
    } catch (err) {
        console.log(err);
        throw(err)
    }
    return '2: READY 🐶'
};

// Regresando valores de una funcion async con then

console.log('1: Will get dog pics');
getDogPic().then(x => {
    console.log(x);
    console.log('3: Done getting dog pics!');
}).catch(err => {
    console.log('ERROR');
});

// Regresando valores de una función con async y await
(async () => {
    try {
        console.log('1: Will get dog pics');
        const x = await getDogPic();
        console.log(x);
        console.log('3: Done getting dog pics!');
    } catch(err) {
        console.log('ERROR ');
    }
    

})();

// Esperando por multiples promesas simultaneamente

const getDogPic1 = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const res1Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = await superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(el => el.body.message)
        console.log(all);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file');
    } catch (err) {
        console.log(err);
        throw(err)
    }
    return '2: READY 🐶'
};

getDogPic1();
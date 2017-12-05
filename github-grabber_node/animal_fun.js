const fs = require('fs'); // File System module
const http = require('http');
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const user_input = process.argv[2].toLowerCase(); // return arguments passed from command line using global 'process' object provided by Node

// return a string of animal names starting with specified letter.
const selectAnimals = function(data, letter) {
    return data.split("\n")
    .filter(animal => animal.startsWith(letter))
    .join("\n")
};

// Part 1: Reading and Writing from Files
// async version. Callback provides an error obj (if it exists) and data from file. This order of callback is common in Node. If encoding (ie. utf-8) is not specified, Node returns a buffer instance of Buffer class to handle raw binary data. Each buffer corresponds to raw memory allocated outside V8.
fs.readFile('./animals.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  if (alphabet.includes(user_input) && user_input.length === 1) {
    const CLILetter = user_input.toUpperCase();
    let CLIAnimals = selectAnimals(data, CLILetter);

    // second argument provides data that should be written to file, and callback will only provide error obj (if it exists)
    fs.writeFile(`${CLILetter}_animals.txt`, CLIAnimals, err => {
      if (err) throw err;
      console.log(`${CLILetter}_animals.txt successfully written`);
    })
  }
});

// sync version:
// const animalsList = fs.readFileSync('./animals.txt', 'utf-8')
// if (alphabet.includes(user_input) && user_input.length === 1) {
//   const CLILetterSync = user_input.toUpperCase();
//   let CLIAnimalsSync = selectAnimals(animalsList, CLILetterSync);
//
//   fs.writeFile(`${CLILetterSync}_animals.txt`, CLIAnimalsSync, err => {
//     if (err) throw err;
//     console.log(`${CLILetterSync}_animals.txt successfully written`);
//   })
// }


//////////////
// Part 2: Repeat Part 1 but using HTTP req/res cycle
const cache = {}; // create POJO to store and access previously requested content in memory. This is to prevent having to readFile() with every request.

// create a HTTP server object using createServer method
const animalServer = http.createServer((req, res) => {
  console.log(req);
  const query = req.url.split('?')[1];

  if (query !== undefined && query.length == 1 && alphabet.includes(query)) {
    var queriedLetter = query.toUpperCase();
    console.log('letter: ', queriedLetter);

    if (cache[queriedLetter] !== undefined) {
      res.end(cache[queriedLetter]);
      return
    } else {
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      let filtered_animals = selectAnimals(data, queriedLetter);
      cache[`${queriedLetter}`] = filtered_animals;
      console.log('cache: ', cache);
      res.end(filtered_animals); // sends body of response to client and signals to server that response (header and body) has been sent completely.
    })
    }

  } else {
    if (cache['animals'] !== undefined) {
      res.end(cache['animals']);
    }
    fs.readFile('./animals.txt', 'utf-8', (err, data) => {
      if (err) throw err;
      cache['animals'] = data;
      res.end(data);
    })
  }
  res.writeHead(200, {'Content-Type': 'text/html'}); // converts data to text/html format
  res.write(`Animals that start with letter, ${queriedLetter}: `); // write response to client
}).listen(8000, () =>
    console.log('listening on 8000')
  ); // server object listens on port 8000

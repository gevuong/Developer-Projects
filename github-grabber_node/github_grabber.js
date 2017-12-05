const fs = require('fs'); // File System module
const https = require('https');
const http = require('http');
const qs = require('querystring');

// Options obj to configure HTTPS GET request to Github's API
const buildOptionsObj = function(username) {
  return {
    hostname: `api.github.com`,
    path: `/users/${username}/starred`,
    headers: { // Github requires all API reqs to include a valid User-Agent header (i.e. Github username or name of app) in case Github needs to contact you if there are any problems.
      'User-Agent': 'Github-Grabber'
    }
  }
}

// create HTTP server object
const githubServer = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = ''; // variable to accumulate data

    // create 'data' and 'end' event listeners to request
    req.on('data', chunk => {
      // chunk is an object of Buffer class, toString() is implicitly called when chunk is added to body
      body += chunk;

      // kill connection if malicious user posts massive amounts of data to your Node server.
      if (body.length > 1e6) {
        req.connection.destroy(); // flood attack or faulty client, nuke request
      }
    })

    req.on('end', () => {
      // used postman x-www-form-urlencoded to test key-value pair
      const username = qs.parse(body).username;
      const options = buildOptionsObj(username);

      https.get(options, dataStream => {
        let repoData = '';
        dataStream.on('data', chunk => {
          repoData += chunk; // chunk is a Buffer obj. We don't have data all at once, so as data is being streamed, chunks of data are concatenated to repoData, a single large string enclosing a single array of multiple starred repo objects
        })

        dataStream.on('end', () => {
          const parsedRepos = JSON.parse(repoData); // JSON.parse returns an array of repo objects.
          const repos = parsedRepos.map(repo => {
            return (
              `Repo: ${repo.name}, Stars: ${repo.stargazers_count}`
            )
          }).join('\n') // array of repo strings need to be joined to a single string. When displayed as html or text, '\n' creates a new line for each repo string.

          fs.writeFile(`${username}_starred_repos.txt`, repos, err => {
            if (err) throw err;
            console.log(`${username}_starred_repos.txt was successfully written`);
          })
          // alternative method to writeFile
            // const writeStream = fs.createWriteStream(`./${username}_starred_repos.txt`);
            // writeStream.write(repos);
          res.end(repos); // sends body of response to client and signals to server that response (header and body) has been sent completely.
        })
      })
    })
  }
})

githubServer.listen(8080, () =>
  console.log('Listening on 8080')
); // server object listens on port 8080

var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.user;
var GITHUB_TOKEN = process.env.token;



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent' : 'requestqwer'
    }
  }
  request.get(options, function(error, response, body){
    console.log(body);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
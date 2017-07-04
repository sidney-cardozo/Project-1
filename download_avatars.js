var request = require('request');
var fs = require('fs');

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
    var contributorInfo = JSON.parse(body);
    cb(contributorInfo);
  });
}

function downloadImageByURL(url, filePath) {
  filePath = "avatars/" + filePath + ".jpg";
  request.get(url)               // Note 1
       .on('error', function (err) {                                   // Note 2
         throw err;
       })
       .on('response', function (response) {                           // Note 3
         console.log('Response Status Code: ', response.statusCode, response.headers['content-type']);
       })
       .on('end', function(){
        console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(info) {
  for(var x of info){
    downloadImageByURL(x.avatar_url, x.login);
  }
});


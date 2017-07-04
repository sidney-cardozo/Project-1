//User needs to set the enviroment variables (either in the command line or permanantely in shell)

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

var GITHUB_USER = process.env.user;
var GITHUB_TOKEN = process.env.token;
var GITHUB_OWNER = process.argv[2];
var GITHUB_REPO = process.argv[3];


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent' : 'LH USER'
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
if(process.argv.length === 4){
  getRepoContributors(GITHUB_OWNER, GITHUB_REPO, function(info) {
    for(var x of info){
      downloadImageByURL(x.avatar_url, x.login);
    }
  });
}else{
  console.log("Please enter 2 valid arguments to pass through: <GITHUB_OWNER> <GITHUB_REPO>");
}



var Twitter = require('twitter');
var TwitterCrawler = require('twitter-crawler');

var client = new Twitter({
    consumer_key: 'wVXBp1HYvkU05jagB85cQLR4b',
    consumer_secret: 'eZSSU0HWzqIZNNHIAQuFB12AsKbwvfAPhqAIjq49tTEehYaF9R',
    access_token_key: '899794247376924673-Ri66hmIk42Ou5ilYpXpKj60lGLXN1eq',
    access_token_secret: 'Ks3NuF41VSTQbVanrX3kFZdGbhygYMdwNaZzKZ5Dtk6WH'
  });
   
var params = {
    q: '#AecioNeves'
}

client.get('search/tweets', params, function(error, tweet, response) {
    if (!error) {
      console.log(tweet.statuses[1].text);
    }
});
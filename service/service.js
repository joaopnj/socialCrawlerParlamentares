module.exports = (app) => { 
    var Twitter        = require('twitter');
    var fs             = require('fs');
    var client = new Twitter({
        consumer_key: 'wVXBp1HYvkU05jagB85cQLR4b',
        consumer_secret: 'eZSSU0HWzqIZNNHIAQuFB12AsKbwvfAPhqAIjq49tTEehYaF9R',
        access_token_key: '899794247376924673-Ri66hmIk42Ou5ilYpXpKj60lGLXN1eq',
        access_token_secret: 'Ks3NuF41VSTQbVanrX3kFZdGbhygYMdwNaZzKZ5Dtk6WH'
    });
    
    const mongoose = require('mongoose');
    
    var TwitterService = {
        getParlamentar : (parlamentar) => {
            
            var params = {
                q: '#'+parlamentar
            }
    
            client.get('search/tweets', params, (error, tweet, response) =>  {
                if (!error) { console.log(tweet.statuses[0].text);  }
            });
    
            var text = fs.readFileSync("congressistas.txt").toString("utf-8");
            var textLine = text.split(";");
            console.log(textLine[0]);
        }
        
    }

    return TwitterService;
}
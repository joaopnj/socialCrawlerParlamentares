module.exports = (app) => { 
    var TwitterAPI        = require('twitter');
    // var twitterAPI     = require('node-twitter-api');
    var Twitter     = require('node-twitter');
    var fs             = require('fs');
    var Congressista  = app.models.congressistas;
    var Tweet = app.models.tweet;
    // var dao            = app.dao.dao;
    var client = new TwitterAPI({
        consumer_key: 'YVGr7mZLDddzyPPW0PMz6lyB7',
        consumer_secret: 'iDb2uBJ5YezbdY3zqAc01LLPsGUbPGDVoSqbUjKeIX0s2neCCx',
        access_token_key: '755796020592869376-lka1GoJfBqSq1ee5uHA0xHBcJYqQDju',
        access_token_secret: 'tiK6QX6VPNioPmO8hVplkngqVYisJrDYtgws89JpNJGHk'
    });

    var twitterSearchClient = new Twitter.SearchClient(
        'wVXBp1HYvkU05jagB85cQLR4b',
        'eZSSU0HWzqIZNNHIAQuFB12AsKbwvfAPhqAIjq49tTEehYaF9R',
        '899794247376924673-Ri66hmIk42Ou5ilYpXpKj60lGLXN1eq',
        'Ks3NuF41VSTQbVanrX3kFZdGbhygYMdwNaZzKZ5Dtk6WH'
    );

    // var twitter = new twitterAPI({
    //     consumerKey: 'wVXBp1HYvkU05jagB85cQLR4b',
    //     consumerSecret: 'eZSSU0HWzqIZNNHIAQuFB12AsKbwvfAPhqAIjq49tTEehYaF9R'
    // });
    
    const mongoose = require('mongoose');
    
    var TwitterService = {
        saveParlamentar : () => {

            var text = fs.readFileSync("congressistas.txt").toString("utf-8");
            var textLine = text.split(";");

            for (var i = 0; i < textLine.length; i++) {
            
                var model = new Congressista();
                model.nome = textLine[i].replace(/[\r\n," "]/g, "");
                
                model.save((err) => {
                    if (err) console.log(err);
                });
            }
        },

        getParlamentar : () => {
            
            Congressista.find( (err, data) => {
                for (var i = 0; i < data.length; i++) {
                    client.get('search/tweets', {"q" : "#"+data[i].name }, function(error, tweet, response){
                        if(error){
                            console.log(error);
                        }
                        if(tweet.statuses != undefined) {
                            var tweetObj = new Tweet();
                            tweetObj.texto = result.statuses.text;
                            tweetObj.internauta = result.statuses.user;
                            tweetObj.hashTag = "#"+data[i].nome;
                                        
                            tweet.save((err) => {
                                if (err) console.log(err);
                            });
                        }
                    });
                }
            });
        }
        
        
    }

    return TwitterService;
}
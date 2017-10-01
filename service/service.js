module.exports = (app) => { 
    var TwitterAPI        = require('twitter');
    var fs                = require('fs');
    var Congressista      = app.models.congressistas;
    var Tweet             = app.models.tweet;
    
    var client = new TwitterAPI({
        consumer_key: 'knMiCR839pbl3VywuqLSIXMyg',
        consumer_secret: 'NQaU4O0ombTiQ3G51aoYlXMfj00z9XFc7ep699LQFmufXNdxks',
        access_token_key: '71316971-itKpPRRjArC7WTUkWqWL17f7elPVCv3A52ZkaVwf9',
        access_token_secret: 'AGj7sexsGinTyKDdFOR3FemfQbVKV0Zh5GO0mIgaBc9K6'
    });

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

        getParlamentar : (posicao) => {
            
            Congressista.find( (err, data) => {

                console.log("Posição: "+posicao);
                console.log("Congressista "+posicao+ " : "+data[posicao]);

                var hashTag = "#"+data[posicao].nome;

                console.log("HashTag: "+hashTag);

                // client.get('search/tweets', {"q" : hashTag }, (error, tweet, response) => {

                //     for (var i = 0; i < tweet.length; i++) {

                //         if(error){ console.log(error); }
                        
                //         if(tweet.statuses != undefined) {

                //             console.log(tweet.statuses[i].text);
                //             console.log(tweet.statuses[i].user);

                //             var tweetObj        = new Tweet();
                //             tweetObj.texto      = tweet[i].statuses.text;
                //             tweetObj.internauta = tweet[i].statuses.user;
                //             tweetObj.hashTag    = hashTag;
                                                
                //             tweetObj.save((err) => {
                //                 if (err) console.log(err);
                //             });
                //         }
                //     }

                // });
            });
            
        }
        
        
    }

    return TwitterService;
}
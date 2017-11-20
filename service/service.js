module.exports = (app) => { 
    var TwitterAPI        = require('twitter'); //Inicializa uma variavel a qual ira utilizar o script twitter, o qual se encontra a biblioteca externa para fazer as requisicoes na API.
    var fs                = require('fs');
    var Congressista      = app.models.congressistas; //Variavel a qual se encontra 1 arquivo texto que possui o nome de todos os congressistas a serem pesquisados
    var Dao               = app.dao.dao;
    var Tweet             = app.models.tweet; //Variavel que sera usada para armazenar os tweets coletados
    
    var client = new TwitterAPI({ //Cria uma variavel cliente para poder acessar a API do tweeter para fazer as operacoes
        //Parametros necessarios para iniciar o cliete que ira fazer os acessos
        consumer_key: 'knMiCR839pbl3VywuqLSIXMyg', //Primeiro paramentro, chave de identificacao do usuario
        consumer_secret: 'NQaU4O0ombTiQ3G51aoYlXMfj00z9XFc7ep699LQFmufXNdxks', //Senha gerada para validar o usuario
        access_token_key: '71316971-itKpPRRjArC7WTUkWqWL17f7elPVCv3A52ZkaVwf9', //Token de acesso para validar o usuario
        access_token_secret: 'AGj7sexsGinTyKDdFOR3FemfQbVKV0Zh5GO0mIgaBc9K6' //Senha do token de acesso para validar o usuario
    });

    const mongoose = require('mongoose');
    
    var TwitterService = { 
        saveParlamentar : () => {

            var text = fs.readFileSync("congressistas.txt").toString("utf-8");//Realiza a leitura do arquivo texto e converte as linha lidas para um string no formato brasileiro de leitura
            var textLine = text.split(";"); //Dentro do arquivo, encontra cada nome separado por um ;, nessa linha entao sao removidos os ; para a leitura separar um congressista de outro

            for (var i = 0; i < textLine.length; i++) { //Faz a leitura das liha de texto
            
                var model = new Congressista(); //Cria uma instancia de congressista para ser adicionado na base de dados
                model.nome = textLine[i].replace(/[\r\n," "]/g, "");
                
                Dao.saveCongressistas(model); //Salva o modelo de congressista criado para ser usado como paramentro de busca
            }
        },

        getParlamentarByHashTag : (posicao) => {
            
            Congressista.find( (err, data) => {

                console.log("Posição: "+posicao); //Linha utilizada pelo desenvolvedor para ver se esta pegando possicoes validas
                console.log("Congressista "+posicao+ " : "+data[posicao]);//Linha utilizada pelo desenvolvedor para teste

                var nome = data[posicao].nome;
                var hashTag = "#" + nome; 
                var arroba = "@" + nome;      
                
                console.log("Busca: "+hashTag); //Mostrar se a # foi criada corretamente

                //Faz a busca pelo tweet utilizando o # com o nome do congressistas
                client.get('search/tweets', {"q" : hashTag }, (error, tweet, response) => { tratarRetornoApi(error, tweet, response); });

                //Faz a busca pelo tweet utilizando o @ com o nome do congressistas
                client.get('search/tweets', {"q" : arroba }, (error, tweet, response) => { tratarRetornoApi(error, tweet, response); });

                //Faz a busca pelo tweet utilizando o nome do congressistas
                client.get('search/tweets', {"q" : nome }, (error, tweet, response) => { tratarRetornoApi(error, tweet, response); });

                function tratarRetornoApi(error, tweet, response){
                    if(tweet.statuses != null || tweet.statuses != undefined){ //Testa para ver se encontrou algum tweet
                        console.log("Texto do tweet: " + tweet.statuses[0]); //Mostra ao desenvolvedor o tweet encontrado
                        console.log("Número de tweets: "+ tweet.statuses.length); //Mostra o numero de tweets o qual o nome do congressista apareceu

                        if(tweet.statuses.length !== 0) { //Testa se o numero de tweets encontrado daquele congressista e diferente de 0

                            for (var i = 0; i < tweet.statuses.length; i++) { //Percorre a lista de tweets vendo os estados dele

                                if(error){ console.log(error); } //Caso ocorra o erro, exibe ao desenvolvedor o erro encontrado

                                console.log("Texto do tweet: "  + tweet.statuses[i].text); //Exibe ao desenvolvedor o texto do tweet
                                console.log("Usuário do tweet " + tweet.statuses[i].user.name); //Exibe o nome do usuario que escreveu o tweet
                                console.log("Dados do usuário " + tweet.statuses[i].user); //Exibe os dados do escritor do tweet

                                var tweetObj        = new Tweet(); // cria um objeto tweet
                                tweetObj.texto      = tweet.statuses[i].text; //cria um objeto texto de tweet
                                tweetObj.internauta = tweet.statuses[i].user.name; //cria um objeto de nome do usuario que escreveu o tweet
                                tweetObj.hashTag    = hashTag; //Cria uma hastag que sera usada nas pesquisas
                                                        
                                Dao.saveTweets(tweetObj); //Salva o tweet encontrado na base de dados
                            }
                        }
                    }
			    }
            });            
        },

        getParlamentarByName : (posicao) => {
            
            Congressista.find( (err, data) => {

                console.log("Posição: "+posicao); //Linha utilizada pelo desenvolvedor para ver se esta pegando possicoes validas
                console.log("Congressista "+posicao+ " : "+data[posicao]);//Linha utilizada pelo desenvolvedor para teste

                var name = data[posicao].nome; //Adiciona # ao nome do congressista para ser usado na busca por tweets com o nome dele

                console.log("Busca: "+name); //Mostrar se a # foi criada corretamente

                client.get('search/tweets', {"q" : name }, (error, tweet, response) => { //Faz a busca pelo tweet utilizando o # com o nome do congressistas
                    if(tweet.statuses != null || tweet.statuses != undefined){ //Testa para ver se encontrou algum tweet
                        console.log("Texto do tweet: " +tweet.statuses[0]); //Mostra ao desenvolvedor o tweet encontrado
                        console.log("Número de tweets: "+ tweet.statuses.length); //Mostra o numero de tweets o qual o nome do congressista apareceu

                        if(tweet.statuses.length !== 0) { //Testa se o numero de tweets encontrado daquele congressista e diferente de 0

                            for (var i = 0; i < tweet.statuses.length; i++) { //Percorre a lista de tweets vendo os estados dele

                                if(error){ console.log(error); } //Caso ocorra o erro, exibe ao desenvolvedor o erro encontrado

                                console.log("Texto do tweet: "  + tweet.statuses[i].text); //Exibe ao desenvolvedor o texto do tweet
                                console.log("Usuário do tweet " + tweet.statuses[i].user.name); //Exibe o nome do usuario que escreveu o tweet
                                console.log("Dados do usuário " + tweet.statuses[i].user); //Exibe os dados do escritor do tweet

                                var tweetObj        = new Tweet(); // cria um objeto tweet
                                tweetObj.texto      = tweet.statuses[i].text; //cria um objeto texto de tweet
                                tweetObj.internauta = tweet.statuses[i].user.name; //cria um objeto de nome do usuario que escreveu o tweet
                                tweetObj.hashTag    = name; //Cria uma hastag que sera usada nas pesquisas
                                                        
                                Dao.saveTweets(tweetObj); //Salva o tweet encontrado na base de dados
                            }
                        }
                    }
                });
            });
            
        }
        
    }

    return TwitterService;
}

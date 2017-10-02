module.exports = (app) => {

    var Congressistas = app.models.congressistas; //Pega a lista de congressistas que se encontra em um arquivo texto dentro de: app/models/congressistas
    var Internautas   = app.models.internautas; //Pega os usuarios escritores de tweets que se encontra dentro de app/models/internautas
    var Tweet         = app.models.tweet;//pega os tweets para serem armazenados

    Dao = {
        saveCongressistas : (congressistas) => { //Funcao que recebe um congressista para ser amarzenado na base de dados
            Congressistas.find( { "nome" :  congressistas.nome }, (err, dados) => {//Procura pelo nome do congressista que foi recebido por parametro
                if(err) console.log(err);//Exibe ao desenvolvedor o erro caso ocorra um.
                return dados.length === 0 ? congressistas.save((err) => { console.log(err); }) : console.log("Congressista existente");
            }); 
        },
        saveTweets : (tweet) => {//Funcao que ira receber um tweet por parametro para realizar o save dele na base de dados.
            Tweet.find( {"texto" : tweet.texto}, (err, dados) => { //Procura o campos texto dentro da base de dados, e insere naquela coluna o texto do tweet que foi coletado
                if(err) console.log(err);//Exibe ao desenvolvedor o erro caso ocorra um.
                return dados.length === 0 ? tweet.save( (err) => { console.log(err); }) : console.log("Tweet existente");
            });
        }

    }
    return Dao;
}

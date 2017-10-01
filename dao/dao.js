module.exports = (app) => {

    var Congressistas = app.models.congressistas;
    var Internautas   = app.models.internautas;
    var Tweet         = app.models.tweet;

    Dao = {
        saveCongressistas : (congressistas) => {
            Congressistas.find( { "nome" :  congressistas.nome }, (err, dados) => {
                if(err) console.log(err);
                return dados.length === 0 ? congressistas.save((err) => { console.log(err); }) : console.log("Congressista existente");
            }); 
        },
        saveTweets : (tweet) => {
            Tweet.find( {"texto" : tweet.texto}, (err, dados) => {
                if(err) console.log(err);
                return dados.length === 0 ? tweet.save( (err) => { console.log(err); }) : console.log("Tweet existente");
            });
        }

    }
    return Dao;
}
module.exports = (app) => {

    var Congressistas = app.models.congressistas;
    var Internautas   = app.models.internautas;

    Dao = {
        saveCongressistas : function saveCongressistas(congressistas) {
            Congressistas.find( { "nome" :  congressistas.nome }, (err, dados) => {
                if(err) console.log(err);

                return dados != null ? congressistas.save((err) => { console.log(err); }) : console.log("Congressista já existe");
            }); 
        }
    }
    return Dao;
}
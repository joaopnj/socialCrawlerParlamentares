module.exports = (app) => { 
    
    const mongoose = require('mongoose');
    
    var MongoDbMiddleware = {
        connect : () => {
            mongoose.connect('mongodb://localhost/trabalhoBD', (err) => {
                if(err){ console.log('Erro ao conectar no mongodb '+err); }
            });
        }
    }
    
    return MongoDbMiddleware;
}
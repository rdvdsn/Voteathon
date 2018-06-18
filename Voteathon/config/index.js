var configValues = require('./config');


module.exports ={

    getDbConnectionString: function(){
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds219100.mlab.com:19100/nodetodosample';
    }

}
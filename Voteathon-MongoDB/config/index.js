var configValues = require('./config');

module.exports ={
    getDBConnectionString: function(){
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds247410.mlab.com:47410/mongodbtutorial`
    }
}
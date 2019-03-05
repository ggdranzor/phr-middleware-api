const reqRoute = require('./requestRoute');
const resRoute = require('./responseRoute');
const revRoute = require('./revokeRoute');
const querAllRoute = require('./queryallRoute');

module.exports = function (app){
    reqRoute(app);
    resRoute(app);
    revRoute(app);
    querAllRoute(app);

}
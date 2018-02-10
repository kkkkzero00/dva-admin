let path = require('path');
let fs = require('fs');

const mock = {};


fs.readdirSync(path.join(__dirname+'/mock')).forEach(function(file){
     Object.assign(mock, require('./mock/' + file))
})

export default mock;

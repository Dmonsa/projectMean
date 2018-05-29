
var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    nombre: String,
    location: String
    
});

module.exports = mongoose.model('Team',teamSchema);
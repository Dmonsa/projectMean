
var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    nombre: String,
    dateIn: Date,
    dateFn: Date,
    tool1: String,
    tool2: String,
    tool3: String,
    tool4: String
    
});

module.exports = mongoose.model('Project',projectSchema);
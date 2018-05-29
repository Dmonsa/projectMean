'use strict'
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var meetingSchema = Schema({
   
    id_project : { type: Schema.ObjectId, ref:'Project' },
    in_meet: String,
    date: Date,
    hour: String,
    description: String,
    link: String
    
});

module.exports = mongoose.model('Meeting',meetingSchema);
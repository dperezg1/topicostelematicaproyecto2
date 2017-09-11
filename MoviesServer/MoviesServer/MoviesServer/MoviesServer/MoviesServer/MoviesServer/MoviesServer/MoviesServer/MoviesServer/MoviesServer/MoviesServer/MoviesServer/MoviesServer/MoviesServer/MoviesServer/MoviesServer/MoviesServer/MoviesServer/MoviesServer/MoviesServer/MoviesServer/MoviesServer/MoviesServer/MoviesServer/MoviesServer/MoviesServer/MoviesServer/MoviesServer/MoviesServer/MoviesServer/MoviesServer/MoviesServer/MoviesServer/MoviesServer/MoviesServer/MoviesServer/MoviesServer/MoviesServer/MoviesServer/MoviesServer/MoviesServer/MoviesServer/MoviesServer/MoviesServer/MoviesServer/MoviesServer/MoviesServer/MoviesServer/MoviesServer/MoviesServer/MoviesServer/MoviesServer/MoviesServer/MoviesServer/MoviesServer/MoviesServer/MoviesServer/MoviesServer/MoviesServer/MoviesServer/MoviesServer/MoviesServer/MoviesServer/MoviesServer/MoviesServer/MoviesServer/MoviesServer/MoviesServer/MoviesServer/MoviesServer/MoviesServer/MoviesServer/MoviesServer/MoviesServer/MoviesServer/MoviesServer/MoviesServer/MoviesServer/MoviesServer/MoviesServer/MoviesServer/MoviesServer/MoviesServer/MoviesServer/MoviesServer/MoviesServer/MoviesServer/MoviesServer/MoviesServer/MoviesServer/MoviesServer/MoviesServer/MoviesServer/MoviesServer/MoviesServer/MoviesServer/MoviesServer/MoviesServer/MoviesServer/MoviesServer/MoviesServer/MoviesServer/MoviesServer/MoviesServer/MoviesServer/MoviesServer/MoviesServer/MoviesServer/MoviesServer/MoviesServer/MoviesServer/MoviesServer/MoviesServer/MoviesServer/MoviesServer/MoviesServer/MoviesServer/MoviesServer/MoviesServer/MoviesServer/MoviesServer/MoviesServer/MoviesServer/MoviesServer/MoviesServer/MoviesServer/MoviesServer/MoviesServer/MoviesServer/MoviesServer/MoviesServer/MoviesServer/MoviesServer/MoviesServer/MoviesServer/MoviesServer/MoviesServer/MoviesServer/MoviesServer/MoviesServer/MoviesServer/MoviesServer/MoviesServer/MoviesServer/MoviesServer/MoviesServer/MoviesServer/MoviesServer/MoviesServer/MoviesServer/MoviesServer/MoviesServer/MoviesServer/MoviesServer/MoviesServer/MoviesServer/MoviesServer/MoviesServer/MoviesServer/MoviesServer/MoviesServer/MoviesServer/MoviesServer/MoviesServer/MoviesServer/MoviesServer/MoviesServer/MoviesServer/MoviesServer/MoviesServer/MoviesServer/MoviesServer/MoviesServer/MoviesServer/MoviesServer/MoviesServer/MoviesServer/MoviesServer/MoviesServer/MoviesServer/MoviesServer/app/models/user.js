/**
 * Created by USER on 27/07/2017.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String
},{collection:'User'});
module.exports = mongoose.model('User', userSchema);
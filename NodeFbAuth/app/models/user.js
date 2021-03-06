var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local : {
        email: String,
        password: String,
        name: String,
        profilePicture: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        profilePicture: String
    }
});

userSchema.methods.generateHash = function(password){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt, null);
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
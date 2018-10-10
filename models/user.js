const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true 
    },
    lastName: {
        type: String,
        required: true,
        trim: true 
    },
    password: {
        type: String,
        required:true
    }
});
//user authenticate method
UserSchema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email })
        .exec(function(error, user) {
            if (error) {
                return callback(error);
            } else if (!user) {
                var err = new Error('Kullanıcı Bulunamadı');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function(error, result) {
                if (result === true) {
                    return callback(null, user);
                } else {
                    return callback()
                }
            })
        })
}
//encrypt password
UserSchema.pre('save', function (next) {
    var user = this; 
    bcrypt.hash(user.password, 7, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
})
var User = mongoose.model('User', UserSchema);
module.exports = User; 
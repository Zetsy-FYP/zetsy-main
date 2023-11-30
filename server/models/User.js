const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userUid: String,
    stores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Store',
        },
    ],
});

module.exports = mongoose.model('User', UserSchema);
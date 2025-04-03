const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    idrole: { 
        _idrole: { type: String, required: true },
        role: { type: String, required: true }
    },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    password: { type: String, required: true },
    adresse: { type: String, required: true },

}, { timestamps: true });


UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



module.exports = mongoose.model('User', UserSchema);
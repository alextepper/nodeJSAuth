const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter a First Name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter a Last Name']
    },
    username: {
        type: String,
        required: [true, 'Please enter a Username'],
        unique: true,
        lowercase: true,
        minlength: [3, 'Minimum Username length is 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter an Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a Password'],
        minlength: [6, 'Minimum Password length is 6 characters']
    },
    userpic: {
        type: String,
        default: 'https://i0.wp.com/www.stignatius.co.uk/wp-content/uploads/2020/10/default-user-icon.jpg?fit=415%2C415&ssl=1' // Replace with your default pic path or URL
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});


userSchema.post('save', function (doc, next){
    console.log('New user was created and saved', doc);
    next();
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password')
    } 
    throw Error('Incorrect email')
}


userSchema.index({ username: 'text' });


const User = mongoose.model('user', userSchema)

module.exports = User;
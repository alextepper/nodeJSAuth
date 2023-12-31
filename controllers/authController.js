const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Handel errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };


    if (err.message.includes('Please enter a valid email')) {
        errors.email = 'Please enter a valid email'
    }

    if (err.message.includes('Incorrect')) {
        errors.email = 'Wrong Email or Password'
        errors.password = 'Wrong Email or Password'
    }

    if (err.code == 11000 && err.message.includes('username')) {
        errors.username = 'That username is already taken'
    }

    if (err.code == 11000 && err.message.includes('email')) {
        errors.email = 'That Email is already taken'
    }

    if (err.message.includes(' Minimum Password length')) {
        errors.password = 'The password is less than 6 characters'
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors

}

maxAge = 1000 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, 'some secret', {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body;

    try {
        const user = await User.create({ email, password, firstName, lastName, username });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 3 })
        res.status(201).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        const users = User.find();
        console.log(users);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 3 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}
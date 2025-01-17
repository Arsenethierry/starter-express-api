const jwt = require('jsonwebtoken');


const genAuthToken = (user) => {
    const secretKey =  `jwtkey111`

    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, secretKey)
    return token;
}

module.exports = genAuthToken;
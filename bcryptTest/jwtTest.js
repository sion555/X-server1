const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || '35W+n+7*';
const token = jwt.sign(
    {
        id: 'sion',
        rol: true
    },
    secret,
    { expiresIn: 60 * 60 * 24 * 1 } // 하루 시간
);
console.log(token);
jwt.verify(token, secret, (error, decoded) => {
    console.log(decoded);
});

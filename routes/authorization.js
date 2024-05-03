const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;


const isAuth = async (req, res, next) => {
    const auth = req.get('Authorization');
    if (!(auth && auth.startsWith("Bearer "))) {
        res.json({ success: false, message: "Auth error" })
    }
    const token = auth.split(' ')[1]; // 1번째가 토큰
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            res.json({ success: false, message: "Auth error" })
        } else {
            req.userID = decoded.uid;
            req.role = decoded.rol;
            console.log(req)
            next(); // 미들웨어니까 next() 호출 - 제어권 넘김
            // res.json({ success: true, message: "JWT 유효성 검증 성공 ~ !" })
            // 응답을 보내주면 여기서 함수가 종료되기 때문에 next 호출
        }
    })
};


module.exports = isAuth;
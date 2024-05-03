const express = require('express');
const { User } = require('../models/index'); 
// 경로에서 index는 생략 가능함 => db를 반환하고, db에는 User가 들어있기 때문
const router = express.Router();

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET;

const bcrypt = require('bcrypt');
const createHash = async (password, saltRound) => {
    // saltRound는 반복 횟수
    let hashed = await bcrypt.hash(password, saltRound)
    console.log(hashed); // 잘 hash되었는지 확인용으로
    return hashed;
}

router.post('/sign-up', async (req, res) => {
    const member = req.body; // req.body를 바로 써도 되지만 semantic하게 알아보기 위해 할당
    member.password = await createHash(member.password, 10);
    try {
        const result = await User.create(member);
        res.json({ success: true, member: result, message: '멤버 추가 성공'});
    } catch (err) {
        res.json({ success: false, member: [], message: err.message });
    }
});


router.post('/sign-in', async (req, res) => {
    const { userID, password } = req.body;
    const options = {
        attributes: ['password'],
        where: { userID: userID }
    }
    const result = await User.findOne(options);
    // password, result.password
    if (result) {
        const compared = await bcrypt.compare(password, result.password);
        if (compared) {
            const token = jwt.sign({ uid: userID, rol: 'admin' }, secret);
            res.json({
                success: true,
                token: token,
                message: '로그인에 성공했습니다.....'
            });
        } else {
            res.json({ success: false, member: [], message: 
            '비밀번호가 틀려요 ~ !' });
        }
    } else {
        res.json({ success: false, member: [], message: '그런 아이디는 없어요' });
    }
});



module.exports = router;
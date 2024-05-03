// const sync = require('./models/sync');
// sync();

// models의 스키마 내용을 변경했다면 ex) password의 타입을 바꿨다거나.. 하면
// 위 코드를 다시 실행시켜야 함

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3003;
const app = express('express');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const checkAuth = require('./routes/authorization');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/posts', checkAuth);   // 순서 주의, checkAuth가 먼저여야 함
app.use('/posts', postRouter);
app.use('/member', authRouter);


app.listen(port, () => {
    console.log(`Server가 ${ port } 에서 신나게 동작 중.. ...`)
});

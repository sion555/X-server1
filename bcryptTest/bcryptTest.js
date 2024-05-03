const bcrypt = require('bcrypt');
const password = '12345678';
const saltRound = 10;

let hashed = bcrypt.hashSync(password, saltRound);
console.log(`password: ${ password }, hashed: ${ hashed }}`);

const result = bcrypt.compareSync(password, hashed);
console.log(`password is same: ${ result }`);

const falsePassword = '1234'
const falseResult = bcrypt.compareSync(falsePassword, hashed);
console.log(`password is same: ${ falseResult }`);


// 비동기로 실행한다면 Sync를 빼고 작성
const asyncFunc = async () => {
    
    let hashed = await bcrypt.hash(password, saltRound);
    console.log(`password: ${ password }, hashed: ${ hashed }}`);

    const result = await bcrypt.compare(password, hashed);
    console.log(`password is same: ${ result }`);

}

asyncFunc()
const express = require('express');
const { User, Post } = require('../models/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

router.post('/', async (req, res) => {
    const newPost = req.body;
    newPost.userID = req.userID;
    try {
        const result = await Post.create(newPost);
        res.json({ success: true, documents: result, message: 'post 등록 성공 ~ !' });
    } catch (error) {
        res.json({ success: false, documents: [], message: 'post 등록 실패 ~ !' });
    }
});

router.get('/', async (req, res) => {
    const result = await Post.findAll() 
    res.json({ success: true, documents: result, message: 'post 조회 성공 ~ !' });
});


module.exports = router;
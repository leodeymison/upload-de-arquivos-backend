const routers = require('express').Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const Post = require('./models/Post')

routers.get('/', (req,res) => {
    res.render('front/index.ejs')
})
routers.get('/posts', async (req,res) => {
    const posts = await Post.find();

    return res.json(posts)
})


routers.post('/posts', multer(multerConfig).single('file'), async (req,res) => {
    const { originalname: name, size, key, location: url = ""} = req.file

    const post = await Post.create({
        name,
        size,
        key,
        url,
    })
    return res.json(post)
})


routers.delete('/posts/delete/:id', async (req,res) => {
    const id = req.params.id
    const post = await Post.findById(id)
    await post.remove();

    return res.send()
})

module.exports = routers
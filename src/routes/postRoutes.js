const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const upload = require('../config/multer')

router.get('/', postController.list)
router.get('/posts/new', postController.showCreate)
router.post('/posts', upload.single('image'), postController.create)
router.get('/posts/:id/edit', postController.showEdit)
router.post('/posts/:id', upload.single('image'), postController.update)
router.post('/posts/:id/delete', postController.delete)

module.exports = router

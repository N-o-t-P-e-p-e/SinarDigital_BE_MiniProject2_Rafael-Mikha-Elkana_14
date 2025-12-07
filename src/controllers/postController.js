const prisma = require('../utils/prismaClient')
const path = require('path')
const fs = require('fs')

exports.list = async (req, res) => {
  const posts = await prisma.post.findMany({ include: { user: true }, orderBy: { createdAt: 'desc' } })
  res.render('posts/index', { posts })
}

exports.showCreate = async (req, res) => {
  const users = await prisma.user.findMany()
  res.render('posts/create', { users })
}

exports.create = async (req, res) => {
  const { title, content, userId } = req.body
  const image = req.file ? req.file.filename : null
  await prisma.post.create({
    data: { title, content, image, userId: Number(userId) }
  })
  res.redirect('/')
}

exports.showEdit = async (req, res) => {
  const id = Number(req.params.id)
  const post = await prisma.post.findUnique({ where: { id }, include: { user: true } })
  const users = await prisma.user.findMany()
  res.render('posts/edit', { post, users })
}

exports.update = async (req, res) => {
  const id = Number(req.params.id)
  const { title, content, userId } = req.body
  const post = await prisma.post.findUnique({ where: { id } })
  let image = post.image
  if (req.file) {
    if (post.image) {
      const old = path.join(__dirname, '..', '..', 'uploads', post.image)
      try { fs.unlinkSync(old) } catch (e) {}
    }
    image = req.file.filename
  }
  await prisma.post.update({
    where: { id },
    data: { title, content, image, userId: Number(userId) }
  })
  res.redirect('/')
}

exports.delete = async (req, res) => {
  const id = Number(req.params.id)
  const post = await prisma.post.findUnique({ where: { id } })
  if (post && post.image) {
    const file = path.join(__dirname, '..', '..', 'uploads', post.image)
    try { fs.unlinkSync(file) } catch (e) {}
  }
  await prisma.post.delete({ where: { id } })
  res.redirect('/')
}

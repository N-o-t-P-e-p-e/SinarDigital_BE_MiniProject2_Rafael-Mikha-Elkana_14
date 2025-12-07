const express = require('express')
const path = require('path')
const app = express()
const postRoutes = require('./src/routes/postRoutes')
const prisma = require('./src/utils/prismaClient')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', postRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server started on port', PORT)
})

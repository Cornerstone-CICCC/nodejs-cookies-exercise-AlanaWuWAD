import express from 'express'
import path from 'path'
import pageRouter from './routes/page.routes'
import dotenv from 'dotenv'
dotenv.config()

//create server
const app = express()

//MW
// app.use(cookieParser(process.env.COOKIE_SECRET_KEY))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../src/views'))
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use('/', pageRouter)

// 404
app.use((req, res)=>{
    res.status(404).render('404')
})

//start server
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is ${PORT}`)
})
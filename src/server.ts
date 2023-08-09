import express from 'express'
import userRouter from './routes/users'

const server = express()

server.use(express.json())
server.use(userRouter)

export default server
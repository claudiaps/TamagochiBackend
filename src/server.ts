import express from 'express'
import userRouter from './routes/users'
import petRouter from './routes/pets'

const server = express()

server.use(express.json())
server.use(userRouter)
server.use(petRouter)

export default server
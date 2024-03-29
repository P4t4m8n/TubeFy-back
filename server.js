import express from 'express'
import cors from 'cors'
import path, { dirname } from 'path'
import http from 'http'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve( 'public')))
} else {
    const corsOptions = {
        origin: [
            'http://127.0.0.1:5173',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://127.0.0.1:8080',
            'http://localhost:8080',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}


//Routes
import { authRoutes } from './api/auth/auth.routes.js'
app.use('/api/auth', authRoutes)

import { userRoutes } from './api/user/user.routes.js'
app.use('/api/user', userRoutes)

import { stationRoutes } from './api/station/station.routes.js'
app.use('/api/station', stationRoutes)

import { setupSocketAPI } from './services/socket.service.js'

setupSocketAPI(server)

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030

import { loggerService } from './services/logger.service.js'
server.listen(port, () => {
    loggerService.info('Server is running on port: ' + port)
})
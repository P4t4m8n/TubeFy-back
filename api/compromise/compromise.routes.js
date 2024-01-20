import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getAnalyzeText } from './compromise.controller.js'


export const compromiseRoutes = express.Router()

compromiseRoutes.post('/analyze-text', getAnalyzeText)

import { loggerService } from "../../services/logger.service.js"
import { analyzeText } from "./compromise.service.js"


export async function getAnalyzeText(req, res) {
    console.log("req:", req)
    console.log("res:", res)
    const { text } = req.body
    console.log("text:", text)
    try {
        return analyzeText(text)
    } catch {

        loggerService.error('Failed to get songs', err)
        res.status(500).send({ err: 'Failed to get songs' })
    }
}
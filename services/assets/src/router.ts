import express from "express"
import { blogRouter } from "./blog/router"

const router = express.Router()

router.use('/blog', blogRouter)

export { router as apiRouter }
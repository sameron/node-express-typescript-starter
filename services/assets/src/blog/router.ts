import {
    addBlog,
} from './api'

import express from 'express'
const router = express.Router()

router.post('', addBlog)

export { router as blogRouter }


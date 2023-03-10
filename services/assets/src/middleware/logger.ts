import { format } from 'date-fns'
import type { Request, Response } from 'express'

import { CORRELATION_ID } from './correlationId'

export function requestLogger(req: Request, _: Response, next: () => void) {
  const correlationId = (req.headers[CORRELATION_ID] ?? '') as string
  console.info(
    `\n------------------------------------------\n${getCurrentDateTime()} :: RECEIVED_REQUEST :: ${correlationId} :: [${
      req.method
    }] ${req.url}, body=${JSON.stringify(req.body)}, headers=${JSON.stringify(
      req.headers
    )}`
  )
  next()
}

export function getCurrentDateTime() {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS")
}

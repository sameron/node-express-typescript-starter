import type { Request, Response } from 'express'

import { CORRELATION_ID } from '../middleware/correlationId'
import { getCurrentDateTime } from '../middleware/logger'
import { parseObject } from './bigIntUtil'

export function logRequest(req: Request) {
  const correlationId = (req.headers[CORRELATION_ID] ?? '') as string
  console.info(
    `\n------------------------------------------\n${getCurrentDateTime()} :: RECEIVED_REQUEST :: ${correlationId} :: [${
      req.method
    }] ${req.url}, body=${JSON.stringify(req.body)}, headers=${JSON.stringify(
      req.headers
    )}`
  )
}

export function returnResponse({ res, status, body }: RESPONSE_SCHEMA) {
  const resBody = formatResponseBody(body)
  logResponse({ res, resBody })
  return res.status(status).json(resBody)
}

function formatResponseBody(body: any) {
  return parseObject(body)
}

export function logResponse({ res, resBody }: { res: Response; resBody: any }) {
  const correlationId = (res.req.headers[CORRELATION_ID] ?? '') as string
  console.info(
    `${getCurrentDateTime()} :: RETURNED_RESPONSE :: ${correlationId} :: [${
      res.req.method
    }] ${res.req.baseUrl}${res.req.url}, body=${JSON.stringify(
      resBody
    )}\n------------------------------------------`
  )
}

type RESPONSE_SCHEMA = {
  res: Response
  status: number
  body: Partial<RESPONSE_BODY_SCHEMA>
}

type RESPONSE_BODY_SCHEMA = {
  message: string
  data: any
  error: any
}

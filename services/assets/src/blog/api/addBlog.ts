import type { Request, Response } from 'express'
import { ADD_BLOG_REQUEST_BODY } from '../schema'
import { prisma } from '../../util/prismaUtil'
import Joi from 'joi'
import { returnResponse } from '../../util/requestResponseUtil'

export async function addBlog(req: Request | any, res: Response) {
  try {
    // ------------------------------------------------------------------
    // Validating the request and extracting the required parameters
    // ------------------------------------------------------------------
    console.debug(
      'Validating the request and extracting the required parameters'
    )

    const requestBody: ADD_BLOG_REQUEST_BODY = req.body
    const { error, value } = isRequestValid(requestBody)

    if (error) {
      console.error('Invalid request. Request body is invalid')
      return returnResponse({
        res,
        status: 400,
        body: { message: 'Invalid request body', error: error.details },
      })
    }

    // ------------------------------------------------------------------
    // Add blog in the DB
    // ------------------------------------------------------------------

    const blog: any = await addBlogInDB(value)
    // ------------------------------------------------------------------
    // Return success response
    // ------------------------------------------------------------------
    console.info('Returning success response')
    return returnResponse({
      res,
      status: 201,
      body: { message: 'Added the blog successfully', data: blog },
    })
  } catch (error) {
    // ------------------------------------------------------------------
    // Return error response
    // ------------------------------------------------------------------
    console.error('Error occurred while adding the blog', error)
    return returnResponse({
      res,
      status: 500,
      body: { message: 'Something went wrong! Unable to add the blog', error },
    })
  }
}

/* Checks whether request is valid or not */

function isRequestValid(data: ADD_BLOG_REQUEST_BODY) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    content: Joi.string().min(3).max(40000).required(),
    cover: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
  })

  return schema.validate(data, { abortEarly: false })
}

/* Adds the blog in the DB   */
function addBlogInDB(value: any) {
  return prisma.blog.create({
    data: value,
  })
}

import admin from 'firebase-admin'
import { db } from '../index'
import { Response, NextFunction } from 'express'
import { IAuthedRequest } from '../types'

const auth = (...permittedRoles: string[]) => {
  return async (request: IAuthedRequest, response: Response, next: NextFunction): Promise<void | Response<Error>> => {
    try {
      let idToken
      if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
        idToken = request.headers.authorization.split('Bearer ')[1]
      } else {
        console.error('No token found')
        throw new Error('Unauthorized')
      }

      const decodedToken = await admin.auth().verifyIdToken(idToken)

      request.user = decodedToken

      const data = await db.collection('users').where('userId', '==', request.user.uid).limit(1).get()

      if (!data.docs.length) {
        if (permittedRoles.length) {
          throw new Error('Insufficient user role')
        }
      } else {
        const userData = data.docs[0].data()

        if (permittedRoles.length) {
          const permissonIntersection = permittedRoles.filter((role) => userData.roles.includes(role))
          if (!permissonIntersection.length) {
            throw new Error('Insufficient user role')
          }
        }
        request.user.email = userData.email
        request.user.imageUrl = userData.imageUrl
      }

      next()
    } catch (err) {
      console.error('Error while verifying token', err)
      return response.status(403).json(err)
    }
  }
}

export default auth

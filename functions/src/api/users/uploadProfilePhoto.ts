import admin from 'firebase-admin'
import BusBoy from 'busboy'
import path from 'path'
import os from 'os'
import fs from 'fs'
import { Response } from 'express'
import { IGetUserAuthInfoRequest } from '../../types'
import config from '../../config/firebaseConfig'

import { db } from '../../util/admin'
import { deleteImage } from './deleteImage'

const uploadProfilePhoto = async (
  request: IGetUserAuthInfoRequest,
  response: Response
): Promise<void | Response<Error>> => {
  try {
    const busboy = new BusBoy({ headers: request.headers })

    let imageFileName: string
    let imageMimeType: string
    let imageFilePath: string

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
        return response.status(400).json({ error: 'Wrong file type submited' })
      }
      const imageExtension = filename.split('.')[filename.split('.').length - 1]
      imageFileName = `${request.user?.username}.${imageExtension}`

      const filePath = path.join(os.tmpdir(), imageFileName)
      imageFilePath = filePath
      imageMimeType = mimetype
      file.pipe(fs.createWriteStream(filePath))
    })

    busboy.on('finish', async () => {
      try {
        await admin
          .storage()
          .bucket()
          .upload(imageFilePath, {
            resumable: false,
            metadata: {
              metadata: {
                contentType: imageMimeType,
              },
            },
          })

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`

        await db.doc(`/users/${request.user?.username}`).update({
          imageUrl,
        })

        await deleteImage(imageFileName)

        return response.json({ message: 'Image uploaded successfully' })
      } catch (error) {
        console.error(error)
        return response.status(500).json({ error: error.code })
      }
    })

    busboy.end(request.rawBody)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ general: 'Something went wrong, please try again' })
  }
}

export default uploadProfilePhoto

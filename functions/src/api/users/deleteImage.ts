import admin from 'firebase-admin'

export const deleteImage = async (imageName: string): Promise<undefined> => {
  try {
    const bucket = admin.storage().bucket()
    const path = `${imageName}`
    await bucket.file(path).delete()
  } catch (error) {
    return
  }
}

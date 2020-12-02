import * as functions from 'firebase-functions'

import express from 'express'

import loginUser from './api/users/loginUser'
import signUpUser from './api/users/signUpUser'
import uploadProfilePhoto from './api/users/uploadProfilePhoto'
import getAllCountries from './api/country'

import auth from './util/auth'

const app = express()

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.get('/countries', getAllCountries)
app.post('/user/image', auth, uploadProfilePhoto)

exports.api = functions.region('europe-west1').https.onRequest(app)

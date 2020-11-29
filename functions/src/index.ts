import * as functions from 'firebase-functions'

import express from 'express'

import loginUser from './api/users/loginUser'
import signUpUser from './api/users/signUpUser'
import getAllCountries from './api/country'
import getDragonList from './api/dragonlist'

const app = express()

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.get('/dragonlistX', getDragonList)
app.get('/countries', getAllCountries)

exports.api = functions.region('europe-west1').https.onRequest(app)

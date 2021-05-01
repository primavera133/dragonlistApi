import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import firebase from 'firebase'
import express from 'express'

import deleteUser from './api/users/deleteUser'
import getUserDetails from './api/users/getUserDetails'
import loginUser from './api/users/login'
import postUser from './api/users/postUser'
import putUser from './api/users/putUser'
// import signUpUser from './api/users/signUpUser'
import updateUserDetails from './api/users/updateUserDetails'
import uploadProfilePhoto from './api/users/uploadProfilePhoto'

import getAllCountries from './api/country/getAllCountries'
import getCountry from './api/country/getCountry'
import getCountryObservations from './api/country/getCountryObservations'
import getCountryUserObservations from './api/country/getCountryUserObservations'
import getCountryRegionUserObservations from './api/country/getCountryRegionUserObservations'

import getAllSpecies from './api/specie/getAllSpecies'
import getHighscores from './api/highscores/getHighscores'

import getAllObservations from './api/observations/getAllObservations'
import getUserObservations from './api/observations/getUserObservations'
import getObservation from './api/observations/getObservation'
import postObservation from './api/observations/postObservation'
import putObservation from './api/observations/putObservation'
import deleteUserObservation from './api/observations/deleteUserObservation'

import auth from './util/auth'
import config from './config/firebaseConfig'
import getAllMembers from './api/member/getAllMembers'

import { logActivities } from './logActivities'
import { incrementTotals, decrementTotals } from './calculateHighscores'
import getUserTotals from './api/totals/getUserTotals'

admin.initializeApp(config)
firebase.initializeApp(config)
export const db = admin.firestore()

const app = express()
const router = express.Router()

app.post('/api/login', loginUser)
// app.post('/api/signup', signUpUser)
app.post('/api/user/image', auth(), uploadProfilePhoto)
app.get('/api/user', auth(), getUserDetails)
app.post('/api/user', auth(), postUser)
app.put('/api/user', auth(), putUser)
app.put('/api/user', auth(), updateUserDetails)
app.delete('/api/user/:email', auth('admin'), deleteUser)

app.get('/api/countries', getAllCountries)
app.get('/api/country/:countryId', getCountry)
app.get('/api/country/:countryId/observations', getCountryObservations)
app.get('/api/country/:countryId/user/:email/observations', getCountryUserObservations)
app.get('/api/country/:countryId/region/:regionId/user/:email/observations', getCountryRegionUserObservations)

app.get('/api/species', getAllSpecies)
app.get('/api/highscores', getHighscores)

app.get('/api/observations', auth('admin'), getAllObservations)
app.get('/api/observations/user/:email', auth(), getUserObservations)
app.get('/api/observation/:observationId', auth(), getObservation)
app.put('/api/observation/:observationId', auth(), putObservation)
app.delete('/api/observation/:observationId', auth(), deleteUserObservation)
app.post('/api/observation', auth(), postObservation)

app.get('/api/totals/user/:email', auth(), getUserTotals)

app.get('/api/members', auth(), getAllMembers)

app.use('/dragonlistapi', router)

exports.dragonlistapi = functions.region('us-central1').https.onRequest(app)

exports.logActivities = logActivities

exports.incrementTotals = incrementTotals
exports.decrementTotals = decrementTotals

import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import firebase from 'firebase'
import express from 'express'

import deleteUser from './api/users/deleteUser'
import getUserDetails from './api/users/getUserDetails'
import loginUser from './api/users/login'
import postUser from './api/users/postUser'
import putUser from './api/users/putUser'
import signUpUser from './api/users/signUpUser'
import updateUserDetails from './api/users/updateUserDetails'
import uploadProfilePhoto from './api/users/uploadProfilePhoto'

import getAllCountries from './api/country/getAllCountries'
import getCountry from './api/country/getCountry'
import getCountrySightings from './api/country/getCountrySightings'
import getCountryUserSightings from './api/country/getCountryUserSightings'
import getCountryRegionUserSightings from './api/country/getCountryRegionUserSightings'

import getAllSpecies from './api/specie/getAllSpecies'

import getAllSightings from './api/sightings/getAllSightings'
// import getUserSightings from './api/sightings/getUserSightings'
import getSighting from './api/sightings/getSighting'
import postSighting from './api/sightings/postSighting'

import auth from './util/auth'
import config from './config/firebaseConfig'

admin.initializeApp(config)
firebase.initializeApp(config)
export const db = admin.firestore()

const app = express()
const router = express.Router()

app.post('/api/login', loginUser)
app.post('/api/signup', signUpUser)
app.post('/api/user/image', auth(), uploadProfilePhoto)
app.get('/api/user', auth(), getUserDetails)
app.post('/api/user', auth(), postUser)
app.put('/api/user', auth(), putUser)
app.put('/api/user', auth(), updateUserDetails)
app.delete('/api/user/:email', auth('admin'), deleteUser)

app.get('/api/countries', getAllCountries)
app.get('/api/country/:countryId', getCountry)
app.get('/api/country/:countryId/sightings', getCountrySightings)
app.get('/api/country/:countryId/user/:email/sightings', getCountryUserSightings)
app.get('/api/country/:countryId/region/:regionId/user/:email/sightings', getCountryRegionUserSightings)

app.get('/api/species', getAllSpecies)

app.get('/api/sightings', auth('admin'), getAllSightings)
// app.post('/api/sightings/user/:userId', auth(), getUserSightings)
app.get('/api/sighting/:sightingId', getSighting)
app.post('/api/sighting', auth(), postSighting)

app.use('/dragonlistapi', router)

exports.dragonlistapi = functions.region('us-central1').https.onRequest(app)
console.log('index.ts')

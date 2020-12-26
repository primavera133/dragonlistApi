import * as functions from 'firebase-functions'
import admin from 'firebase-admin'
import firebase from 'firebase'
import express from 'express'

import signUpUser from './api/users/signUpUser'
import postUser from './api/users/postUser'
import uploadProfilePhoto from './api/users/uploadProfilePhoto'
import getUserDetails from './api/users/getUserDetails'
import updateUserDetails from './api/users/updateUserDetails'
import deleteUser from './api/users/deleteUser'
import loginUser from './api/users/login'

import getAllCountries from './api/country/getAllCountries'
import getCountry from './api/country/getCountry'
import getCountrySightings from './api/country/getCountrySightings'
import getCountryUserSightings from './api/country/getCountryUserSightings'
import getCountryRegionUserSightings from './api/country/getCountryRegionUserSightings'

import getAllSpecies from './api/specie/getAllSpecies'

import getAllSightings from './api/sightings/getAllSightings'
import getSighting from './api/sightings/getSighting'
import postSighting from './api/sightings/postSighting'

import auth from './util/auth'
import config from './config/firebaseConfig'

admin.initializeApp(config)
firebase.initializeApp(config)
export const db = admin.firestore()

const app = express()

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth(), uploadProfilePhoto)
app.get('/user', auth(), getUserDetails)
app.post('/user', auth(), postUser)
app.put('/user', auth(), updateUserDetails)
app.delete('/user/:email', auth('admin'), deleteUser)

app.get('/countries', getAllCountries)
app.get('/country/:countryId', getCountry)
app.get('/country/:countryId/sightings', getCountrySightings)
app.get('/country/:countryId/user/:email/sightings', getCountryUserSightings)
app.get('/country/:countryId/region/:regionId/user/:email/sightings', getCountryRegionUserSightings)

app.get('/species', getAllSpecies)

app.get('/sightings', auth('admin'), getAllSightings)
app.get('/sighting/:sightingId', getSighting)
app.post('/sighting', auth(), postSighting)

exports.api = functions.region('europe-west1').https.onRequest(app)

import * as functions from 'firebase-functions'

import express from 'express'

import loginUser from './api/users/loginUser'
import signUpUser from './api/users/signUpUser'
import uploadProfilePhoto from './api/users/uploadProfilePhoto'
import getUserDetails from './api/users/getUserDetails'
import updateUserDetails from './api/users/updateUserDetails'
import deleteUser from './api/users/deleteUser'

import getAllCountries from './api/country/getAllCountries'
import getCountry from './api/country/getCountry'
import getCountrySightings from './api/country/getCountrySightings'
import getCountryUserSightings from './api/country/getCountryUserSightings'

import getAllSpecies from './api/specie/getAllSpecies'

import getAllSightings from './api/sightings/getAllSightings'

import auth from './util/auth'

const app = express()

app.post('/login', loginUser)
app.post('/signup', signUpUser)
app.post('/user/image', auth(), uploadProfilePhoto)
app.get('/user', auth(), getUserDetails)
app.put('/user', auth(), updateUserDetails)
app.delete('/user/:username', auth('admin'), deleteUser)

app.get('/countries', getAllCountries)
app.get('/country/:countryId', getCountry)
app.get('/country/:countryId/sightings', getCountrySightings)
app.get('/country/:countryId/user/:username/sightings', getCountryUserSightings)

app.get('/species', getAllSpecies)

app.get('/sightings', getAllSightings)

exports.api = functions.region('europe-west1').https.onRequest(app)

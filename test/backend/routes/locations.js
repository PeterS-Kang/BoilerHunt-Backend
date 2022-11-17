const router = require('express').Router()
let CurrentLocation = require('../models/location.model')

router.route('/').get((req, res) => {
    CurrentLocation.find()
        .then(currentLocations => res.json(currentLocations))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const completed = Boolean(req.body.completed)
    const latitude = Number(req.body.latitude)
    const longitude = Number(req.body.longitude)

    const newCurrentLocation = new CurrentLocation({
        name,
        completed, 
        latitude,
        longitude
    })

    newCurrentLocation.save()
    .then(() => res.json('Location added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    CurrentLocation.findByIdAndDelete(req.params.id)
    .then(() => res.json('Location Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    CurrentLocation.findById(req.params.id)
    .then(currentLocation => {
        currentLocation.name = req.body.name
        currentLocation.completed = req.body.completed
        currentLocation.latitude = req.body.latitude
        currentLocation.longitude = req.body.longitude

        currentLocation.save()
            .then(() => res.json('Location updated'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router
const router = require('express').Router()
let Location = require('../models/location.model')

router.route('/').get((req, res) => {
    Location.find()
        .then(locations => res.json(locations))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const name = req.body.name
    const completed = Boolean(req.body.completed)
    const latitude = Number(req.body.latitude)
    const longitude = Number(req.body.longitude)

    const newLocation = new Location({
        name,
        completed, 
        latitude,
        longitude
    })

    newLocation.save()
    .then(() => res.json('Location added!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Location.findByIdAndDelete(req.params.id)
    .then(() => res.json('Location Deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Location.findById(req.params.id)
    .then(location => {
        location.name = req.body.name
        location.completed = req.body.completed
        location.latitude = req.body.latitude
        location.longitude = req.body.longitude

        location.save()
            .then(() => res.json('Location updated'))
            .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
})
module.exports = router
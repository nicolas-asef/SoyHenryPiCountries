const axios = require('axios');
const { Router } = require('express');
const { getActivities } = require('../controllers/activitiesControllers');
const {Country, Actividad, Op} = require('../db')

const router = Router();

router.get ('/', async (req, res) => {
    try {
        const activities = await getActivities()
        res.send(activities)
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        let {nombre, dificultad, duracion, temporada, paises} = req.body
        let actividad = await Actividad.create({
            nombre,
            dificultad,
            duracion, 
            temporada
        })
        let countrydb = await Country.findAll({
            where : {name : paises}
        })
        console.log(countrydb)
        actividad.addCountry(countrydb)

        res.send("Creado correctamente")
    } catch (error) {
        res.send(error)
    }
})


module.exports = router
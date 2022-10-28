const { Router } = require('express');
const { getCountries, getCountriesByName } = require('../controllers/countriesControllers');
const {Country, Actividad, Op} = require('../db')

const router = Router();

router.get ('/', async (req, res) => {
    try {
        let {name} = req.query
        if (name){
            const countries = await getCountriesByName(name)
            res.send(countries)
        }else{
            const countries = await getCountries()
            res.send(countries)
        }
        } catch (error) {
            res.send(error)
        }
})

router.get ('/:id', async (req, res) => {
    try {
        let {id} = req.params
        let pais = await Country.findByPk(id.toUpperCase(), {include: [{model:Actividad}]})
        res.json(pais ? pais : "No hay paises encontrados")
    } catch (error) {
        res.send(error)
    }
})



module.exports = router
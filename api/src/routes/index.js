const axios = require('axios');
const { Router } = require('express');
const {Country, Op} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/', async (req, res) => {
//     const api = await axios.get('https://restcountries.com/v3/all')
//     const countries = api.data.map(country => {
//         let pais = {
//             id: country.cca3,
//             name: country.translations.spa.official,
//             bandera: country.flags[0],
//             contienente: country.continents[0],
//             capital: country.capital
//         }
//         return pais
//     })
//     res.send(countries)
// })

router.get ('/countries', async (req, res) => {
    try {
        let {name} = req.query
        if (name){
            let countries = await Country.findAll({
                where:{
                    name :{
                        [Op.iLike]: `%${name}%`
                    }
                }
            })
            res.json(countries.length > 0 ? countries : `No hay paises que contengan ${name}`)
        }else{
            let conuntries = await Country.findAll()
            res.json(conuntries.length > 0 ? conuntries : 'No hay paises cargados')
        }
    } catch (error) {
        res.send(error)
    }
})

router.get ('/countries/:id', async (req, res) => {
    try {
        let {id} = req.params
        let pais = await Country.findByPk(id.toUpperCase())
        res.json(pais ? pais : "No hay paises encontrados")
    } catch (error) {
        res.send(error)
    }
})



module.exports = router;

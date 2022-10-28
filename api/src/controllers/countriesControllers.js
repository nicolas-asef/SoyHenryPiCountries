const {Country, Actividad, Op} = require('../db')

const getCountries = async () => {
    try {
        let conuntries = await Country.findAll({include: [{model:Actividad}]})
        // let conuntries = await Country.findAll({include: [{model:Actividad, attributes:["nombre"]}]})
        if (conuntries.length > 0){
            return conuntries
        }
        else{
            return []
        }
    } catch (error) {
        return error
    }
}

const getCountriesByName = async (name) => {
    try {
        let countries = await Country.findAll({
            where:{
                name :{
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [{model: Actividad}]
        })
        if (countries.length > 0) return countries
        else return []
    } catch (error) {
        return error
    }
}

module.exports = {
    getCountries,
    getCountriesByName,
}
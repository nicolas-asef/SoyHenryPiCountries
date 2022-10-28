const axios = require('axios');
const {Country} = require('./db.js')

async function getApi (){
    const api = await axios.get('https://restcountries.com/v3/all')
    const countries = api.data.map(country => {
        if (country.capital && country.cca3 && country.name.common && country.flags[0] && country.region && country.languages && country.currencies){
            return{
                id: country.cca3,
                name: country.name.common,
                bandera: country.flags[0],
                continente: country.region,
                capital: country.capital[0],
                subRegion: country.subregion,
                area: country.area,
                poblacion: country.population,
            }
        }        
    })
    let filter = countries.filter(el => el !== undefined)
    console.log(Country)
    await Country.bulkCreate(filter);
}

module.exports = {getApi}
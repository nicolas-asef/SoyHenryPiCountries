const {Country, Actividad, Op} = require('../db')

const getActivities = async () => {
    try {
        let activities = await Actividad.findAll({include: [{model:Country}]})
        if (activities.length > 0) return activities
        else return []
    } catch (error) {
        return error
    }
}

module.exports = {
    getActivities,
}
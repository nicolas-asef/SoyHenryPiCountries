const { DataTypes } = require('sequelize');

module.exports = Sequelize => {
    Sequelize.define("Actividad", {
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificultad:{
            type: DataTypes.INTEGER,
            validate:{
                min: 1,
                max: 5
            }
        },
        duracion:{
            type: DataTypes.STRING
        },
        Temprada:{
            type: DataTypes.ENUM("Verano", "Otoño", "Invierno", "Primavera")
        }
    })
}
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bandera:{
      type: DataTypes.STRING,
      allowNull: false
    },
    continente:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false
    },
    subRegion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.STRING
    },
    poblacion:{
      type: DataTypes.STRING
    }

  },{
    timestamps : false
  });
};

import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class User extends Model {
  public id!: number;
  public nom!: string;
  public prenom!: string;
}

User.init(
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }
  },
  {
    sequelize, 
    modelName: 'User',
  }
);

export default User;
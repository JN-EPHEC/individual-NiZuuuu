import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Le fichier sera créé à la racine de ton projet
  logging: false, 
});

export default sequelize;
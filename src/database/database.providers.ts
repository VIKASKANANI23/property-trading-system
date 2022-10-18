import { Sequelize } from 'sequelize-typescript';
import { Property } from 'src/entities/property.entity';
import { Users } from 'src/entities/users.entity';
import { UserSessions } from 'src/entities/users.sessions.entity';

// import DatabaseSeeder from './seeder/index';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT || 0),
        password: String(process.env.DATABASE_PASSWORD),
        username: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE_NAME,
        logging: false,
        pool: {
          max: 100,
          min: 0,
          acquire: 30000,
          idle: 5000,
        },
      });

      sequelize.addModels([Users, UserSessions, Property]);

      await sequelize.sync({ force: false });

      // await sequelize
      //   .sync({ force: true })
      //   .then(async () => {
      //     return await DatabaseSeeder.run();
      //   })
      //   .then(() => {
      //     console.log('********** Successfully seeded db **********');
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     console.log('********** Error in database sedding **********');
      //   });

      return sequelize;
    },
  },
];

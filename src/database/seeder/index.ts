import { AdminsSeeder } from './admin';

class DatabaseSeeder {
  async run() {
    await AdminsSeeder.execute().then(() =>
      console.log('Admins added successfully!'),
    );

    return 'Done';
  }
}

export default new DatabaseSeeder();

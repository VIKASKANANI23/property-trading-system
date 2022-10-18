import { genSalt, hash } from 'bcrypt';
import { ROLE } from 'src/config';
import { Users } from '../../entities/users.entity';

export class AdminsSeeder {
  public static data = [
    {
      id: '5002174a-42a0-11ea-b77f-2e728ce88125',
      first_name: 'Super',
      last_name: 'Admin',
      email: 'admin@demo.com',
      password: 'Password@123',
      role: ROLE.ADMIN,
      phoneno: '+919876543210',
      is_active: true,
    },
  ];

  public static async execute() {
    for (const item of this.data) {
      try {
        const encPassword = await this.generateSaltAndHash(item.password);

        await Users.create({
          ...item,
          password_hash: encPassword.passwordHash,
        });
      } catch (e) {
        // console.log(e);
      }
    }
  }

  public static async generateSaltAndHash(userPassword: string) {
    const salt: string = (await this.generateSalt()) as string;
    /** Gives us salt of length 16 */
    const passwordHash: string = (await this.hash(
      userPassword,
      salt,
    )) as string;
    return {
      salt,
      passwordHash,
    };
  }

  public static generateSalt(round = 10): Promise<string | null> {
    return new Promise((resolve) => {
      genSalt(round, (err, salt) => {
        if (!err) {
          resolve(salt);
        } else {
          resolve('');
        }
      });
    });
  }

  public static hash(plainPassword: string, salt: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _reject) => {
      hash(plainPassword, salt, (_err, hash) => {
        if (hash) {
          resolve(hash);
        }
        resolve('');
      });
    });
  }
}

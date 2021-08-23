import bcrypt from 'bcryptjs';
import User from "models/user"
import IUser from 'interface/IUser';
import IToken from 'interface/IToken';
import jwt from 'jsonwebtoken';

export const login = async (nick: string, password: string) => {
  const user = await User.findOne({ where: { nick: nick}, raw : true })
  if(user !== null){
    const match = bcrypt.compareSync(password, (user as unknown as IUser).password)
    if(match) {
      const expiresIn = '15d'; // 15 Days
      console.log(user);
      const ACCESS_TOKEN = jwt.sign(user, process.env.SECRET_KEY || '', { expiresIn});
      const result: IToken = {
        token: ACCESS_TOKEN,
        expiresIn: expiresIn
      }
      return result;
    }
  }
  return null;
}
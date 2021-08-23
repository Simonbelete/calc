import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import sequelize from "lib/db";
import User from "models/user";
import IToken from "interface/IToken";
import IUserDto from "dto/IUserDto";
import IUser from "interface/IUser";

export const createUser = async (body: any): Promise<IToken | null> => {
  const expiresIn = "15d"; // 15 Days
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(body.password, salt);
  const user: IUserDto = {
    nick: body.nick,
    password: hash,
    firstName: body.firstName,
    lastName: body.lastName,
  };
  return await User.create(user)
    .then((data) => {
      const nu = data as unknown as IUser;
      const ACCESS_TOKEN = jwt.sign(
        {
          id: nu.id,
          firstName: nu.firstName,
          lastName: nu.lastName,
          nick: nu.nick,
        },
        process.env.SECRET_KEY || "",
        {
          expiresIn,
        }
      );
      const result: IToken = {
        token: ACCESS_TOKEN,
        expiresIn: expiresIn,
      };
      return result;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const getUser = async (token: any) => {
  const decoded: any = jwt.verify(
    token.replace(/\s/g, ""),
    process.env.SECRET_KEY || ""
  );
  const user = await User.findOne({ where: { id: decoded.id }, raw: true }); //await User.findByPk(decoded.id);
  console.log(user);
  return user;
};

export const updateUser = async (token: any, body: any) => {
  const decoded: any = jwt.verify(
    token.replace(/\s/g, ""),
    process.env.SECRET_KEY || ""
  );
  const user = await User.findByPk(Number(decoded.id));
  if (user !== null) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    let nv: any = {
      firstName: body.firstName,
      lastName: body.lastName,
      password: hash,
    };
    if (body.password === null || body.password.length === 0)
      delete nv.password;
    return await User.update(nv, { where: { id: decoded.id } });
  }
};

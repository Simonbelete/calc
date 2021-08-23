import IHistory from 'interface/IHistory';
import jwt from 'jsonwebtoken';
import History from 'models/history';
import User from 'models/user';

export const createHistory = async (token: any, body: any) => {
  const decoded: any = jwt.verify(token.replace(/\s/g, ''), process.env.SECRET_KEY || '');
  const history: IHistory = {
    expression: body.expression,
    result: body.result,
    UserId: decoded.id
  }
  History.create(history).then((data) => {
    return data;
  }).catch((error) => {
    console.log(error);
    return null;
  })
}

export const getHistories = async (token: any) => {
  const decoded: any = jwt.verify(token.replace(/\s/g, ''), process.env.SECRET_KEY || '');
  const histories = await History.findAll({ where: { UserId: decoded.id}, raw: true})
  return histories;
}
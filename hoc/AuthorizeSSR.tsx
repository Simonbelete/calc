import cookie from 'cookie';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

/**
 *
 * @param gssp function
 * @param redirect Weither to redirect to home page if loged in i.e for login page
 * @returns
 */
const AuthorizeSSR = (gssp: any, redirect: Boolean = false) => {
  return async (context: NextPageContext) => {
    const { req, res } = context;
    const cookies = cookie.parse(req?.headers.cookie || '');
    const ACESS_TOKEN = cookies.ACESS_TOKEN;
    if (ACESS_TOKEN === undefined && !redirect)
      return { redirect: { destination: '/', statusCode: 302 } };
    else if (ACESS_TOKEN !== undefined && redirect)
      return { redirect: { destination: '/home' } };
    else return await gssp(context);
  };
};

export default AuthorizeSSR;

import LoginForm from 'components/LoginForm'
import AuthorizeSSR from 'hoc/AuthorizeSSR';

const Login = () => {
  return (
    <div>
      <LoginForm />
    </div>
  )
}

export default Login;
export const getServerSideProps = AuthorizeSSR(() => {
  return { props: {} };
}, true);
import RegisterForm from 'components/RegisterForm';
import AuthorizeSSR from 'hoc/AuthorizeSSR';

const Register = () => {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}

export default Register;
export const getServerSideProps = AuthorizeSSR(() => {
  return { props: {} };
}, true);
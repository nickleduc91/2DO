import RegisterForm from "../components/Forms/registerForm";
import Header from "../components/header";
import Head from 'next/head'

const Register = () => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900">
      <Head>
        <title>Sign Up - TwoDue</title>
        <meta property="og:title" content="Sign Up - TwoDue"></meta>
        <meta
          name="description"
          content="Join TwoDue for free! Unlock the power of seamless task organization by creating your account. Sign up now to access a world of efficient task management."
        />
        <meta
          property="og:description"
          content="Join TwoDue for free! Unlock the power of seamless task organization by creating your account. Sign up now to access a world of efficient task management."
        />
        <meta
          property="og:url"
          content="https://twodue.vercel.app/register"
        ></meta>
      </Head>
      <Header user={{}} />
      <RegisterForm />
    </div>
  );
};

export default Register;

import LoginForm from "../components/Forms/loginForm";
import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Head from 'next/head'

const Login = ({ user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900">
      <Head>
        <title>Login - TwoDue</title>
        <meta property="og:title" content="Login - TwoDue"></meta>
        <meta
          name="description"
          content="Welcome back to TwoDue! Log in to your account and dive into efficient task management. Experience seamless access to boards, tasks, and productivity tools."
        />
        <meta
          property="og:description"
          content="Welcome back to TwoDue! Log in to your account and dive into efficient task management. Experience seamless access to boards, tasks, and productivity tools."
        />
        <meta
          property="og:url"
          content="https://twodue.vercel.app/login"
        ></meta>
      </Head>
      <Header user={user} />
      <LoginForm />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return {
      props: {
        user: session.user,
      },
      redirect: {
        destination: "/boards",
        permanent: false,
      },
    };
  }
  return {
    props: {
      user: {},
    },
  };
}

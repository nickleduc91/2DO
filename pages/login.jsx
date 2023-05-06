import LoginForm from "../components/Forms/loginForm";
import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Login = ({ user }) => {
  return (
    <div className="bg-white dark:bg-slate-900">
      <Header user={user} />
      <LoginForm />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    //fetch user
    const user = await fetch(`${process.env.URL}/api/users/${session.user.id}`);
    const userData = await user.json();
    return {
      props: {
        user: userData,
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

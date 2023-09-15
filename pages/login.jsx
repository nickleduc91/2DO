import LoginForm from "../components/Forms/loginForm";
import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Login = ({ user }) => {
  return (
    <div className="bg-gray-100 dark:bg-slate-900">
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

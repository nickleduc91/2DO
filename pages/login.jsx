import LoginForm from "../components/Forms/loginForm";
import Header from "../components/header";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Login = () => {
  return (
    <div className="bg-black">
      <Header />
      <LoginForm />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );
  if (session) {
    return {
      redirect: {
        destination: "/boards",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

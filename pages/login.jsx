import LoginForm from "../components/Forms/loginForm";
import Header from "../components/header";
import Footer from "../components/footer";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Login = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
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

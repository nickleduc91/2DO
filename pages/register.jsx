import Head from "next/head";
import RegisterForm from "../components/forms/registerForm";
import Header from "../components/header";
import Footer from "../components/footer";

const Register = () => {
  return (
    <div>
      <Header />
      <RegisterForm />
      <Footer />
    </div>
  );
};

export default Register;

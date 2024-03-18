// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

const Login = () => {
  //for signing in with google and to navigate to home
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();

  //for existing user to login with data
  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  let initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("6", "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email, password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input field");
    }
    console.log("formik", formik);
  };

  const formik = useFormik({ initialValues, validationSchema, handleSubmit });

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} />
        </div>
      ) : (
        <div className="grid grid-cols-1 h-screen justify-items-center items-center">
          <Card className="w-96">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                LOGIN
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <form name="autofill" onSubmit={handleSubmit}>
                <div className="mb-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    size="lg"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                <div>
                  {formik.touched.email && formik.errors.email && (
                    <Typography variant="small" color="red">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mt-4 mb-2">
                  <Input
                    name="password"
                    type="password"
                    label="Password"
                    size="lg"
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  {formik.touched.password && formik.errors.password && (
                    <Typography variant="small" color="red">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <Button
                  variant="gradient"
                  color="blue"
                  fullWidth
                  className="mb-4"
                  type="submit"
                >
                  Login
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                variant="gradient"
                color="blue"
                fullWidth
                className="mb-4"
                onClick={signInWithGoogle}
              >
                Sign In with Google
              </Button>
              <Link to="/reset">
                <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                  Reset your Password
                </p>
              </Link>
              <div className="mt-6 flex items-center font-roboto text-base justify-center">
                Dont have an account?
                <Link to="/register">
                  <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                    Register
                  </p>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default Login;

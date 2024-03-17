import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import axios from "axios";
import { validationSchema } from "./validationSchema";
import {
  FormGroup,
  Label,
  Input,
  Error,
  ButtonWrapper,
  Button,
} from "./RegisterLoginStyling";
import { useNavigate } from "react-router-dom";

const CommonAuthForm = ({ formType, setActiveTab, setToken }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    ...(formType === "register" && { name: "" }),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await validationSchema(formType).validate(inputs, { abortEarly: false });
      if (formType === "register") {
        const { name, email, password } = inputs;
        const body = { name, email, password };
        const response = await axios.post(
          "http://localhost:5000/register",
          body,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          toast.success("Registered Successfully");
          setInputs({
            email: "",
            password: "",
            name: "",
          });
          setActiveTab(1);
        }
      } else if (formType === "login") {
        const { email, password } = inputs;
        const body = { email, password };
        const response = await axios.post("http://localhost:5000/login", body, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          toast.success("Logged in Successfully");
          setInputs({
            email: "",
            password: "",
          });
          localStorage.setItem("token", response?.data?.token);
          setToken(response?.data?.token);
          navigate("/dashboard");
        }
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = {};
        err.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setValidationErrors(errors);
      } else if (
        err?.response?.status === 401 ||
        err?.response?.status === 500
      ) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  const renderInputs = () => (
    <>
      {formType === "register" && (
        <FormGroup>
          <Label htmlFor="name">User Name</Label>
          <Input
            data-qa="username-input"
            type="text"
            name="name"
            id="name"
            placeholder="Enter your user name"
            value={inputs.name}
            onChange={(e) => handleChange(e)}
          />
          {validationErrors.name && <Error>{validationErrors.name}</Error>}
        </FormGroup>
      )}
      <FormGroup>
        <Label htmlFor="email">Email ID</Label>
        <Input
          type="text"
          name="email"
          id="email"
          placeholder="Enter your email ID"
          value={inputs.email}
          onChange={(e) => handleChange(e)}
        />
        {validationErrors.email && <Error>{validationErrors.email}</Error>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Enter your password"
          value={inputs.password}
          onChange={(e) => handleChange(e)}
        />
        <div data-qa="showHidePassword" onClick={handleTogglePassword}>
          {showPassword ? "Hide" : "Show"} Password
        </div>
        {validationErrors.password && (
          <Error>{validationErrors.password}</Error>
        )}
      </FormGroup>
    </>
  );

  const renderButtons = () => (
    <ButtonWrapper>
      <Button type="submit" data-qa="RegisterLoginButton">
        {formType === "register" ? "Register" : "Login"}
      </Button>
      <p>
        {formType === "register"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          onClick={() => setActiveTab(formType === "register" ? 1 : 0)}
        >
          {formType === "register" ? "Login" : "Register"}
        </a>
      </p>
    </ButtonWrapper>
  );

  return {
    inputs,
    showPassword,
    validationErrors,
    handleChange,
    handleTogglePassword,
    onSubmitForm,
    renderInputs,
    renderButtons,
  };
};

export default CommonAuthForm;

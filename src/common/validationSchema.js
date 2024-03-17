import * as Yup from "yup";

const generateValidationSchema = (formType) => {
  if (formType === "register") {
    return Yup.object().shape({
      name: Yup.string().required("User name is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email ID is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });
  } else if (formType === "login") {
    return Yup.object().shape({
      email: Yup.string()
        .email("Invalid email")
        .required("Email ID is required"),
      password: Yup.string().required("Password is required"),
    });
  }
  return Yup.object().shape({});
};

export const validationSchema = (formType) =>
  generateValidationSchema(formType);

// Login.js

import React from "react";
import CommonAuthForm from "../common/CommonAuthForm";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
} from "../common/RegisterLoginStyling";

const Login = ({ setActiveTab, setToken }) => {
  const { renderInputs, renderButtons, onSubmitForm } = CommonAuthForm({
    formType: "login",
    setActiveTab,
    setToken,
  });

  return (
    <Container>
      <Card data-qa="card">
        <CardHeader data-qa="card-header">LOGIN FORM</CardHeader>
        <CardBody>
          <Form onSubmit={onSubmitForm}>
            {renderInputs()}
            {renderButtons()}
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Login;

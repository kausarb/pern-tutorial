import React from "react";
import CommonAuthForm from "../common/CommonAuthForm";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  Form,
} from "../common/RegisterLoginStyling";

const Register = ({ setActiveTab }) => {
  const { renderInputs, renderButtons, onSubmitForm } = CommonAuthForm({
    formType: "register",
    setActiveTab,
  });

  return (
    <Container>
      <Card>
        <CardHeader>REGISTRATION FORM</CardHeader>
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

export default Register;

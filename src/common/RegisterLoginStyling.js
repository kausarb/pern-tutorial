import styled from "styled-components";

export const Container = styled.div`
  margin-top: 2rem;
`;

export const Card = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const CardHeader = styled.div`
  background-color: #800080;
  color: #f5f5dc;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  text-align: center;
  font-weight: bold;
`;

export const CardBody = styled.div`
  padding: 1.5rem;
`;

export const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 16px;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #800080;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

export const Button = styled.button`
  background-color: #800080;
  color: #f5f5dc;
  width: 100%;
  padding: 0.375rem 0.75rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background-color: #aa336a;
  }
`;

export const Error = styled.span`
  color: red;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

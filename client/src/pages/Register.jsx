import { useContext, useState } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerInfo, updateRegisterInfo } = useContext(AuthContext);

  return (
    <Form>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10vh",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Register</h2>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) =>
                updateRegisterInfo({...registerInfo, username: e.target.value })
              }
            />
            <Form.Control type="text" placeholder="Instrument" onChange={(e) =>
                updateRegisterInfo({...registerInfo, instrument: e.target.value })
              }/>
            <Form.Control type="password" placeholder="Password" onChange={(e) =>
                updateRegisterInfo({...registerInfo, password: e.target.value })
              }/>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Alert variant="danger">Error</Alert>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;

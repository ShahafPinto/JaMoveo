import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const AdminRegister = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerError,
    registerAdminUser,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <Form onSubmit={registerAdminUser}>
      <Row
        style={{
          height: "100vh",
          justifyContent: "center",
          paddingTop: "10vh",
        }}
      >
        <Col xs={6}>
          <Stack gap={3}>
            <h2>Admin Register</h2>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  name: e.target.value,
                })
              }
            />
            <Form.Control
              type="text"
              placeholder="Instrument"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  instrument: e.target.value,
                })
              }
            />
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) =>
                updateRegisterInfo({
                  ...registerInfo,
                  password: e.target.value,
                  isAdmin: true,
                })
              }
            />
            <Button variant="primary" type="submit">
              {isRegisterLoading ? "Loading..." : "Register"}
            </Button>
            {registerError?.error && (
              <Alert variant="danger">
                <p>{registerError?.message}</p>
              </Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default AdminRegister;

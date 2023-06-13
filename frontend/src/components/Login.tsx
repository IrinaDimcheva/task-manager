import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from './FormContainer';

function Login() {

  return (
    <FormContainer>
      <Form>
        <h3>Login</h3>
        <Stack gap={4}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required />
          </Form.Group>
        </Stack>
        <Button className="mt-4 auto align-items-center" type="submit" variant="primary">
          Login
        </Button>
        <Row className='py-3 auto'>
          <Col className='text-align-center auto'>
            Not a member? <Link to={'/register'}>Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
}

export default Login;


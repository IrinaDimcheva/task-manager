import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

type Props = {
  children: React.JSX.Element;
}

const FormContainer = ({ children }: Props) => {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

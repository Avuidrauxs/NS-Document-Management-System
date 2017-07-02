import React from 'react';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';
import SignIn from './SignIn';
import Welcome from './Welcome';
import background from '../../images/background_spots_lines.jpg';


const sectionStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${background})`,
  position: 'absolute',
  left: '-10px',
  right: '-10px'
};

/**
 * Landing page component
 * this function returns a single React element ie. native DOM component
 * @return {React.Component} [A react componet element]
 */
const Landing = () => (
  <Container fluid style={sectionStyle}>
    <Row>
      <Col xs="12" md="8"><Welcome /></Col>
      <div className="custom-divider"><span /></div>
      <Col xs="6" md="4"><SignIn /></Col>
    </Row>
  </Container>


);

export default Landing;

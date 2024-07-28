import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Text } from '@aws-amplify/ui-react'
import { Button } from '@aws-amplify/ui-react';

function MainNavbar({user, signOut}) {

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">ChinoTech Sanboxes</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Text>{user?.signInDetails?.loginId}</Text>
        <Button onClick={signOut}>Sign out</Button>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
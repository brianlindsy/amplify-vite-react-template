import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Text } from '@aws-amplify/ui-react'
import { Button } from '@aws-amplify/ui-react';
import { getCurrentUser, signOut } from "aws-amplify/auth";
import { useEffect, useState } from 'react';
  
  const MainNavbar = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        async function getUser() {
            const { signInDetails } = await getCurrentUser();
            const email = signInDetails?.loginId! as string
            setUserName(email)
        }
        getUser()
    }, []);

    return (
      <Navbar bg="light" variant="light">
        <Container className="justify-content-between">
          <Navbar.Brand href="#home">ChinoTech Sandboxes</Navbar.Brand>
          <div className="d-flex align-items-center">
            <Text className="me-3">{userName}</Text>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        </Container>
      </Navbar>
    );
  }
  
  export default MainNavbar;
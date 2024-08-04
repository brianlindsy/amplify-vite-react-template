import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Text } from '@aws-amplify/ui-react'
import { Button } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
  
  const MainNavbar = () => {
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        async function getUser() {
            const { signInDetails } = await getCurrentUser();
            const email = signInDetails?.loginId! as string
            setUserEmail(email)
        }
        getUser()
    }, []);
    return (
      <Navbar bg="light" variant="light">
        <Container className="justify-content-between">
          <Navbar.Brand href="#home">ChinoTech Sandboxes</Navbar.Brand>
          <div className="d-flex align-items-center">
            <Text className="me-3">{userEmail}</Text>
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
        </Container>
      </Navbar>
    );
  }
  
  export default MainNavbar;
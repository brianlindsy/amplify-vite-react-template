import { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import AddServerModal from './AddServerModal';
import { getCurrentUser } from 'aws-amplify/auth';

const client = generateClient<Schema>();

const ServerList = () => {
    const [servers, setServers] = useState<Array<Schema["Server"]["type"]>>([]);
    const [show, setShow] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        async function getUser() {
            const { signInDetails } = await getCurrentUser();
            const email = signInDetails?.loginId! as string
            setUserEmail(email)
        }
        getUser()
    }, []);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {
      client.models.Server.observeQuery().subscribe({
        next: (data) => setServers([...data.items]),
      });
    }, []);

    const handleDelete = (id: any) => {
      client.models.Server.delete({id})
    };

    const addServer = () => {
        handleOpen()
    };

  return (
    <Container style={{padding: "10px"}}>
      <Button onClick={addServer}>Add New Server</Button>
      <Container style={{padding: "10px"}}>
          <AddServerModal show={show} handleClose={() => handleClose()} userEmail={userEmail}/>
          <Row>
            {servers.map((server) => (
              <Col key={server.id} xs={12} md={6} lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{server.name}</Card.Title>
                    <Card.Text>{server.description}</Card.Text>
                    <Card.Text>{server.status}</Card.Text>
                    <Card.Text>{server.baseUrl}</Card.Text>
                    <Button onClick={() => handleDelete(server.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
      </Container>
    </Container>
  );
};

export default ServerList;

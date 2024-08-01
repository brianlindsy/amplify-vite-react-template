import { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import AddServerModal from './AddServerModal';

const client = generateClient<Schema>();

const ServerList = () => {
    const [servers, setServers] = useState<Array<Schema["Server"]["type"]>>([]);
    const [show, setShow] = useState(false);

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
        <AddServerModal show={show} handleClose={() => handleClose()}/>
        <Button onClick={addServer}>Add New Server</Button>
        <Row>
          {servers.map((server) => (
            <Col key={server.id} xs={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{server.name}</Card.Title>
                  <Card.Text>{server.description}</Card.Text>
                  <Card.Text>{server.status}</Card.Text>
                  <Button onClick={() => handleDelete(server.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    </Container>
  );
};

export default ServerList;

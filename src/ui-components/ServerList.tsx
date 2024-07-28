import { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const ServerList = () => {
    const [servers, setServers] = useState<Array<Schema["Server"]["type"]>>([]);

    useEffect(() => {
      client.models.Server.observeQuery().subscribe({
        next: (data) => setServers([...data.items]),
      });
    }, []);
  
    function createServer(serverDetails: {}) {
      client.models.Server.create(serverDetails);
    }

    const addServer = async () => {
        const serverDetails = {
            name: 'New Server',
            description: 'Server description',
            status: 'Running'
        };
        try {
            createServer(serverDetails)
        } catch (error) {
            console.error('Error adding server', error);
        }
    };

  return (
    <Container>
      {servers.length === 0 ? (
        <Button onClick={addServer}>Add Server</Button>
      ) : (
        <Row>
          {servers.map((server) => (
            <Col key={server.id} xs={12} md={6} lg={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{server.name}</Card.Title>
                  <Card.Text>{server.description}</Card.Text>
                  <Card.Text><strong>Status:</strong> {server.status}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default ServerList;

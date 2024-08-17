import { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import AddServerModal from './AddServerModal';
import ServerDetails from './ServerDetails';

const client = generateClient<Schema>();

const ServerList = () => {
    const [servers, setServers] = useState<Array<Schema["Server"]["type"]>>([]);
    const [show, setShow] = useState(false);
    const [showingServerDetails, setShowingServerDetails] = useState(false);

    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    useEffect(() => {
      client.models.Server.observeQuery().subscribe({
        next: (data) => setServers([...data.items]),
      });
    }, []);

    const handleDelete = (id: any) => {
      client.models.Server.delete({id})
      setShowingServerDetails(false)
    };

    const handleServerClick = () => {
      setShowingServerDetails(true)
    };

    const addServer = () => {
        handleOpen()
    };

    const handleBackFromServer = () => {
      setShowingServerDetails(false)
    }

  return (
    <Container style={{padding: "10px"}}>
      {servers.length === 0 ?
        <Button onClick={addServer}>Add New Server</Button> : null
      }
      <Container style={{padding: "10px"}}>
          {!showingServerDetails ?
          <>
          <AddServerModal show={show} handleClose={() => handleClose()} />
          <Row>
            {servers.map((server) => (
              <Col key={server.id} xs={12} md={6} lg={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>{server.name}</Card.Title>
                    <Button onClick={() => handleServerClick()}>Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          </>
          : <ServerDetails handleBackFromServer={handleBackFromServer} handleDelete={() => handleDelete(servers[0].id)} server={servers[0]} /> }
      </Container>
    </Container>
  );
};

export default ServerList;

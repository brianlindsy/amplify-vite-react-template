import { Button } from "@aws-amplify/ui-react";
import React from "react";
import { Container } from "react-bootstrap";

interface ServerDetailsProps {
    server: any;
    handleBackFromServer: () => void;
    handleDelete: () => void;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({ server, handleBackFromServer, handleDelete }) => {

    const serverUrl = "https://api.chinotechnologies.com/server/" + server.id + "/metadata?_format=json";

    return (
        <div style={styles.container}>
            <Container>
                <h2>Server Details</h2>
                <h5>Server may take up to 5 minutes to start and insert test patients, refresh this page to check status.</h5>
                <Button onClick={handleBackFromServer}>Back</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Container>
            <div style={styles.detail}>
                <strong>Base URL:</strong> <a target="_blank" rel="noopener noreferrer" href={serverUrl}>{serverUrl}</a>
            </div>
            <div style={styles.detail}>
                <strong>Encoding:</strong> {server.encoding}
            </div>
            <div style={styles.detail}>
                <strong>Version:</strong> {server.version}
            </div>
            {server.implementationGuide !== null ?
            <div style={styles.detail}>
                <strong>Implementation Guide:</strong> {server.implementationGuide}
            </div> : null
            }
            {server.implementationGuideVersion !== null ?
            <div style={styles.detail}>
                <strong>Implementation Guide Version:</strong> {server.implementationGuideVersion}
            </div> : null
            }
            <div style={styles.detail}>
                <strong>User Email:</strong> {server.userEmail}
            </div>
            <div style={styles.detail}>
                <strong>Name:</strong> {server.name}
            </div>
            {server.description !== null ?
            <div style={styles.detail}>
                <strong>Description:</strong> {server.description}
            </div> : null
            }
            <div style={styles.detail}>
                <strong>Status:</strong> {server.serverStatus}
            </div>
            <div style={styles.detail}>
                <strong>Test patients? </strong> {server.insertTestPatients === 'true' ? "Yes" : "No"}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
        padding: '20px',
        maxWidth: '600px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    detail: {
        marginBottom: '10px',
    },
};

export default ServerDetails;

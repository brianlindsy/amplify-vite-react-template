import { Button } from "@aws-amplify/ui-react";
import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";

interface ServerDetailsProps {
    server: any;
    handleBackFromServer: () => void;
    handleDelete: () => void;
}

const ServerDetails: React.FC<ServerDetailsProps> = ({ server, handleBackFromServer, handleDelete }) => {

    const convertToUrl = (toConvert: string) => {
        return toConvert.toLowerCase().replace(" ", "-")
    }

    const checkStatus = async () => {
        var statusText = ""
        await fetch(server.publicIP + ":8080/fhir/metadata?_format=json")
        .then((response) => {
            statusText = response.statusText;
        })

        return statusText
    }

    const [serverStatus, setServerStatus] = React.useState("")

    useEffect(() => {
        checkStatus().then((status) => {
            setServerStatus(status)
        })
    })

    return (
        <div style={styles.container}>
            <Container>
                <h2>Server Details</h2>
                <Button onClick={handleBackFromServer}>Back</Button>
                <Button onClick={handleDelete}>Delete</Button>
            </Container>
            <div style={styles.detail}>
                <strong>Base URL:</strong> {"app.chinotechnologies.com/" + convertToUrl(server.name)}
            </div>
            <div style={styles.detail}>
                <strong>Encoding:</strong> {server.encoding}
            </div>
            <div style={styles.detail}>
                <strong>Version:</strong> {server.version}
            </div>
            <div style={styles.detail}>
                <strong>User Email:</strong> {server.userEmail}
            </div>
            <div style={styles.detail}>
                <strong>Name:</strong> {server.name}
            </div>
            <div style={styles.detail}>
                <strong>Description:</strong> {server.description}
            </div>
            <div style={styles.detail}>
                <strong>Status:</strong> {serverStatus}
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

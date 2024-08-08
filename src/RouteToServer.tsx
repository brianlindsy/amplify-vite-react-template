// src/Server.js
import { generateClient } from 'aws-amplify/data';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Schema } from "../amplify/data/resource";
import React from 'react';
const client = generateClient<Schema>();

const RouteToServer = () => {
  const { id } = useParams();

  const [response, setResponse] = React.useState('')

  useEffect(() => {
    const server = client.models.Server.get({id: id as string})

    server.then((serverResponse) => {
        fetch("http://" + serverResponse.data?.publicIP + ":8080/fhir/metadata").then((fhirServerRawResponse) => {
            console.log(fhirServerRawResponse)
            fhirServerRawResponse.json().then((textResponse) => {
                setResponse(textResponse)
            })
        })
    })
    
  }, []);

  return (
    <>
      {JSON.stringify(response)}
    </>
  );
};

export default RouteToServer;

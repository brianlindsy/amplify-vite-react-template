import { Authenticator } from '@aws-amplify/ui-react'
import MainNavbar from "./ui-components/MainNavbar";
import '@aws-amplify/ui-react/styles.css';
import ServerList from './ui-components/ServerList';

function App() {

  return (
    <Authenticator>
    {() => (
      <>
        <MainNavbar />
        <ServerList />
      </>
      )}
      </Authenticator>
  );
}

export default App;

import { Authenticator } from '@aws-amplify/ui-react'
import MainNavbar from "./custom-ui-components/MainNavbar";
import ServerList from './custom-ui-components/ServerList';

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

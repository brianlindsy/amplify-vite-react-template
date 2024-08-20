import { Authenticator } from '@aws-amplify/ui-react'
import MainNavbar from "./custom-ui-components/MainNavbar";
import ServerList from './custom-ui-components/ServerList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Authenticator>
    {() => (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<><MainNavbar /><ServerList /></>} />
          </Routes>
        </Router>
      </>
      )}
      </Authenticator>
  );
}

export default App;

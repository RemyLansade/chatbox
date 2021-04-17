import { BrowserRouter as Browser, Switch, Route } from 'react-router-dom';

import App from '../App';
import Connection from '../components/Connection';
import NotFound from '../components/NotFound'

const Root = () => {
  return(
    <Browser>
      <Switch>
        <Route path='/' component={Connection} exact />
        <Route path='/pseudo/:id' component={App} />
        <Route component={NotFound} />
      </Switch>
    </Browser>
  );
}

export default Root
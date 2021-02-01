import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Link } from 'react-router-dom';

const Editor: React.FC = () => {
  let history = useHistory();

  return (
    <div>
      <input type="text" defaultValue="form"></input>
      <button onClick={()=>history.push('/login')}>logout</button>
    </div>
  )
}


const Preview = () => {
  return (
    <div>
      Preview
    </div>
  )
}


const LoginPage = () => {
  return (
    <div>
      LoginPage
    </div>
  )
}


const RouterPage = () => {
  return (
    <div>
      <div>Pages</div>
      <Router>
        
        <ul>
          <li><Link to="/editor">Editor</Link></li>
          <li><Link to="/preview">Preview</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
        
        <Switch>
          <Route path="/editor">
            <Editor />
          </Route>
          <Route path="/preview">
            <Preview />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

ReactDOM.render(<RouterPage />, document.getElementById('main'));
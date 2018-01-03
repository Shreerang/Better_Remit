import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/route';
import Header from './components/AppComponents/header';
import { BrowserRouter } from 'react-router-dom';

require('./index.css')
const React = require('react')
const ReactDOM = require('react-dom')
const Footer = require('./components/AppComponents/footer')

ReactDOM.render(
  <BrowserRouter>
    <div className="br-container">
      <MuiThemeProvider>
        <Header/>
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Main/>
      </MuiThemeProvider>
      <MuiThemeProvider>
        <Footer/>
      </MuiThemeProvider>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
injectTapEventPlugin();

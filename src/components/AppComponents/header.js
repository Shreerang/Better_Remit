import {Card, CardText} from 'material-ui/Card';
import Logo from './BR_Logo.png';
require('./header.css')
const React = require('react')


class Header extends React.Component {
  render() {
    return(
      <header className="br-header">
        <Card>
          <CardText>
            <a href="/">
              <img src={Logo} alt="Better Remit Logo"/>
            </a>
          </CardText>
        </Card>
      </header>
    )
  }
}

export default Header;

import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';
const React = require('react');
const Axios = require('axios');
const emojiFlags = require('emoji-flags');

class getCountries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'countryList': [{}],
      'defaultFromCountry': 'from_default',
      'defaultToCountry': 'to_default'
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.setDefaultCountries = this.setDefaultCountries;
    this.getCurrencies = this.getCurrencies;
    this.getCompanies = this.getCompanies;
    this.getDeliveryTypes = this.getDeliveryTypes;
  }

  handleFromChange(event, index, value) {
    this.setState({'defaultFromCountry': value}, ()=>{
      localStorage.setItem('fromCountry', this.state.defaultFromCountry);
    });
  }

  handleToChange(event, index, value) {
    this.setState({'defaultToCountry': value}, ()=>{
      localStorage.setItem('toCountry', this.state.defaultToCountry);
    });
  }

  setDefaultCountries(){
    let defaultFromCountry = localStorage.getItem('fromCountry');
    let defaultToCountry = localStorage.getItem('toCountry');
    if(defaultFromCountry){
      this.setState({'defaultFromCountry': defaultFromCountry})
    } else {
      this.setState({'defaultFromCountry': 'from_default'})
    }
    if(defaultToCountry){
      this.setState({'defaultToCountry': defaultToCountry})
    } else {
      this.setState({'defaultToCountry': 'from_default'})
    }
  }

  getCurrencies() {
    let currencyListLS = localStorage.getItem('currencyListLS');
    if (!currencyListLS || currencyListLS.length < 1){
      Axios({
        method: 'get',
        url: 'api/getCurrencies'
      })
      .then((response) => {
        localStorage.setItem('currencyListLS', JSON.stringify(response.data))
      })
    }
  }

  getCompanies(){
    let currentD = new Date();
    let currentTS = currentD.getFullYear().toString() + currentD.getMonth().toString() + currentD.getDate().toString();
    let companyListLSTS = localStorage.getItem('companyListTS');
    if (!companyListLSTS || (currentTS > companyListLSTS)){
      localStorage.removeItem('companyListLS')
      localStorage.removeItem('companyListTS')
      Axios({
        method: 'get',
        url: '/api/getCompanies'
      })
      .then((response) => {
        let d = new Date();
        let TS = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
        localStorage.setItem('companyListLS', JSON.stringify(response.data))
        localStorage.setItem('companyListTS', TS)
      })
    }
  }

  getDeliveryTypes(){
    let currentD = new Date();
    let deliveryTypeLSTS = localStorage.getItem('deliveryTypesTS');
    let timeDiff = (Math.round((currentD - deliveryTypeLSTS)/1000/60/60/24/7));
    let deliveryTypesLS = localStorage.getItem('deliveryTypesLS');
    if(!deliveryTypesLS || (timeDiff>1)){
      Axios({
        method: 'get',
        url: 'api/getDeliveryTypes'
      })
      .then((response) => {
        localStorage.setItem('deliveryTypesLS', JSON.stringify(response.data))
        let TS = new Date();
        localStorage.setItem('deliveryTypesTS', TS)
      })
    }
  }

  componentWillMount() {
    let countryListLS = localStorage.getItem('countryListLS');
    if(countryListLS && countryListLS.length > 1){
      this.setState({'countryList': JSON.parse(countryListLS)});
    } else{
      Axios({
        method: 'get',
        url: '/api/getCountries'
      })
      .then((response) => {
        this.setState({'countryList': response.data});
        localStorage.setItem('countryListLS', JSON.stringify(response.data))
      })
    }
    this.setDefaultCountries();

    this.getCurrencies();
    this.getCompanies();
    this.getDeliveryTypes();
  }

  render() {
    let emojiData = '';
    let emoji = ''
    let optionsList = [];
    if(this.state.countryList.length > 1){
      for(let item of this.state.countryList){
        emojiData = emojiFlags.countryCode(item.Code)
        if(emojiData){
          emoji = emojiData.emoji
        } else {
          emoji = ''
        }
        optionsList.push(<MenuItem value={item.Code} primaryText={item.Name + " " + emoji}/>)
      }
    }

    return (
      <div className="br-content">
        <Card zDepth={2} className="br-card">
          <CardText>
            <form>
              <div className="br_form_field">
                <SelectField floatingLabelText="Send money from" value={this.state.defaultFromCountry} onChange={this.handleFromChange} maxHeight={200} fullWidth={true}>
                  <MenuItem value="to_default" primaryText="Send money from" disabled={true} />
                  {optionsList}
                </SelectField>
              </div>

              <div className="br_form_field">
                <SelectField floatingLabelText="Send money to" value={this.state.defaultToCountry} onChange={this.handleToChange} maxHeight={200} fullWidth={true}>
                  <MenuItem value="to_default" primaryText="Send money to" disabled={true}/>
                  {optionsList}
                </SelectField>
              </div>

              <div className="br-btn br_form_field">
                <RaisedButton label="Next" primary={true} href="/corridorDetails" />
              </div>
            </form>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default getCountries;

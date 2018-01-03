import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';
import currencySymbol from 'currency-symbol-map'
const React = require('react');
const Axios = require('axios');
const emojiFlags = require('emoji-flags');

class getCorridorDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'companyList': '',
      'currencyFromList': [],
      'currencyToList': [],
      'deliveryFrom': [],
      'deliveryTo': [],
      'selectedCurrencyFrom': '',
      'selectedCurrencyTo': '',
      'selectedDeliveryFrom': '',
      'selectedDeliveryTo': ''
    };
    this.handleCurrencyFromChange = this.handleCurrencyFromChange.bind(this);
    this.handleCurrencyToChange = this.handleCurrencyToChange.bind(this);
    this.handleDeliveryFromChange = this.handleDeliveryFromChange.bind(this);
    this.handleDeliveryToChange = this.handleDeliveryToChange.bind(this);
    this.handleFromAmountChange = this.handleFromAmountChange.bind(this);
  }

  handleCurrencyFromChange(event, index, value) {
    this.setState({'selectedCurrencyFrom': value}, () => {
      localStorage.setItem('currencyFrom', this.state.selectedCurrencyFrom)
    });
  }

  handleCurrencyToChange(event, index, value) {
    this.setState({'selectedCurrencyTo': value}, () => {
      localStorage.setItem('currencyTo', this.state.selectedCurrencyTo)
    });
  }

  handleFromAmountChange(event, index, value) {
    this.setState({'fromAmount': index}, () => {
      localStorage.setItem('fromAmount', this.state.fromAmount)
    });
  }

  handleDeliveryFromChange(event, index, value) {
    this.setState({'selectedDeliveryFrom': value}, () => {
      localStorage.setItem('deliveryFrom', this.state.selectedDeliveryFrom)
    });
  }

  handleDeliveryToChange(event, index, value) {
    this.setState({'selectedDeliveryTo': value}, () => {
      localStorage.setItem('deliveryTo', this.state.selectedDeliveryTo)
    });
  }

  componentDidMount() {
    let countryFrom = localStorage.getItem('fromCountry');
    let countryTo = localStorage.getItem('toCountry');

    Axios({
      method: 'get',
      url: 'api/getCorridorDetails/' + countryFrom + '/' + countryTo
    })
    .then((response) => {
      let companyList = response.data.Companies;
      let currenyFromList = [];
      let currencyToList = [];
      let deliveryFrom = [];
      let deliveryTo = [];
      let currenyFromOptionsList = [];
      let currenyToOptionsList = [];
      let deliveryFromOptionsList = [];
      let deliveryToOptionsList = [];
      this.setState({'companyList': companyList});
      companyList.map((company) => {
        company.CurrenciesFrom.map((currencyFrom) => {
          if(currenyFromList.indexOf(currencyFrom.Code) < 0){
            currenyFromList.push(currencyFrom.Code)
          }
          currencyFrom.DeliveryMethods.map((deliveryMethod) => {
            if(deliveryFrom.indexOf(deliveryMethod.DeliveryType) < 0){
              deliveryFrom.push(deliveryMethod.DeliveryType)
            }
          })
        })
        company.CurrenciesTo.map((currencyTo) => {
          if(currencyToList.indexOf(currencyTo.Code) < 0){
            currencyToList.push(currencyTo.Code)
          }
          currencyTo.DeliveryMethods.map((deliveryMethod) => {
            if(deliveryTo.indexOf(deliveryMethod.DeliveryType) < 0){
              // deliveryTo.push(<MenuItem value={deliveryMethod.DeliveryType} primaryText={deliveryMethod.DeliveryType}/>)
              deliveryTo.push(deliveryMethod.DeliveryType)
            }
          })
        })
      })

      currenyFromList.map((item) => {
        let currencySym = currencySymbol(item);
        let currencyTypes = JSON.parse(localStorage.getItem('currencyListLS'));
        currencyTypes.map((currencyType) => {
          if(currencyType.Code === item){
            this.setState({'selectedCurrencyFrom': item}, () => {
              localStorage.setItem('currencyFrom', this.state.selectedCurrencyFrom)
            })
            currenyFromOptionsList.push(<MenuItem value={item} primaryText={currencySym + " " + currencyType.Name + " " + "(" + item + ")"}/>)
          }
        })
      })

      currencyToList.map((item) => {
        let currencySym = currencySymbol(item);
        let currencyTypes = JSON.parse(localStorage.getItem('currencyListLS'));
        currencyTypes.map((currencyType) => {
          if(currencyType.Code === item){
            this.setState({'selectedCurrencyTo': item}, () => {
              localStorage.setItem('currencyTo', this.state.selectedCurrencyTo)
            })
            currenyToOptionsList.push(<MenuItem value={item} primaryText={currencySym + " " + currencyType.Name + " " + "(" + item + ")"}/>)
          }
        })
      })

      deliveryFrom.map((item) => {
        let deliveryTypes = JSON.parse(localStorage.getItem('deliveryTypesLS'));
        deliveryTypes.map((deliveryType) => {
          if(deliveryType.Code === item){
            this.setState({'selectedDeliveryFrom': item}, () => {
              localStorage.setItem('deliveryFrom', this.state.selectedDeliveryFrom)
            })
            deliveryFromOptionsList.push(<MenuItem value={item} primaryText={deliveryType.Name}/>)
          }
        })
      })

      deliveryTo.map((item) => {
        let deliveryTypes = JSON.parse(localStorage.getItem('deliveryTypesLS'));
        deliveryTypes.map((deliveryType) => {
          if(deliveryType.Code === item){
            this.setState({'selectedDeliveryTo': item}, () => {
              localStorage.setItem('deliveryTo', this.state.selectedDeliveryTo)
            })
            deliveryToOptionsList.push(<MenuItem value={item} primaryText={deliveryType.Name} />)
          }
        })
      })

      this.setState({'currencyFromList': currenyFromOptionsList});
      this.setState({'currencyToList': currenyToOptionsList});
      this.setState({'deliveryFrom': deliveryFromOptionsList});
      this.setState({'deliveryTo': deliveryToOptionsList});
    })
  }

  renderSelectionForm(){
    return (
      <form>
        <div className="br_form_field">
          <TextField hintText="1" floatingLabelText="Amount you wish to send"  fullWidth={true} onChange={this.handleFromAmountChange}/>
        </div>
        <div className="br_form_field">
          <SelectField floatingLabelText="You will send" value={this.state.selectedCurrencyFrom} onChange={this.handleCurrencyFromChange} maxHeight={200} fullWidth={true}>
            {this.state.currencyFromList}
          </SelectField>
        </div>

        <div className="br_form_field">
          <SelectField floatingLabelText="Receiver will get" value={this.state.selectedCurrencyTo} onChange={this.handleCurrencyToChange} maxHeight={200} fullWidth={true}>
            {this.state.currencyToList}
          </SelectField>
        </div>

        {/*<div className="br_form_field">
          <SelectField floatingLabelText="Money will be transferred as" value={this.state.selectedDeliveryFrom} onChange={this.handleDeliveryFromChange} maxHeight={200} fullWidth={true}>
            {this.state.deliveryFrom}
          </SelectField>
        </div>

        <div className="br_form_field">
          <SelectField floatingLabelText="Money will be received as" value={this.state.selectedDeliveryTo} onChange={this.handleDeliveryToChange} maxHeight={200} fullWidth={true}>
            {this.state.deliveryTo}
          </SelectField>
        </div>*/}

        <div className="br-btn br_form_field">
          <RaisedButton label="💱 Better Remit" primary={true} href="/remitQuotes" />
        </div>
      </form>
    )
  }

  renderNoCompanies(){
    let countryList = JSON.parse(localStorage.getItem('countryListLS'));
    let fromCountry = localStorage.getItem('fromCountry')
    let fromCountryEmoji = emojiFlags.countryCode(fromCountry).emoji
    let toCountry = localStorage.getItem('toCountry')
    let toCountryEmoji = emojiFlags.countryCode(toCountry).emoji
    countryList.map((country) => {
      if(country.Code === fromCountry){
        fromCountry = country.Name
      }
      if(country.Code === toCountry){
        toCountry = country.Name
      }
    })
    return(
      <div className="br-nocompany">
        <p className="br-sorry-emoji"><span role="img" aria-label="Sorry Face Emoji">😔</span></p>
        <p className="br-error-msg">
          Sorry! You cannot remit money from <br />
          <strong>{fromCountry + " " + fromCountryEmoji}</strong> to <strong>{toCountry + " " + toCountryEmoji}</strong>
        </p>
        <RaisedButton label="Go back" primary={true} href="/" />
      </div>
    )
  }

  renderView(){
    if(this.state.companyList !== "" && this.state.companyList.length === 0){
      return this.renderNoCompanies()
    } else if(this.state.companyList !== "" && this.state.companyList.length > 0) {
      return this.renderSelectionForm()
    }
  }

  render() {
    return(
      <div className="br-content">
        <Card zDepth={2} className="br-card br-selection-component">
          <CardText>
            { this.renderView() }
          </CardText>
        </Card>
      </div>
    )
  }
}

export default getCorridorDetails;

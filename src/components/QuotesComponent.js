import RaisedButton from 'material-ui/RaisedButton';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';
import currencySymbol from 'currency-symbol-map'
const React = require('react');
const Axios = require('axios');
const emojiFlags = require('emoji-flags');

class getQuotesDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'quoteList': ''
    };
  }

  componentDidMount() {
    let countryFrom = localStorage.getItem('fromCountry');
    let countryTo = localStorage.getItem('toCountry');
    let currencyFrom = localStorage.getItem('currencyFrom');
    let currencyTo = localStorage.getItem('currencyTo');
    let fromAmount = localStorage.getItem('fromAmount');

    Axios({
      method: 'get',
      url: '/api/getQuotes/'+countryFrom+'/'+countryTo+'/'+currencyTo+'/'+currencyFrom+'/'+fromAmount
    })
    .then((response) => {
      let quoteList = response.data;
      this.setState({'quoteList': quoteList})
    })
  }

  componentDidUpdate(){
    setTimeout(function(){
      document.body.style.height = document.body.scrollHeight + 'px'
    }, 1000)
  }

  renderQuotes(){
    function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
      }
    }

    let quoteList = this.state.quoteList
    quoteList = quoteList.sort(dynamicSort('Rate'));
    let quoteRate = ''
    let quoteCards = []
    let companiesList = JSON.parse(localStorage.getItem('companyListLS'))
    console.log(quoteList);
    quoteList.map((quote) => {
      companiesList.map((company) => {
        if(quote.CompanyId === company.ID){
          let currencyFromSym = currencySymbol(quote.CurrencyFrom);
          let currencyToSym = currencySymbol(quote.CurrencyTo);
          let currencyFeeSym = currencySymbol(quote.FeeCurrency);
          quoteCards.push(
            <Card zDepth={2} className="br-quotes-card">
              <CardText>
                <div className="br-quotes-card-img">
                  <img src={company.Logo} />
                </div>
                <div className="br-quotes-card-desc">
                  {company.Description}
                </div>
                <div className="br-quotes-rate">
                  Rate: <span>{currencyFromSym}1 == {currencyToSym}{quote.Rate}</span>
                  <br />
                  <br />
                  Remittance: <span>{currencyFromSym}{quote.AmountFrom} == {currencyToSym}{quote.AmountTo}</span>
                </div>
                <div>
                  {(quote.Fee > 0) ? "A fee of " + currencyFeeSym + quote.Fee + " might be charged!" : "No transfer fee is charged!"}
                </div>
              </CardText>
            </Card>
          )
        }
      })
    })
    return(
      <div className="br-quotes-cards-container">
        <div>
          { quoteCards }
        </div>
      </div>
    )
  }

  renderNoQuotes(){
    let countryList = JSON.parse(localStorage.getItem('countryListLS'));
    let fromCountry = localStorage.getItem('fromCountry')
    let fromCountryEmoji = emojiFlags.countryCode(fromCountry).emoji
    let toCountry = localStorage.getItem('toCountry')
    let toCountryEmoji = emojiFlags.countryCode(toCountry).emoji
    let fromCurrency = localStorage.getItem('currencyFrom')
    let toCurrency = localStorage.getItem('currencyTo')
    countryList.map((country) => {
      if(country.Code === fromCountry){
        fromCountry = country.Name
      }
      if(country.Code === toCountry){
        toCountry = country.Name
      }
    })
    return(
      <Card zDepth={2} className="br-card br-selection-component">
        <CardText>
          <div className="br-nocompany">
            <p className="br-sorry-emoji"><span role="img" aria-label="Sorry Face Emoji">😔</span></p>
            <p className="br-error-msg">
              Sorry! It seems like no company allows remittance from
              <strong>{" " + currencySymbol(fromCurrency) + " " + fromCurrency}</strong> to <strong>{currencySymbol(toCurrency) + " " + toCurrency}</strong> from <strong>{fromCountry + " " + fromCountryEmoji}</strong> to <strong>{toCountry + " " + toCountryEmoji}</strong>
            </p>
            <RaisedButton label="Go back" primary={true} href="/corridorDetails" />
          </div>
        </CardText>
      </Card>
    )
  }

  renderView(){
    if(this.state.quoteList !== "" && this.state.quoteList.length === 0){
      return this.renderNoQuotes()
    } else if(this.state.quoteList !== "" && this.state.quoteList.length > 0) {
      return this.renderQuotes()
    }
  }

  render() {
    return(
      <div className="br-content">
        { this.renderView() }
      </div>
    )
  }
}

export default getQuotesDetails;

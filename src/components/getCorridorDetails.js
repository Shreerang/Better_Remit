import {Card, CardTitle, CardActions, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
const React = require('react')
const Axios = require('axios')

class getCorridorDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      'corridorDetails': [{}],
      'companyList': [{}]
    }
  }
  componentWillMount() {
    let fromCountry = localStorage.getItem('fromCountry');
    let toCountry = localStorage.getItem('toCountry');
    let fromCurrency = [];
    let toCurrency = [];

    Axios({
      method: 'get',
      url: '/api/getCorridorDetails/'+fromCountry+'/'+toCountry
    })
    .then((response) => {
      this.setState({'corridorDetails': response.data.Companies})
      let compList = JSON.parse(localStorage.getItem('companyListLS'));
      let x = this.state.corridorDetails;
      let fromToCurrency = [];
      if(x.length > 1){
        for(let a=0; a<x.length; a++){
          for(let i=0; i<compList.length; i++){
            if(compList[i].ID === x[a].ID){
              x[a].companyImg = compList[i].Logo
              x[a].companyDescription = compList[i].Description
              break;
            }
          }

          for(let j=0; j<x[a].CurrenciesFrom.length; j++){
            fromCurrency.push(x[a].CurrenciesFrom[j].Code)
          }

          for(let l=0; l<x[a].CurrenciesTo.length; l++){
            toCurrency.push(x[a].CurrenciesTo[l].Code)
          }

          for(let k=0; k<toCurrency.length; k++){
            for(let m=0; m<fromCurrency.length; m++){
              if(fromToCurrency.indexOf(fromCurrency[m]+toCurrency[k]) > -1){
                //m++;
              }
              else{
                Axios({
                  method: 'get',
                  url: '/api/getQuotes/'+fromCountry+'/'+toCountry+'/'+toCurrency[k]+'/'+fromCurrency[m]+'/1'
                })
                .then((response) => {
                  toCurrency = [];
                  fromCurrency = [];
                  if(response.data.length >= 1){
                    for(let o=0; o<response.data.length; o++){
                      for(let n=0; n<x.length; n++){
                        for(let p=0; p<x[n].CurrenciesFrom.length; p++){
                          if(response.data[o].CompanyId === x[n].ID){
                            if(response.data[o].AmountTo > 0 && response.data[o].CurrencyFrom === x[n].CurrenciesFrom[p].Code){
                              x[n].CurrenciesFrom[p].AmountFrom = response.data[o].AmountFrom;
                              x[n].CurrenciesFrom[p].AmountTo = response.data[o].AmountTo;
                              break;
                            }
                          }
                        }
                      }
                    }
                  }
                })
                fromToCurrency.push(fromCurrency[m]+toCurrency[k])
              }
            }
          }
          toCurrency = [];
          fromCurrency = [];
        }
        this.setState({'corridorDetails': x})
      }
    })
  }
  render(){
    let optionsList = [];
    if(this.state.corridorDetails.length > 1){
      for(let item of this.state.corridorDetails){
        for(let q=0; q<item.CurrenciesFrom.length; q++){
          if(item.CurrenciesFrom[q].AmountTo > 0){
            optionsList.push(
              <Card className="br-company-detail-card">
                <CardTitle title={item.Name} subtitle={item.companyDescription} />
                <CardText>
                  <div className="br-company-logo-container">
                    <img className="br-company-logo" src={item.companyImg} alt={item.Name + 'logo'}/>
                  </div>
                  <div>
                    item.CurrenciesFrom[q].Code + " " + item.CurrenciesFrom[q].AmountFrom = item.CurrenciesFrom[q].Code + " " + item.CurrenciesFrom[q].AmountFrom
                  </div>
                  <CardActions>
                    <RaisedButton label={"Go to " + item.Name} primary={true} href="/remitDetails" />
                  </CardActions>
                </CardText>
              </Card>
            )
          }
        }
      }
    }
    return (
      <div className="br-container">
        <Card zDepth={2} className="br-company-card">
          {optionsList}
        </Card>
      </div>
    );
  }
}

export default getCorridorDetails;

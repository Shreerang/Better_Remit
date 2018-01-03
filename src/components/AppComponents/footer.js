require('./footer.css')
const React = require('react')

class Footer extends React.Component {
  render() {
    return(
      <footer className="br-footer">
        <span>Created with <span role="img" aria-label="love">❤️</span> by <a href="https://theuidev.github.io">Shreerang Patwardhan</a></span><br/>
        <span id="PoweredbyRemitRadar">Remittance API powered by RemitRadar</span>
        <script type="text/javascript">
        var partner = "shreerangpatwardhan.blogspot.com"
        </script>
        <script type="text/javascript" src="https://remitradarimages.s3.amazonaws.com/PoweredByRemitRadar.js"></script>
      </footer>
    )
  }
}

module.exports = Footer

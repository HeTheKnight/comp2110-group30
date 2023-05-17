//Done by Ali Issa
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class CurrencyConverterWidget extends LitElement {
//Defining the properties for the component
static properties = {
    rates: { type: Object },
    fromCurrency: { type: String },
    toCurrency: { type: String },
    amount: { type: Number },
    convertedAmount: { type: Number },
  };
  //Defining the styles for components that are using CSS
  static styles = css`
    .currency-converter {
      padding: 1rem;
      background-color: #8adced;
      border-radius: 10px;
      border: 3px solid white;
      margin-top: 15px;
      margin-left: 1em;
    }
  
    .currency-converter form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  
    .currency-converter input[type="number"] {
      margin-bottom: 1rem;
    }
    
    p{
      font-weight: bold;
    }
  `;
  //Constructor initializes default values from properties
  constructor() {
    super();
    this.rates = {};
    this.fromCurrency = 'USD';
    this.toCurrency = 'EUR';
    this.amount = 1;
    this.convertedAmount = 0;
  }
    //this is called when the component is connected
  async connectedCallback() {
    super.connectedCallback();
    try {
      //getting the latest exchange rates from the API
      const response = await fetch('https://api.exchangerate.host/latest');
      const data = await response.json();
      this.rates = data.rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  }
  //Rendering the component's HTML
  render() {
    return html`
      <div class="currency-converter">
        <h3>Currency Converter</h3>
        <form @submit="${this._convert}">
          <input type="number" .value="${this.amount}" @input="${e => this.amount = e.target.value}" min="0" step="0.01">
          <select .value="${this.fromCurrency}" @change="${e => this.fromCurrency = e.target.value}">
            ${Object.keys(this.rates).map(currency => html`<option value="${currency}">${currency}</option>`)}
          </select>
          <select .value="${this.toCurrency}" @change="${e => this.toCurrency = e.target.value}">
            ${Object.keys(this.rates).map(currency => html`<option value="${currency}">${currency}</option>`)}
          </select>
          <button type="submit">Convert</button>
        </form>
        <p>Converted Amount: ${this.convertedAmount.toFixed(2)}</p>
      </div>
    `;
  }  
  //code that handles the conversion
  _convert(e) {
    e.preventDefault();
    const rate = this.rates[this.toCurrency] / this.rates[this.fromCurrency];
    this.convertedAmount = this.amount * rate;
  }
}
// Defining the custom element 'currency-converter-widget' using the CurrencyConverterWidget class
  customElements.define('currency-converter-widget', CurrencyConverterWidget);

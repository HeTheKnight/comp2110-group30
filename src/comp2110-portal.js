import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js'; //importing LitElement,html,css which is shared across all the components
import './components/widget-block.js'; //importing widget block
import './components/blog-block.js'; //importing blog block 
import './components/widget-column.js';//importing widget column
import './components/ad-widget.js'; //importing ad widget
import './components/login-widget.js'; //importing login widget
import './components/fact-widget.js'; //importing fact widget 
import './components/weather-widget.js'; //importing weather widget
import './components/currency-converter-widget.js'; //importing currency converter widget 
import './components/holiday-widget.js'; //importing holiday widget 
import './components/blog-post-creator.js' //importing blog post creator

class Comp2110Portal extends LitElement { //creating the class stating the type for header to be a string for words
  static properties = {
    header: { type: String },
  };
  //styling it using css
  static styles = css`
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  :host {
    min-height: 100vh;
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 1em;
    line-height: 1.6;
    color: #1a2b42;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;
    height: 100vh;
    width: 100vw;
  }

  main {
    display: flex;
    justify-content: space-between;
    margin-top: 0;
    background-image: url(https://i.pinimg.com/originals/61/2a/67/612a677c31da6f703d79ed41a0f3dd7e.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  
  }

  header {
    background-image: url(https://wallpapers.com/images/hd/deep-blue-ice-mountain-mfa06ba2bdruwe7h.jpg);
    background-position-y: -60px;
    background-size: cover;
    margin-top: -1.8rem;
    padding: 20px;
    color: black;
    border-radius: 0px;
    font-weight: bold;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0px;
  }

  .app-footer {
    font-size: calc(12px + 0.5vmin);
    align-items: center;
    margin-top: 0;
    background-color: #8adced;
    text-align: center;
    color: black;
    padding: 1rem;
    margin-bottom: -2.5rem;
    border-radius: 0;
    font-weight: bold;
  }

  .app-footer a {
    margin-left: 5px;
    color: #1a2b42;
    text-decoration: none;
  }

  .app-footer a:hover {
    text-decoration: underline;
  }

  img {
    max-width: 100%;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
`;
//constructor value for the header
constructor() {
  super();
  this.header = 'COMP2110 Portal';
}
//using render in order to show the page, this loads the header along with all the widgets. We have changed the code in order to organise the widget blocks, columns and headers to fit the page correctly
  render() {
    return html`
      <header>
        <h1>${this.header}</h1>
        <login-widget></login-widget>
        <blog-post-creator></blog-post-creator>
      </header>

      <main>
        <widget-column header="">
         
          </widget-block>
          <weather-widget></weather-widget>
          
          <fact-widget></fact-widget>
          
          <currency-converter-widget></currency-converter-widget>
        </widget-column>
        <blog-block></blog-block>       
        <widget-column header="">
          <ad-widget></ad-widget>
      
          <holiday-widget></holiday-widget>

        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2023
      </p>
    `;
  }
}

customElements.define('comp2110-portal', Comp2110Portal); //define the custom element for the type of the comp2110 portal
//Done by Mohamad Bernar
// importing required modules
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


// Defining the properties of the custom element
class HolidayWidget extends LitElement {
    static get properties() {
      return {
        holidays: { type: Array }, // an array of holidays
        months: { type: Array },   // // an array of months
        selectedMonth: { type: String }  // the selected month to filter the holidays
      };
    }
  
    // Define the styles of the component
    static styles = css` 
    :host {
          display: block;
          width: 250px;
          background-color: #8adced;
          border-radius: 10px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
          color: #333;
          padding: 10px;
          box-sizing: border-box;
          font-weight: bold;
          margin-top: 15px;
          border-radius: 10px;
          border: 3px solid white;
          margin-top: 15px;
          margin-right: 1em;
          margin-bottom: 15px;
        }
  
        h3 {
          margin: 0;
          font-size: 1.2em;
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }

        label {
          font-size: 0.9em;
          font-weight: bold;
          margin-right: 5px;
        }

        select {
          padding: 5px;
          font-size: 0.9em;
        }
  
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
  
        li {
          margin-bottom: 5px;
          font-size: 0.9em;
        }
      `;
  // Define the constructor of the component
    constructor() {
      super();
      this.holidays = []; // initialize the holidays array
      this.months = [];   // initialize the months array
      this.selectedMonth = '';  // initialize the selectedMonth property
    }
  
    // Define the connectedCallback method of the component
    connectedCallback() {
      super.connectedCallback();
      this.fetchHolidays();
    }
  
    // Define the fetchHolidays method of the component
    async fetchHolidays() {
      const response = await fetch('https://date.nager.at/api/v3/publicholidays/2023/AU');
      const data = await response.json();
      this.holidays = data;
  
      // group holidays by month
      const groupedHolidays = {};
      for (const holiday of this.holidays) {
        const month = new Date(holiday.date).toLocaleString('default', { month: 'long' });
        if (!groupedHolidays[month]) {
          groupedHolidays[month] = [];
        }
        groupedHolidays[month].push(holiday);
      }
      this.months = Object.keys(groupedHolidays).sort();
    }
  
    // Define the handleMonthSelect method of the component
    handleMonthSelect(event) {
      this.selectedMonth = event.target.value;
    }
  
    // Define the render method of the component
    render() {
      let holidaysToShow = this.holidays;
      if (this.selectedMonth) {
        holidaysToShow = this.holidays.filter(holiday => new Date(holiday.date).toLocaleString('default', { month: 'long' }) === this.selectedMonth);
      }
  // Defines the HTML template for the HolidayWidget component, including the header, dropdown for selecting a month, and list of holidays to display based on the selected month.

     return html`
      <h3>Australian Public Holidays 2023</h3>
        ${this.months.length > 0 ? html`
       <label for="month-select">Filter by month:</label> 
       <select id="month-select" @change="${this.handleMonthSelect}"> 
       <option value="">All</option>
        ${this.months.map(month => html`
       <option value="${month}">${month}</option>
      `)}
      </select>
  ` : ''}
  <ul>
    ${holidaysToShow.map(holiday => html`
      <li>${holiday.name} (${holiday.date})</li>
    `)}
  </ul>
`;
    }
  }
  
  customElements.define('holiday-widget', HolidayWidget); // Define the custom element and its name.

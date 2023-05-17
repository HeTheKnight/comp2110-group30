// Alfarok Al Rahmani's widget

// Import necessary modules from Lit
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Create a new web component class
class WeatherWidget extends LitElement {
  
  // Define properties for the component
  static properties = {
    weather: { type: Object },
    weatherIcon: { type: String },
  }

// Styling my widget using css
  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 270px;
      background-color: #8adced;
      text-align: center;
      padding: 1rem;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 10px;
      border: 3px solid white;
      margin-top: 15px;
      margin-left: 1em;
    }

    h3, h4 {
      margin: 0;
      margin-bottom: 0.1rem;
    }
    h5 {
      margin: 0;
      margin-bottom: 0.1rem;
      font-size: 0.9rem;
    }
    h6 {
      margin: 0;
      margin-bottom: 0.1rem;
      font-size: 0.9rem;
    }
    

    .weather-icon {
      font-size: 0.5px;
      margin-bottom: -1rem;
    }
  `;
 // Component constructor
  constructor() {
    super();
    this.weather = null;
  }
// Fetch weather data after first render and API details and location coordinates for Sydney, Australia
  async firstUpdated() {
    const apiKey = '91934029685e08603ebbf93b9fa0f78d';
    const latitude = -33.87;
    const longitude = 151.21;
// Fetch weather data
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );if (!response.ok) {
        console.error('Error fetching weather data:', response.status, response.statusText);
        return;
      }
// Parse response data and set to weather property
      const data = await response.json();
      this.weather = data;
      this.weatherIcon = data.weather[0].icon;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
// Render function for the component
  render() {
    // If no weather data, show loading message
    if (!this.weather) {
      return html`<div>Loading...</div>`;
    }
// Destructure weather data
    const { temp } = this.weather.main;
    const weatherDescription = this.weather.weather[0].description;
    const { speed } = this.weather.wind;

// Render weather data in HTML
    return html`
      <h3>Weather Forecast</h3>
      <h4>Sydney, Australia</h4>
      <div class="weather-icon">
        <img src="https://openweathermap.org/img/wn/${this.weatherIcon}@2x.png" alt="${weatherDescription}" />
      </div>
      <h5>Temperature: ${temp}°C</h5>
      <h6>Weather: ${weatherDescription}</h6>
      <h6>Wind Speed: ${speed}m/s</h6>
    `;
  }
}
// Define the custom element
customElements.define('weather-widget', WeatherWidget);
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';  //importing LitElement,html,css which is shared across all the components
import { BASE_URL } from '../config.js'; //importing the base_url which is used as a back point from config.js
 
class BlockBlock extends LitElement { //creating the class
  static properties = { //setting the properties for the posts
    _posts: { state: true }
  }
//styling it using css
  static styles = css` 
    :host {
      display: block;
      width: 100%;        
      min-height: 10vh;      
      margin: 1em;
      padding: 1rem;
      margin-right: 50px;
    }
    .blogpost {
      overflow-wrap: break-word;
      text-align: left;
      background-color: #a2dce8;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      border-radius: 10px;
      padding: 1rem;
      margin-bottom: 1rem;
      transition: background-color 0.3s ease; 
      opacity:90%;
      width: 100%; 
    }
    .blogpost:hover {
      background-color: #00BFFF;
    }
    .blogpost h2 {
      margin-top: 0;
      color: black;
      text-transform: capitalize;
      font-style: Bold ; 
      font-family: 'Roboto';
    }
    .blogpost h3 {
      font-size: 0.8em;
      color: black;
      font-style: italic;
      margin-bottom: 1em;
    }
    p {
      color: #1a2b42;
      font-size: large;
    }
  `;

  constructor() { //constructor value for the blogs
    super();
    const url = `${BASE_URL}blog`; //connecting with the api endpoint to retrieve posts 
    fetch(url)
      .then(response => response.json())
      .then(posts => {
        this._posts = posts.posts;
      });
  }

  static formatBody(text) { //this is relating to the text and formatting it
    const paragraphs = text.split('\r\n'); // splits texts in order of paragraphs
    return paragraphs.map(paragraph => html`<p>${paragraph}</p>`);
  }

  render() {
    if (!this._posts) return html`Loading...`; //instead of having a blank screen this adds a Loading text until the posts are retrieved 
    return html`
      ${this._posts.map( //showing the post as a title, name and content
        post => html`<div class="blogpost">
          <h2>${post.title}</h2>
          <h3>By ${post.name}</h3>
          ${BlockBlock.formatBody(post.content)}
        </div>`
      )}
    `;
  }
}

customElements.define('blog-block', BlockBlock); //define the custom element for the type of blog block
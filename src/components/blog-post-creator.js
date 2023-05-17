import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';  //importing LitElement,html,css which is shared across all the components
import { BASE_URL } from '../config.js'; //importing the base_url which is used as a back point from config.js
import { getUser } from '../auth.js'; //importing the authorisation to check the login which is used as a back point from auth.js


class BlogPostCreator extends LitElement { //creating the class
  static properties = { //setting the properties of title and content to be a string which holds words, and their state as true
    title: { type: String, state: true },
    content: { type: String, state: true }
  }
  //styling it using css
  static styles = css` 
  :host {
    display: block;
    margin-left: 50px;
}
  `;
//constructor value for the posts by intiating the title and content as strings
  constructor() {
    super();
    this.title = '';
    this.content = '';
  }
//using render in order to show the post once it's created
  render() {
    return html`
      <form @submit="${this.createPost}">
        <label>
          Title:
          <input type="text" .value="${this.title}" @input="${e => this.title = e.target.value}">
        </label>
        <label>
          Content:
          <textarea .value="${this.content}" @input="${e => this.content = e.target.value}"></textarea>
        </label>
        <button type="submit">Post</button>
      </form>
    `;
  }

  createPost(event) { //once the post has been created it used fetch in order to reach the endpoint of the api, then it verifies the authorization using a basic user token
    event.preventDefault();
    const user = getUser();
    fetch(`${BASE_URL}blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${user.token}`
      },
      body: JSON.stringify({ //once accepted the title and content goes into their appropriate places
        title: this.title,
        content: this.content
      })
    }).then(response => { // once the post has been completed and posted it will be shown on the blog after the page refreshes automatically 
      if (response.ok) {
        this.title = '';
        this.content = '';
        window.location.reload();
      }
    })
  }
}

customElements.define('blog-post-creator', BlogPostCreator); //define the custom element for the type of blog post creator

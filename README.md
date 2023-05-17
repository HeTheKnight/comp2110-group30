# COMP2110 Portal - Starter

This is the starter repository for the COMP2110 Portal front end assignment 2023. You are
expected to customise this README file to describe your own project.  You may delete or modify
any or all of the current contents.


## Installation

The project has no external dependencies, it uses Lit via a CDN load directly into
the HTML page.   Node is used only to run a local HTTP server.

```bash
npm install
```

Will install the `http-server` node module.

```bash
npm start
```

will run the server.

## Backend Server

Your portal will make use of a server that we have implemented that is running on <https://comp2110-portal-server.fly.dev/>.   Documentation for the services it provides
is in [this Github repository](https://github.com/COMP2110-2023/comp2110-portal-server/).

## Starter Code

The code included here implements the basic framework for the application, including
an overall page structure and the blog, login and advertising components.  If you run
the application you will see the basic page with space for a number of _widgets_.  
You will fill these slots with your own widgets - one per team member. (A _widget_
is a name for an element of a graphical user interface, basically the same as a
component).

The module `config.js` exports a variable `BASE_URL` that contains the address
of the backend server. This is used for example in the blog-block component
to define the URL endpoint.  You may also want to use it if you make use of
other API endpoints from the server (eg. tasks).

The code contains implementations of the following components:

### `<ad-widget>`
This component displays an advertisement from the backend portal server. You should not
modify it and it should appear somewhere in your page design.

### `<blog-block>`
This component implements a blog using the backend API from the COMP2110 portal server.
You can modify this component if you wish to change the layout of posts or the overall look and feel.  

This component only supports reading posts although the backend API allows posting new blog
posts if you are logged in.  One possible extension of this component would be to allow
posting in some way.

### `<blog-post-creator>`
The blog post creator works using LitElement, the post creator gives a two block option, one named title and the other for the content, when you press submit it will communicate with the backend api that is grabbed through config.js as a base url, this takes into account the user token in order to authorize the request, once this is done the post is created on the comp2110 server then it refreshes the page.

### `<currency-converter-widget>` (Ali Issa)
This code defines a custom web component called "CurrencyConverterWidget" using the LitElement framework. It creates a currency converter with an input field for the amount, dropdowns for selecting currencies to convert from and to, and a button to initiate the conversion. The conversion is done using the exchange rates fetched from an API, and the converted amount is displayed in the box.

### `<fact-widget>` (Samer Almasri)
The fact widget works using LitElement, the widget grabs a random fact based on the date and displays it inside the widget. This works using API URL which takes calculates the current date, using currentdate.get.. whether its the day and month then sends a fetch request to the API endpoint asking it to grab a random fact that has the same date. Once this is done the fact is shown in the body as a paragraph of the widget, with the header displaying Random Fact.  


### `<holiday-widget>` (Mohamad Bernar)
In my code, I created a custom element called "HolidayWidget" using LitElement, which displays a list of Australian public holidays for the year 2023. The component fetches the holiday data from an API, groups the holidays by month, and allows the user to filter the holidays by selecting a month from a dropdown menu. The component also includes some basic styling to make it look like a card, and uses template literals to define the HTML template. I defined the custom element using the "customElements.define" method, so that it can be used in any HTML document by simply adding the "holiday-widget" tag to the page. Overall, my code provides a simple and reusable way to display public holiday information in a web application.

### `<login-widget>`
This component implements a login form that will allow a user to authenticate to the
backend server.   If the user is logged in, the component displays their name and
a logout button rather than the form.  

Authentication is implemented in the `auth.js` module.  Once a user login succeeds,
the current user details are stored in the browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) so that
they persist over browser sessions.  In your code, you can use the function
`getUser()` from the `auth.js` module to find out if a user is logged in and get
their details.  

### `<weather-widget>` (Alfarok Alrahmani)
Using LitElement, this code creates the "WeatherWidget" web component. It fetches weather data for Sydney, Australia from the OpenWeatherMap API, and displays the weather forecast including temperature, weather description, and wind speed.. A specified CSS style gives the component a particular look and layout. When the component is rendered, it first displays a loading message before asynchronously retrieving the weather information in the firstUpdated() method. The component's render() method creates the HTML structure needed to display the weather data when the data has been fetched and stored in the weather property. The component can be used as a custom element in HTML using the tag <weather-widget></weather-widget>.

### `<widget-block>`
The widget block uses LitElement, all that widget block does is provide an outline for other widgets, where it displays a header and a paragraph for the content, you are able to use this in order to customise the widget outline, however we have not used this per our tutor's advice during the tutorial. The main use for it is the css as you are able to customise everything. 

### `<widget-column>`
This component implements a container for widgets and can be used to define
the style information and layout for the group.

### `<auth>`
The auth.js takes over a storage where it stor provide an interface to logged in users store the current user in localStorage so that it persists over browser sessions. storeUser and deleteUser dispatch a custom event that can be intercepted by other parts of the application to do something on login/logout. do not modify it 

### `<comp2110-portal>`
This is a container for the whole portal application and currently contains 
some of the pre-defined widgets.  You can modify this as you see fit to achieve
your overall application layout and behaviour.

### `<config>`
Base url of the backend server used for login, blog and advertising. do not modify it 

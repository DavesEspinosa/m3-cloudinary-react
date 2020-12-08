# React | Integrating the React App



After this lesson, you will be able to:

- Make a request to a REST API using `axios`
- Understand how to integrate backend and frontend parts of your application







In this lesson, we will create a front-end  `React` application to consume our REST API (server/backend).



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">1</h2>

#### Create React app

Let’s start with creating the React app using the `create-react-app` :

```bash
npx create-react-app project-management-client

cd project-management-client
```



<br>



In the previous step we have already set the `PORT`  of our server to `5000`. Just as a reminder, our Express server (backend) and React app client (frontend) are running on different `PORT`s, so we have: 



- `project-management-server` running on `http://localhost:5000`.
- `project-management-client` running on `http://localhost:3000`.





<br>



#### Install `axios` and `react-router-dom`



Install `axios` for HTTP requests and `react-router-dom` for front-end routing:

```bash
npm install axios react-router-dom
```



<br>



#### Run the React app



Run the React app with `npm start`. 

```bash
npm start
```



<br>



##### Create folders for the components

Run the following command from the terminal. Make sure to run it from the root directory of the React project/app. Below command will create folder structure for the components in our app.

```bash
mkdir src/components  
mkdir src/pages

mkdir src/pages/ProjectList
mkdir src/pages/ProjectDetails
mkdir src/pages/TaskDetails
mkdir src/pages/Error

mkdir src/components/Navbar
mkdir src/components/AddProject
mkdir src/components/EditProject
mkdir src/components/AddTask
```



<br>



##### Create component files

Run the following command from the terminal. Make sure to run it from the root directory of the React project/app. Below command will create `.js` and `.css` files for our components.



```bash
touch src/pages/ProjectList/ProjectList.js
touch src/pages/ProjectList/ProjectList.css
touch src/pages/ProjectDetails/ProjectDetails.js
touch src/pages/ProjectDetails/ProjectDetails.css
touch src/pages/TaskDetails/TaskDetails.js
touch src/pages/TaskDetails/TaskDetails.css
touch src/pages/Error/Error.js
touch src/pages/Error/Error.css

touch src/components/Navbar/Navbar.js
touch src/components/Navbar/Navbar.css
touch src/components/AddProject/AddProject.js
touch src/components/AddProject/AddProject.css
touch src/components/EditProject/EditProject.js
touch src/components/EditProject/EditProject.css
touch src/components/AddTask/AddTask.js
touch src/components/AddTask/AddTask.css
```



<br>





<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">2</h2>

#### Add styles to the app

Before we start, let's add some basic styles to our app. Add the below styles to  `src/App.css`.



##### `src/App.css`

```css
/*   src/App.css   */

.App {
  text-align: center;
  padding: 0;
}

.nav-style {
  background: slateblue;
  display: flex;
  align-items: center;
  padding-top: 10px;
  font-size: 20px;
  margin-bottom: 20px;
}

form {
  padding: 10px 50px;
  border: 2px solid black;
  border-radius: 8px;
  display: inline-flex;
  flex-direction: column;
}

input {
  height: 30px;
  font-size: 18px;
  text-align: center;
}

button {
  width: 150px;
  padding: 5px 20px;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 16px;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.project, .task {
  margin: 0 auto;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 7px;
  max-width: 700px;
}
```



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">3</h2>

#### Setup the `<Router>` in `index.js`



Import the `BrowserRouter` component from `react-router-dom` package, in the `index.js`. Do not delete any code that is already present in the file, but only add the code as per the below instructions.

The below import statement is importing the `BrowserRouter` component and changing it's name to `Router` by using the `as` keyword, therefore making the component available under the name/indentifier `Rotuer`.



<br>

##### `src/index.js`

```jsx
// src/index.js
// ...

import { BrowserRouter as Router } from 'react-router-dom';       // <-- IMPORT
```



<br>



Wrap the `<App>` with the previously imported `<Router></Router>` component, as in the example below:



<br>



##### `src/index.js`

```jsx
// src/index.js
// ...

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">4</h2>


### Create the `<AddProject />` component.



This component will be a controlled component (React `class` component handling a form with inputs).

It will contain 2 inputs `title` and `description` used to create a new project.

Let's first create the `<form>` and the rest of the content that component will be rendering and the `state`.

We will first only outline the methods `handleFormSubmit` and `handleChange` and then implement them in the next step.

<br>



##### `src/components/AddProject/AddProject.js`

```jsx
//  src/components/AddProject/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';

class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { title: "", description: "" };
  }
   
  handleFormSubmit = (event) => {}

  handleChange = (event) => {}

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text" 
            name="title" 
            value={this.state.title} 
            onChange={ (e) => this.handleChange(e) }
          />
          
          <label>Description:</label>
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={ (e) => this.handleChange(e) } 
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;
```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">5</h2>


#### Create methods `handleFormSubmit` and `handleChange`

Let's implement the methods `handleFormSubmit` and `handleChange`:



<br>



##### `src/components/AddProject/AddProject.js`

```jsx
// src/components/AddProject/AddProject.js

//	...



 handleChange = (event) => {  
   const {name, value} = event.target;
   this.setState({[name]: value});
 }

 
 
 
 handleFormSubmit = (event) => {
    event.preventDefault();
    const {title, description } = this.state;
     
    axios.post("http://localhost:5000/api/projects", { title, description })
    .then( () => {
      // this.props.getData(); // leave this comment - we will used it later
      this.setState({title: "", description: ""});
    })
    .catch( (err) => console.log(err) )
  }
 



 //	...
 
 //	...
```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">6</h2>

#### Create the `<ProjectList />` component



This component will be used to show a list of all the projects and it will also be displaying the `<AddProject/>` component.



Let's first create the `<form>` and the rest of the content that component will be rendering and the `state`.

We will first only outline the basic structure of the component and add the `state` object containting a field `listOfProjects` initially being set as an empty array.

In the future steps we will use the lifecycle method `componentDidMount` to make a request to our server,  get all the projects and set them in the `state` as the `listOfProjects`. But first, let's create the basic structure of our `ProjectList` component.



<br>



##### `src/pages/ProjectList/ProjectList.js`

```jsx
// src/pages/ProjectList/ProjectList.js

import React, { Component } from 'react';

import { Link } from 'react-router-dom';                // <== IMPORT
import axios from 'axios';                            // <== IMPORT

import AddProject from './../components/AddProject/AddProject';  // <== IMPORT



class ProjectList extends Component {
	state = { 
    listOfProjects: [] 
  };

  render() {

    return(
      <div id="project-list">
        <AddProject />
        
        <div>
          {/* HERE WE DISPLAY ALL OF THE PROJECTS FROM THE API */}
        </div>

      </div>
    )
  }
}

export default ProjectList;

```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">7</h2>



#### Update the `<ProjectList />` component - get data from the server



Add the lifecycle method `componentDidMount` to the component. We will create a helper method `getAllProjects` used to make the `axios` request to the server make a request to our server,  get all the projects and set them in the `state` as the `listOfProjects`. 





##### `src/components/projects/ProjectList.js`

```jsx
// src/components/projects/ProjectList.js

//	...

//			...

class ProjectList extends Component {

  
  //		...
  
  //			...

  getAllProjects = () =>{
    axios.get(`http://localhost:5000/api/projects`)
    .then((apiResponse) => {
      this.setState({ listOfProjects: apiResponse.data })
    })
  }

  
  
  
  componentDidMount() {
    this.getAllProjects();
    //  fetch the data from API after the initial render, and save it in the state
  }

// ...

// ...
```





<br>





#### Update the content in the `render ` of the `ProjectList` component



Next, we need to update what `ProjectList` is rendering to dispaly the new data ( `listOfProjects` ) received from the server/API.

We should also pass the newly created method `getAllProjects` as the prop to the `<AddProject/>` component.

Update the code in the `render` method of the `ProjectList` as per the below snippet:



<br>



##### `src/components/projects/ProjectList.js`

```jsx
// src/components/projects/ProjectList.js

//	...

render() {
  	// deconstruct value from the `state`
    const { listOfProjects } = this.state;					       //  <--  ADD

    return(
      <div>
        
      {/* After adding a project, we will call `getData` to get all projects again */}
        
      <AddProject getData={this.getAllProjects} />     {/*    // <-- UPDATE     */}
  
        <div>
          { 
            listOfProjects.map( (project) => (                   //   <-- ADD
              <div key={project._id} className='project'>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                  <p>{project.description} </p>
                </Link>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

export default ProjectList;
```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">8</h2>


#### Create a Route for `ProjectList`  in `App.js`

Import the newly created `ProjectList` component in `App.js` and add a `<Route />` with the path `/projects` so that this page/component gets rendered whenever user visits the home page URL ( `localhost:3000/projects` ).



You will first need to remove the boilerplate JSX code created by the `create-react-app`.



<br>



##### `src/App.js`

```jsx
// 	src/App.js

//	...

//			...

import { Switch, Route } from 'react-router-dom';               //	<--  ADD
import ProjectList from './pages/ProjectList/ProjectList';	   //		<--  ADD


function App() {
  return (
    <div className="App">
      
      <Switch>																									{/* ADD */}
        <Route exact path="/projects" component={ProjectList}/>    {/* ADD */}
      </Switch>
      
    </div>
  );
}

// ...
```



<br>



#### Using a created form submit a new Project.

After linking the above page, visit the URL `localhost:3000/projects`.  `ProjectList` component should be displaying together with the `<AddProject />` component.





<br>









<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">9</h2>



#### Refresh the list of projects -   `this.props.getData()` 

###  

Calling the method `this.props.getData` (`getAllProjects` method from the `ProjectList`) after the new project is created refreshes the list of projects displayed in the `ProjectList`. 

This happens because of invoking the function `getAllProjects` which gets all the projects from the server and updates the state via `this.setState`.



Uncomment the line `this.props.getData` as per the below example:

<br>



##### `src/components/projects/AddProject`

```jsx
// src/components/projects/AddProject.js

//	...

//	...

handleFormSubmit = (event) => {
    event.preventDefault();
    const { title, description } = this.state;

    axios.post("http://localhost:5000/api/projects", { title, description })
    .then( () => {
      
      this.props.getData();		//		              ⟸  UNCOMMENT THIS LINE * *
      
      this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
  }

//	...

//	...
```





<br>





<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">10</h2>


#### Create the `<ProjectDetails /> `  component



This component will be used to show the data of the particular project.



##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
//  src/pages/ProjectDetails/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class ProjectDetails extends Component {
  
  state = {}
  
  render(){
    return (
      <div>
	      <h1>Project Details</h1>
      </div>
    )
  }
}

export default ProjectDetails;
```







<br>





#### Create `Navbar` component



Copy paste the code snippets provided below to create the `Navbar` component.



<br>

##### `src/components/Navbar/Navbar.js`

```jsx
//  src/components/Navbar/Navbar.js

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
  state = {
    username: "User's name"
  } 

  render() {
    return (
      <nav id='navbar'>
        <ul>

          <NavLink 
            activeClassName="selected-link" 
            exact to="/"
          >
            Home
          </NavLink>
          <NavLink 
            activeClassName="selected-link" 
            exact to="/projects"
          >
          Projects
        </NavLink>

        </ul>

        <div className="nav-details">
          <p className="nav-username">{this.state.username}</p>
        </div>
      </nav>
    )
  }
}

export default Navbar;
```



<br>



##### `src/components/Navbar/Navbar.css`

```css
#navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background:  #352275;
  padding: 20px 40px;
  margin-bottom: 30px;
}

#navbar * {
  list-style: none;
  text-decoration: none;
  display: inline-block;
  margin: 0px 40px; 
  font-size: 22px;
  color:white;
}

div.nav-details > * {
  display: inline-block;
  color: royalblue;
  font-size: 22px;
}

.selected-link {
  text-shadow: 1px 0px 3px white;
  color: #FFF;
  border-bottom: rgba(255, 255, 255, 0.639) solid 2px;
  padding-bottom: 5px;
}

```





<br>



### Update `App.js`



Import and add the 2 newly created components `Navbar` and `ProjectDetails` to `App.js`.

`Navbar` component should be displayed on each and every page.

`ProjectDetails` page should be displayed when the user visits a route `/projects/:id` where `:id` will be a dynamic param value used to show the id of the specific project.



##### `src/App.js`

```jsx
//	src/App.js

//	...

//			...

import ProjectList from './pages/ProjectList/ProjectList';

import ProjectDetails from './pages/ProjectDetails/ProjectDetails';     //	IMPORT
import Navbar from './components/Navbar/Navbar.js`';                      //	IMPORT


function App() {
  return (
    <div className="App">
      
      <Navbar />                 {/* ADD */}

      <Switch>
        <Route exact path="/projects" component={ProjectList}/>
        
        <Route exact path="/projects/:id" component={ProjectDetails} />  {/* ADD */}
      </Switch>
    </div>
  );
}

export default App;
```







<br>





<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">11</h2>


#### Update `<ProjectDetails>` to add functionality



Project details page should contain a `state` (contain properties `title`, `description` and `tasks`) and a `componentDidMount` method. Once the component is rendered we will need to make the request to the server/API and get the data of the specific project and `setState` with that data so that `title` and `description` are displayed in the component.

Id of the project will be available via the URL param and we should access it via `this.props.match.params` object.



<br>



##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
// src/pages/ProjectDetails/ProjectDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProjectDetails extends Component {
  state = {                                      // <-- UPDATE / ADD THE STATE
    title: " ",
    description: " ",
    tasks: []
  };


  componentDidMount() {                               // <-- ADD METHOD
      this.getSingleProject();
  }


  getSingleProject = () => {                           // <-- ADD METHOD
    const { id } = this.props.match.params;

    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then( (apiResponse) =>{
        const theProject = apiResponse.data;
        const { title, description, tasks } = theProject;
        this.setState( { title, description, tasks } );
      })
      .catch((err) => console.log(err));
  }
  
  
  
  render(){
    
    return(
      <div>
        <h1>Project Details</h1>
        
        <h2>{this.state.title}</h2>             {/*    // <--- ADD       */}
        <h4>{this.state.description}</h4>         {/*    // <--- ADD       */}
        
        <Link to={'/projects'}>                 {/*    // <--- ADD       */}
        	<button>Back</button>
        </Link>
        
      </div>
    )
  }
}

export default ProjectDetails;
```



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">12</h2>


#### Create `EditProject` component 

Create `EditProject.js` component with a form to update a specific project.

`EditProject` will be a controlled component ( component that's handling a form with inputs).

It will contain 2 inputs `title` and `description` used to update an existing project.

We will create the method `handleFormSubmit` but leave it empty. In the step after this one we will add functionality to it, but for the moment leave it empty.

<br>

As `EditProject` component will not be directly rendered by the  `react-router-dom` `<Route>`, it will not have access to the react-router props (match, location, history) needed in order to access the URL coming from the Browser's navigation bar. 
<br>
To achieve this we have to use a special component ([HOC](https://reactjs.org/docs/higher-order-components.html)) `withRouter` coming from `react-router`. `withRouter` is used to inject react-router props (match, location, history) to any component and it is done by wrapping the component using `withRouter` e.g:  `withRouter(SomeComponent)`.
<br>
This will help us to access the project's id from the URL ( via `this.props.match.params`).



<br>



##### `src/components/EditProject/EditProject.js`

```jsx
// src/components/EditProject/EditProject.js

import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class EditProject extends Component {
  state = {
    title: "", 
    description: ""
  }
  
    
  handleFormSubmit = (event) => {}

  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
    //                ▲  Assign value to property using "object bracket notataion"
    //  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
  }

  render(){
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          
          <label>Title:</label>
          <input type="text"
            name="title" 
            value={this.state.title} 
            onChange={this.handleChange}/>
          
          <label>Description:</label>    
          <textarea 
            name="description" 
            value={this.state.description} 
            onChange={this.handleChange} 
          />
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}



// By wrapping EditProject in withRouter, 
// we inject react-router props (match, location, history)
// to the component. This will help us to access the project's id from the URL (this.props.match.params)
export default withRouter(EditProject);
```



<br>



#### Finalize the `handleFormSubmit` method in `EditProject.js`

<br>

##### `src/components/projects/EditProject.js`

```jsx
// src/components/projects/EditProject.js

//	...

//	...




handleFormSubmit = (event) => {
  event.preventDefault();
  const { title, description } = this.state;
  const { id } = this.props.match.params;    // made available by withRouter()
  

  axios.put(
    `http://localhost:5000/api/projects/${id}`,
    { title, description }
  )
  .then( () => {
    this.props.getTheProject();
    // this.props.history.push('/projects');    
    // after submitting the form, we could also redirect to '/projects'
  })
   .catch( (err) => console.log(err) )
}

//	...

```







<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">13</h2>


#### Place component `<EditProject>`  in the `ProjectDetails.js`

`EditProject` form will be displayed in the `ProjectDetails` page/component.



Import the `EditProject` component  in `ProjectDetails.js`:



<br>

##### `src/pages/ProjectDetails/ProjectDetails.js`

```js
import EditProject from './../../components/EditProject/EditProject';
```



<br>

Add the component to the `render` so that it gets displayed right below the project details.

##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
// src/pages/ProjectDetails/ProjectDetails.js

//	...
//			...
 
  
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h4>{this.state.description}</h4>
        
        <Link to={'/projects'}>
          <button>Back</button>
         </Link>

         <EditProject getTheProject={this.getSingleProject} />    {/* ADD */}
      </div>
    )
  }
```





<br>

<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">14</h2>




#### Update `ProjectDetails.js` and create the additional method for making DELETE requests to the API.



##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
// src/pages/ProjectDetails/ProjectDetails.js

//	...
//			...

  deleteProject = () => {														// <== CREATE METHOD
    const { id } = this.props.match.params;
    
    axios.delete(`http://localhost:5000/api/projects/${id}`)
    	.then( () => this.props.history.push('/projects') )	// causes Router URL change
    	.catch( (err) => console.log(err));
  }
  
  
//	...
```



<br>



Add the delete button to the `render()`:

<br>

##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
// src/pages/ProjectDetails/ProjectDetails.js

//	...
//			...

  render(){
    return (
      <div>
	<h1>Project Details</h1>

        <h2>{this.state.title}</h2>    
        <h4>{this.state.description}</h4>
        
        <Link to={'/projects'}>        
        	<button>Back</button>
        </Link>


        <EditProject getTheProject={this.getSingleProject} />

        <button onClick={this.deleteProject}>                   {/* ADD */}
          Delete project
        </button>
      </div>
    )
  }
```



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">15</h2>



### Create `AddTask` component


As `AddTask` component is not directly rendered by the  `react-router-dom` `<Route>`, it doesn't have access to the react-router props (match, location, history) needed in order to access the URL coming from the Browser's navigation bar. 
<br>
To achieve this we will have to use a special component ([HOC](https://reactjs.org/docs/higher-order-components.html)) `withRouter` coming from `react-router`. `withRouter` is used to inject react-router props (match, location, history) to any component and it is done by wrapping the component using `withRouter` e.g:  `withRouter(SomeComponent)`.
<br>
This will help us to access the project's id from the URL ( via `this.props.match.params`).

<br>

##### `src/components/AddTask/AddTask.js`

```jsx
// src/components/AddTask/AddTask.js


import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';

class AddTask extends Component {
  state = { 
    title: '',
    description: '',
    isShowing: false
  };

   
  handleFormSubmit = (event) => {}
  
  
  toggleForm = () => this.setState({isShowing: !this.state.isShowing});



  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
  
  
  displayForm = () => {
    return(
      <div>
        <form>
          <input 
            type="text" 
            placeholder='Title'
            name="title" 
            value={this.state.title}
            onChange={this.handleChange}
          />

          <input 
            name="description" 
            placeholder='Description'
            value={this.state.description}
            onChange={this.handleChange}
          />

          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    )
  }
  

  render(){
    return(
      <div>
        <button onClick={this.toggleForm}> 
          {this.state.isShowing ? 'Close' : 'Add task'}
        </button>

        {
          !this.state.isShowing 
            ? null
            : this.displayForm()
        }
      </div>
    )
  }
}

// By wrapping AddTask in withRouter, 
// we inject react-router props (match, location, history)
// to the component. This will help us to access the project's id from the URL (this.props.match.params)
export default withRouter(AddTask);
```

 



<br>





#### Finalize `handleFormSubmit` method in `AddTask.js`



##### `src/components/AddTask/AddTask.js`

```jsx
// components/AddTask/AddTask.js

//	...
//		...


  handleFormSubmit = (event) => {
      event.preventDefault();
      const { title, description } = this.state;
      const { id } = this.props.match.params;   // made available by withRouter()

   // we need to know to which project the task belongs, 
   // therefore we get project 'id'

      axios.post("http://localhost:5000/api/tasks",{ title, description, projectId: id })
        .then( () => {

       // after form submit, GET project again to display the updated task list  
          this.props.getUpdatedProject();
          this.setState({title: '', description: ''});
      })
      .catch( error => console.log(error) )
  }



//	...
```







<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">16</h2>


#### Add component `<AddTask />` to the `ProjectDetails.js`

Import `AddTask` in the `ProjectDetails` component.



<br>



##### `src/pages/projects/ProjectDetails.js`

```jsx
// src/pages/projects/ProjectDetails.js  

import AddTask from "./../../components/AddTask/AddTask";
```



<br>

Display the `<AddTask />` component on the bottom after all the previous content.

##### `src/pages/projects/ProjectDetails.js`

```jsx
// src/pages/projects/ProjectDetails.js 

  render(){
    return (
      <div>
        <h1>Project Details</h1>

        <h2>{this.state.title}</h2>    
        <h4>{this.state.description}</h4>
        
        <Link to={'/projects'}>        
        	<button>Back</button>
        </Link>


        <EditProject getTheProject={this.getSingleProject} />

        <button onClick={this.deleteProject}>
          Delete project
        </button>

        <AddTask getUpdatedProject={this.getSingleProject} />             {/* ADD */}
      </div>
    )
  }



//	...
```



<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">17</h2>


### Render All the tasks - Update `ProjectDetails.js`



The `state` of the `ProjectDetails` component already contains all the information that we need about the project. The last step would be to display all of the `tasks` coming from the `state` of the `ProjectDetails`.

<br>

##### `src/pages/ProjectDetails/ProjectDetails.js`

```jsx
// src/pages/ProjectDetails/ProjectDetails.js  

{/*					
		INSIDE OF THE `render` - on the bottom						
		
    After the last line of code, render list of tasks
*/}

					
	
    { 
      (this.state.tasks.length === 0) 
        ? <h2>NO TASKS TO DISPLAY</h2>
        : this.state.tasks.map((task) => {
            return(
              <Link 
                key={task._id}
                to={`/projects/${this.state._id}/tasks/${task._id}`}
                >

                <div className="task">
                  <h2>{ task.title }</h2>
                </div>

              </Link>
            )

      })
    }

```







<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">18</h2>


#### Create Route to render `<TaskDetails>`


Import `TaskDetails` in the `App` component.



<br>



##### `src/App.js`

```jsx
// src/App.js  

import AddTask from "./../../components/AddTask/AddTask";
```



##### `src/App.js`

```jsx
// 	src/App.js

//	...


class App extends Component {
  render() {
    return (
      <div className="App">
       <Navbar />
        <Switch>
          <Route exact path="/projects" component={ProjectList}/>
          <Route exact path="/projects/:id" component={ProjectDetails} />
          
          
          {/* ADD - route to display task details */}
          
          <Route exact path="/projects/:id/tasks/:taskId" component={TaskDetails} />    {/* ADD Route*/}

          
        </Switch>
      </div>
    );
  }
}

export default App;
```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">19</h2>


#### Create `<TaskDetails>` component


<br>


`TaskDetails` component will be rendered once user clicks on a specific task `<Link>` shown in the `ProjectDetails` page:

 ``<Link key={task._id} to{`/projects/${this.state._id}/tasks/${task._id}  `}  \>``



<br>



As `TaskDetails` component is directly rendered by the `react-router-dom` `<Route>` it will by default have access to react-router specific `props` ( `location`, `match` and `history`) and there is no need to additionaly include `withRouter`. To summarize, `withRouter` is used only for the components that are not directly displayed by the `<Route>`, to give them access to react-router specific `props`.

<br>



You will notice that method `getTheTask` needs the `props` value provided by the react-router ( `this.props.match.params`) in order to access the id of the Task from URL in the Broweser's navigation bar. This value is used to create a HTTP request (using `axios`) to the server/API and get the details of the specific task.



<br>



In addition you will notice that `<button>Go Back</button>` has an `onClick` event listener, invoking a special method `this.props.history.goBack` provided by the `react-router-dom`. This method is used to navigate to the previous page and when called it simply goes back to the previous URL and displays the previously rendered page component.

Same can be achived in a slightly more verbose way by using the `Link` component ( e.g. `<Link to={}></Link>` ).



<br>



##### `src/components/tasks/TaskDetails.js`

```jsx
// components/tasks/TaskDetails.js

import React, { Component } from 'react';
import axios from 'axios';


class TaskDetails extends Component {
  state = {
    title: '',
    descritpion: ''
  };

  componentDidMount(){
    this.getTheTask();
  }

  getTheTask = () => {
    const { id, taskId } = this.props.match.params;
    axios.get(`http://localhost:5000/api/tasks/${taskId}`)
    	.then( (apiResponse) => {
          const theTask = apiResponse.data;
          const { title, description} = theTask;

      	  this.setState({ title, description });
    })
    .catch( (err) => console.log(err))
  }

  render(){
    return(
      <div>
        <h3>TASK DETAILS</h3>
        <h2>{this.state.title}</h2>
        <p>{this.state.description}</p>
        
        
{/* To go back we use react-router-dom method `history.goBack()` available on `props` object */}
        <button onClick={this.props.history.goBack} >Go Back</button>
      </div>
    )
  }
}

export default TaskDetails;
```





<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">20</h2>


### NEXT STEPS:



- Create `<EditTask>` component which makes a `PUT` request (using `axios`) to the API to update the task.

  - Render the `<EditTask>` component inside of `<TaskDetails>` .

    
    <br>
    

- In the `<TaskDetails>` Create a delete button with an event listener used to send a `DELETE` request ( using `axios`) to the API to delete a task by id. As soon as the `DELETE` request is done you should display the `<ProjectDetails>` page.


<br>



<h2 style="background-color: #66D3FA; color: white; display: inline; padding: 10px; border-radius: 10;">21</h2>


### BONUS:

- Update the `EditProject` component so that it displays the selected project `title` and `description` in the input fields.

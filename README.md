# NixixJS - A JavaScript UI library or framework(anyone goes) used for creating beautiful user interfaces.

## Table of Contents

- [Getting Started](#getting-started)
- [Bug fixes](#bug-fixes)
- [New features](#new-features)

## Getting Started 

### To get started, you have to initialize your project with npm, that is, if you haven't already. Type this in the terminal:
```bash 
  npm init -y 
```

### Then, configure your workspace. To do that, type:
``` bash
  npm install create-nixix-app
  npx create-nixix-app
```


### The final step is to download the library, type:
``` bash
  npm install nixix
```
Now you are ready to code 😁!!!! 

<h2>Announcements</h2>

### NixixJS has undergone an upgrade which totally changes how it can be to used. They are: 

1. Support for JSX has been added. JSX will be it's primary templating language.The [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) library was used to get intellisense for the JSX elements and their properties.

2. Components will be made from functions that return JSX elements. They are called Functional Components. They will make describing the UI very easy to do. To demonstrate this, let's write a Functional Component that returns 'HELLO WORLD' and render it on the DOM. 

  ***App.jsx***
  ``` javascript 

    function App() {
      return (
        <h1>HELLO WORLD</h1>
      )
    }
    
    export default App;
  ```
  ***index.jsx***
  ``` javascript
    import { render } from 'nixix';
    import App from './App.jsx';

    render(<App />, document.querySelector('div#root'));
  ```
  ***Terminal***
  ```bash 
    npm start
  ```
  This will start a local development server on port 2000 and 'HELLO WORLD' will be displayed in your browser window.

## Bug fixes 

  @version 1.1.2

  - Fixed the bug of the render function rendering '[object HTMLElement]' when it is passed an array of elements and arrays of elements.
  ```javascript
    render([<div>me</div>, [<img src={'avatar.png'} alt="">]]);
  ```
  The above code renders displays 'me [object HTMLImageElement]' on the browser.
  - Fixed the bug of errorFunc calling eval with 'callState.caller.name' because the callState hooks was changed to callSignal.

  - Switched to jsdoc comments for types for easy readability and maintainability of the code.

## New Features 
  @version 1.2.0

  - Nixix now has a routing library for basic client-side routing, with the nixix/router package.  

  @version 1.3.5 

  - A callStore primitive has been added to the library. This primitive tracks reactive values in objects and arrays, no matter the size(defaults to deep tracking). How to use:
  ```javascript
    import { callStore } from 'nixix';

    function App() {
      const [userName, setUserName] = callStore({
        firstName: 'Ikechukwu', 
        lastName: 'Charles'
      });

      return (
        <>
          <h1> { userName.firstName } { userName.lastName }</h1>
          <button on:click={() => setUserName({firstName: 'Christopher'})} >ChangeName</button>
        </>
      )
    }
  ```

  Under the hood, the callStore function returns a proxy(not the real object). The properties are as follows:
  - '$$__value': this property contains the actual object which was passed in as the initial value. 
  - The other properties of the actual object passed to it. 
  Example usage: 
  ```javascript
    const [username, setName] = callStore({name: 'Ike', job: 'Web Developer'});
    console.log(username); // {$$__value: {username: 'Ike', job: 'Web Developer'}, username: {$$__name: '['username']'}}, job: {$$__name: '['job']'}}
  ```
  The property username in the object logged to the console is a instance of a class 'Store'. When the jsx factory function 'Nixix.create' encounters this property through dot or bracket notation. Nixix adds the element which it's childNode or attribute value is the property to an array of dependents on the window object so, when the value changes, the property of the element will also change. Using the reactive values above:
  ```javascript
    // tracking childNodes
    Nixix.create('div', null, username.name) // username.name is an instance of a class 'Store' (Nixix will track this div's first childNode.)
    // tracking attributes 
    Nixix.create('div', {className: username.name}, 'Hello world') // also an instance of 'Store' class (Nixix will track this div's className property.)
  ```

  @version 1.4.0

  - An effect function which takes a callback function for side effects when reactive values change (optional).
  Using it with callSignal
  ```javascript
      import { callSignal, effect } from 'nixix';
      function App() {

        const [count, setCount] = callSignal(Math.random());
        effect(() => {
          console.log(count.value);
        })
        return (
          <button on:click={() => setCount(Math.random())} >Click me</button>
        )   
      }

  ```
  Every single time the button is clicked, a random number gets logged to the console automatically. 
  
  This function can also be used with callStore. Like this:
  ```javascript
      import { callStore, effect } from 'nixix';
      function App() {
    
        const [idCount, setCountId] = callStore({id: 5});
        effect(() => {
          console.log(idCount.$$__value.id);
        }, 'store')
        return (
          <button on:click={() => setCountId({id: Math.random()})} >Click me</button>
        )   
      }
  ```
  The effect function has an optional second parameter called a reactionProvider. This can be a 'store' or a 'Signal'(default is 'Signal'). This parameter when passed the string 'store' works for reactive values which were provided by the callStore function. This parameter is only to be passed when you want to use it with stores.

  @version 1.4.7 

  - Async/Suspense - this function should be used to show placeholders while asynchronous tasks run in the background. It expects a fallback prop and a single child. It can be used like so: 
  ```javascript
    import { Suspense, asyncComponent } from 'nixix';

    // First, let's simulate a delay to show this example. We will make a function that returns a Promise object.
    const fakeApi = (): Promise<{id: string, productname: string}> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({id: 'kdkadkEakf39i483Adfdkafk3', productname: 'Balenciaga Boots'})
        }, 5000)
      })
    };

    // when this function is called, after a timeout of 5 seconds it returns a Promise object which we will consume.
    export const Product = asyncComponent(async () => {
      const products = await fakeApi();
      return (
        <div>
          <button>Get products</button>
          { products.id }
          { products.productname }
        </div>
      )
    })
    // now, we have a function that asynchronously returns JSX after 5 seconds.

    // to use this function, you should wrap it in a Suspense component, like so:
    <Suspense fallback={<div>Loading...</div>} >
      <Product />
    </Suspense>
    // the fallback prop is shown while the async task runs, once the task is done, it renders the final component.

  ``` 
  The asyncComponent function that we used simply returns the function passed to it. It should be used because IDEs throw errors when you make a functional component that returns JSX asynchronous. 
    
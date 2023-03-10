<style>
  h2 {
    color: lightblue;
  }
</style>

# NixixJS

### Nixix JS is JavaScript UI library used for creating beautiful user interfaces.

<h2>Getting started</h2>

#### To get started, you have to initialize your project with npm, that is, if you haven't already. Type this in the terminal:
```bash 
  npm init -y 
```

#### Then, configure your workspace. To do that, type:
``` bash
  npm install create-nixix-app
  npx create-nixix-app
```


#### The final step is to download the library, type:
``` bash
  npm install nixix
```
Now you are ready to code 😁!!!! 

<h2>Announcements</h2>

### NixixJS has undergone an upgrade which totally changes how it can be to used. They are: 

1. Support for JSX has been added. JSX will be it's primary templating language.The [@types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react) library was used to get intellisense for the JSX elements and their properties.

2. Components will be made from functions that return JSX elements. They are called Functional Components. They will make describing the UI  very easy to do. To demonstrate this, let's write a Functional Component that returns 'HELLO WORLD' and render it on the DOM. 

  ***App.js***
  ``` javascript 
    import Nixix from '@nixix';

    function App() {
      return (
        <h1>HELLO WORLD</h1>
      )
    }
    
    export default App;
  ```
  ***index.js***
  ``` javascript
    import Nixix from '@nixix';
    import render from '@nixix-render';
    import App from './App.js';

    render(<App />, document.querySelector('div#root'));
  ```
  ***Terminal***
  ```bash 
    npm start
  ```
  This will start a local development server on port 2000 and 'HELLO WORLD' will be displayed in your browser window.
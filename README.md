# NixixJS - A JavaScript UI library or framework used for creating performant user interfaces.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Api List](#list-of-apis)
- [Contributors](#contributors)

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

## Features 

- **NO** Virtual DOM: Nixix creates real DOM nodes and efficiently renders and updates the nodes.
- 🚀 Blazingly fast reactive primitives for DOM updates with signals and stores.
- Side effects with effect function.
- Render once mental model - components render only once.
- Component architecture.
- ReactJS-like: Nixix has a really low learning curve for developers coming from ReactJS and SolidJS

## List of Apis 

- Signal : signals are reactive values that can change over time. They can be created with two functions - callSignal and callStore. 

- callSignal : function used to create reactive values with JavaScript primitives. It returns the value passed to it and a setter.
  ```jsx
    import { callSignal } from 'nixix/primitives';
    
    const App = () => {
      const [value, setValue] = callSignal<string>('John');

      return (
        <>
          <div>{value}</div>
          <button on:click={() => setValue('Jane')}>Click me</button>
        </>
      )
    }
  ```

- callStore : function used to create reactive values with JavaScript objects and arrays. It returns the value passed to it and a setter.
  ```jsx
    import { callStore } from 'nixix/primitives';

    type Username = { name: string };

    const App = () => {
      const [username, setUserName] = callStore<Username>({ name: 'John' });

      return (
        <>
          <div>{username.name}</div>
          <button on:click={() => setUserName({ name: 'Jane' })}>Click me</button>
        </>
      )
    }

    // usage with arrays.

    const App = () => {
      const [username, setUserName] = callStore<Username>(['John']);

      return (
        <>
          <div>{username[0]}</div>
          <button on:click={() => setUserName(['Jane'])}>Click me</button>
        </>
      )
    }
  ```

- callRef : This function is used to get the a dom element instance, to do some regular dom operations on them.
  ```jsx
    import { callRef, effect, callSignal } from 'nixix/primitives';
    
    const App = () => {
      const myDiv = callRef<HTMLDivElement>()
      const [display, setDisplay] = callSignal(true);
      effect(() => {
          if (!display) {
            myDiv.current.remove();
          }
        }
      )

      return (
        <>
          <div bind:ref={myDiv} >Hello Nixix</div>
          <button on:click={() => setDisplay(false)} >Set Display</button>
        </>
      )
    }

    // refs have a current property whose value is the dom element which has its bind:ref prop's value as that ref.
    // once the signal's value is set to false, the dom element is removed from the dom. 
  ```

- effect : This function is used to perform side effects when a reactive value changes. It subscribes to the latest created signal and calls the callback function passed to it after some time. It can also subscribe to other signals when passed an array of the signals to subscribe to and be called once and without subscribing to any signal.
  ```jsx
  import { callSignal, callStore, effect } from 'nixix/primitives';

  const App = () => {
    const [value, setValue] = callSignal(0);
    effect(() => {
        console.log(value.value)
      },
    )
    // calls the function. Whenever the signal's value changes, it calls the function again. 
    
    return (
      <button on:click={() => setValue(Math.random())} >Change Number</button>
    )
  };

  // they can also be called once without subscribing to any signal by passing 'once' as the second argument
  effect(() => {
      console.log('Ran once')
    },
    'once'
  )

  // they can also subscribe to multiple signals by passing an array of signals as the third argument
  const [count, setCount] = callSignal(0);
  const [store, setStore] = callStore({name: 'John'});
  effect(() => {
      console.log('Multiple Signals');
    },
    null,
    [count]
  )  
  ```
- renderEffect : This function does everything the effect function does, but it calls the callback function immediately, unlike the effect function which does so after some time

- asyncComponent : This function accepts an argument which is a function that should have a return type of 'Promise<JSX.Element>'. It is used to override the errors IDEs throw when a functional component has the a return type of 'Promise<JSX.Element>'.

- Suspense : This is a higher order component that is used to show a loader while an asynchronous operation which will eventually return some JSX is ongoing. It requires two props: 
  - fallback : This is the loader which the component will show until the async operation is completed.
  - onError : This is the what the component will show if the async operation fails or rejects.

  ```jsx
    import { Suspense, asyncComponent } from 'nixix/hoc';

    const AsyncToReturnJSX = asyncComponent(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            <div>Returned JSX</div>
          )
        }, 2000);
      })
    });

    const App = () => {

      return (
        <>
          <div>Hello Nixix</div>
          <Suspense fallback={<div>Loading...</div>} onError={`Couldn't return any JSX`} >
            <AsyncToReturnJSX />
          </Suspense>
        </>
      )
    }
  ```

## Contributors 

- [michTheBrandofficial](https://github.com/michTheBrandofficial)




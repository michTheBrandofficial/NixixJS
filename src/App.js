import Nixix, {fragment} from '@nixix';
import Header from './components/Header.js';
import './App.css'

// remove the JSDoc comment from fragment

function App({name, watch, classname}) {
  const update = () => {
    const main = document.querySelector('main');
    if (main.classList.contains('blue') === false) {
      main.classList.add('blue');
    } else {
      main.classList.remove('blue')
    }
  }

  return (
    <main className='black'>
      <Header />
      <button onClick={update}>click me</button>
    </main>
  )
}

export default App;
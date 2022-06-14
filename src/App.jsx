import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';




const App = () => {
  // empty dependency arr will make useEffect run only once after page is loaded
  // e.g. useEffect(() => {}, [setState]), then useEffect will run once after
  // page is loaded and when the variable(s) in the array gets updated
  useEffect(() => {

  }, [])


  return (
    <div className="App">
      <header className="App-header">
      </header>
      <canvas id="c"  >asd</canvas>
    </div>
  );
}

export default App;

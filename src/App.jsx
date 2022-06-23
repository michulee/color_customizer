import logo from './logo.svg';
import './App.css';
// import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'
import ColorThief from 'colorthief';
import product from './assets/tshirt.png'
import { useEffect } from 'react';
import { useState } from 'react';


// Notes
// https://github.com/lokesh/color-thief/issues/206#issuecomment-951182152

// TODO list
/**
 * ✅ colorthief works, returning rgb value
 * ✅ convert rgb to HSL value (converted only to hue)
 * figure out how to set both states in react in useEffect
 * get desired color in rgb (204, 0, 102) a dark pink
 * convert desired color from rgb to hsl
 * use filter HSL value on image
 */

const App = () => {
const [color, setColor] = useState();
const [hue, setHue] = useState();

const [desiredColor, setDesiredColor] = useState([204, 0, 102]);
const [desiredHue, setDesiredHue] = useState();

const [rotation, setRotation] = useState();

  // empty dependency arr will make useEffect run only once after page is loaded
  // e.g. useEffect(() => {}, [setState]), then useEffect will run once after
  // page is loaded and when the variable(s) in the array gets updated

  // TODO how to wait for two states to set????????
  // https://stackoverflow.com/a/62980056
  useEffect(() => {
    const colorThief = new ColorThief();
    const img = document.querySelector('#shirt');
    img.crossOrigin = "anonymous";
    if (img.complete) {
      setColor(colorThief.getColor(img));
      // colorThief.getColor(img);
      //  this.mopl = colorThief.getColor(img)
     } else {
       img.addEventListener('load', () => {
        setColor(colorThief.getColor(img));
        // colorThief.getColor(img);
        //  this.mopl = colorThief.getColor(img)
       });
     }
  }, [])

  function rgb2hue(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var c   = max - min;
    var hue;
    if (c == 0) {
      hue = 0;
    } else {
      switch(max) {
        case r:
          var segment = (g - b) / c;
          var shift   = 0 / 60;       // R° / (360° / hex sides)
          if (segment < 0) {          // hue > 180, full rotation
            shift = 360 / 60;         // R° / (360° / hex sides)
          }
          hue = segment + shift;
          break;
        case g:
          var segment = (b - r) / c;
          var shift   = 120 / 60;     // G° / (360° / hex sides)
          hue = segment + shift;
          break;
        case b:
          var segment = (r - g) / c;
          var shift   = 240 / 60;     // B° / (360° / hex sides)
          hue = segment + shift;
          break;
        default: return;
      }
    }
    return hue * 60; // hue is in [0,6], scale it up
  }

  const debug = () => {
    console.log('inside function')
    console.log(color);
    const [r,g,b] = color;
    const hue = rgb2hue(r,g,b);
    console.log("hue: ", hue);
    // setHue(hue);

    const [dr, dg, db] = desiredColor;
    const desiredHue = rgb2hue(dr, dg, db);
    console.log("desiredHue: ", desiredHue)

    const rotation = desiredHue - hue;
    console.log("roration: ", rotation);
  }

  // https://stackoverflow.com/a/66721731
  // useEffect with empty arr dependency only affects when states are updated
  // 1 At first, states are initialized (that's why your 1st console log was empty array)
  // 2 then DOM prints
  // 3 then lifecycle methods or hooks are initialized
  // 4 then DOM again prints with updated state.(that's why you have the objects in 2nd log) the whole process repeats when you reload your browser.
  return (
    <div className="App">
      <div className="image_wrapper"><img src={product} alt="" /></div>
      <div className="image_wrapper"><img id="shirt" src={product} alt="" /></div>
      <div className="box"></div>
      {color && debug()}

      {/* {color && <div>{color}</div>} */}
      {/* {color ? <div>{color}</div> : null} */}
    </div>
  );
}

export default App;

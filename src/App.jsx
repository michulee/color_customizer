import logo from './logo.svg';
import './App.css';
// import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'
import ColorThief from 'colorthief';
import product from './assets/tshirt.png'
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';



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

const [activeColor, setActiveColor] = useState(true);

const ColorCustomizer = styled.div`
border: 1px solid #000000;
text-align: center;

max-width: 300px;
max-height: 235px;
overflow-y: auto;
`

// how to style a dynamic list using styled components?
const ColorContainer = styled.ul`
list-style-type: none;
display: flex;
flex-direction: column;
padding: 0;

li > :first-child {
  width: 100px;
}
`


const colors = [
  {
    name: "Color #1",
    colorValue: "#000000"
  },
  {
    name: "Color #2",
    colorValue: "#FFFFFF"
  },
  {
    name: "Color #3",
    colorValue: "rgb(204, 0, 102)"
  },
  {
    name: "Color #2",
    colorValue: "#FFFFFF"
  },
  {
    name: "Color #2",
    colorValue: "#FFFFFF"
  }
]

const commonColors = {
  "borderColor": "#333333",
  "activeColor": "#FF0000"
}
const ColorList = ({data}) => {
  const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 2rem;
  `

  const ColorBox = styled.div`
  border: 2px solid #333333;
  width: 30px;
  height: 30px;
  background-color: ${({color}) => color};
  `

  const ColorColumn = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  `

  return data.map((e) => {
    return(
      <ListItem key={uuid()}>
        <div>{e.name}</div>
        <ColorColumn>
          <ColorBox color={e.colorValue}/>
          <div>{e.colorValue}</div>
        </ColorColumn>
      </ListItem>
    ) 
  })
}

const AddColor = () => {

}
const handleAddColor = (e) => {
  // onclick, add object to arr with default color white and name "Unnamed Color"

}

const ColorPreview = styled.div`
border: 1px solid rgba(0,0,0,0.3);
`
const ColorButtonsContainer = styled.div`
list-style-type: none;
display: flex;
gap: 0.5rem;
justify-content: center;
`
const ColorButtons = ({data, common}) => {
  const ListItem = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({active}) => active ? common.activeColor : common.borderColor};
  background-color: ${({color}) => color};
  `

  const handleColorButton = (e) => {
    // TODO
    // click on button, activeColor highlight around button and also switch color render
    // click on button, toggle class
    // setActiveColor(false);

  }

  return data.map((e, i) => {
    return(
      <li key={uuid()}>
        {i === 0 ? 
        <ListItem color={e.colorValue} onClick={() => handleColorButton()} active={activeColor}/> : 
        <ListItem color={e.colorValue} onClick={handleColorButton} active={!activeColor}/>
        }
        {/* <ListItem color={e.colorValue} onClick={handleColorButton}/> */}
      </li>
    ) 
  })
}

const App = styled.div`
@media screen and (min-width: 560px) {
  display: flex;
}
`

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
    // React doesn't allow <App> to be the outer element
    <App>
    {/* <> */}
      <ColorCustomizer>
        <h2>Color Presets</h2>
        <ColorContainer>
          <ColorList data={colors}/>
        </ColorContainer>
        <AddColor onClick={handleAddColor}/>
      </ColorCustomizer>

      <ColorPreview>
        <div className="image_wrapper"><img src={product} alt="" /></div>
        <div className="image_wrapper"><img id="shirt" src={product} alt="" /></div>
        <ColorButtonsContainer>
          {/* <ColorButtons data={colors} common={commonColors}/> */}
        </ColorButtonsContainer>
      </ColorPreview>
      {/* {color && debug()} */}

      {/* {color && <div>{color}</div>} */}
      {/* {color ? <div>{color}</div> : null} */}
    {/* </> */}
    </App>
  );
}

export default App;

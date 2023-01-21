import logo from './logo.svg';
import './App.css';
// import ColorThief from './node_modules/colorthief/dist/color-thief.mjs'
import ColorThief from 'colorthief';
import product from './assets/tshirt.png'
import styled from 'styled-components/macro'; // 'styled-components/macro' instead of 'styled-components' for babel plugin to see name of css in dev tools
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

// 5,161,203
const colors = [
  {
    name: "Default",
    colorValue: "transparent",
    colorValueType: "transparent",
  },
  {
    name: "Green",
    colorValue: "rgb(13, 177, 0)",
    colorValueType: "rgb",
  },
  {
    name: "Yellow",
    colorValue: "rgb(255, 177, 0)",
    colorValueType: "rgb",
  },
  {
    name: "Pink",
    colorValue: "rgb(204, 0, 102)",
    colorValueType: "rgb",
  }
]

const commonColors = {
  "borderColor": "#333333",
  "activeColor": "#FF0000"
}

const App = () => {
  // TODO keep rgb color 5,161,203 as reference for hue rotation
const [color, setColor] = useState(colors[1].colorValue);
const [activeColor, setActiveColor] = useState(colors[1].colorValue);

// originalColor is converted to hue in getHueRotation()
const [originalColor, setOriginalColor] = useState();
const [hue, setHue] = useState();


// use activeColor instead
// const [desiredColor, setDesiredColor] = useState([204, 0, 102]);
// const [desiredColor, setDesiredColor] = useState(activeColor);
// const [desiredColor, setDesiredColor] = useState(colors[1].colorValue);
const [desiredHue, setDesiredHue] = useState();

const [rotation, setRotation] = useState();

const [activeColorBoolean, setActiveColorBoolean] = useState(false);


const ColorCustomizer = styled.div`
// border: 1px solid #000000;
text-align: center;

// max-width: 300px;
max-height: 245px;
overflow-y: scroll;
background-color: #f2f2f2;

@media screen and (min-width: 560px) {
  min-width: 330px;
  max-height: 100%;
  // border-radius: 5px;
  // box-shadow:  0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  // -webkit-box-shadow:  0px 12px 24px -12px rgba(0, 0, 0, 0.5);
}
`

// how to style a dynamic list using styled components?
const ColorContainer = styled.ul`
list-style-type: none;
display: flex;
flex-direction: column;
padding: 0;
// gap: 5px;
margin: 0;

li > :first-child {
  width: 100px;
}
li > :nth-child(2) {
  width: 50px;
}
`



const ColorList = ({data}) => {
  const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  cursor: pointer;
  border: 2px solid transparent;

  :hover, :focus {
    // background-color: rgba(0,0,0,0.1);
    border: 2px solid #007aff;
  }
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

  const handleColorSelection = (colorValue) => {
    console.log("handleColorSelection: " + colorValue)
    setActiveColor(colorValue);
    if(colorValue) {
      console.log("activeColor: ", colorValue)
    }
  }

  return data.map((e) => {
    return(
      <ListItem key={uuid()} onClick={() => handleColorSelection(e.colorValue)}>
        <div aria-label={"color name is " + e.name}>{e.name}</div>
        <ColorColumn>
          <ColorBox color={e.colorValue} aria-label={e.colorValueType + "value " + e.colorValue}/>
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
// border: 1px solid rgba(0,0,0,0.3);
// height: 100%;
// display: flex;

@media screen and (min-width: 560px) {
  // max-width: 600px;
  // height: 100%;
  max-height: 500px;
  border-radius: 5px;
  margin: 20px;

  // box-shadow:  0px 12px 24px -12px rgba(0, 0, 0, 0.5);
  // -webkit-box-shadow:  0px 12px 24px -12px rgba(0, 0, 0, 0.5);

  box-shadow:  0px 12px 19px -3px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow:  0px 12px 19px -3px rgba(0, 0, 0, 0.5);
}
`
const ColorButtonsContainer = styled.div`
list-style-type: none;
display: flex;
gap: 0.5rem;
justify-content: center;
margin: 20px;
`
const ColorButtons = ({data, common}) => {
  const ListItem = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${({active}) => active ? common.activeColor : common.borderColor};
  background-color: ${({color}) => color};
  `

  const handleColorButton = (colorValue) => {
    // TODO
    // click on button, activeColor highlight around button and also switch color render
    // click on button, toggle class
    console.log("handleColorSelection: " + colorValue)
    setActiveColor(colorValue);

    // NOT the previous state
    setActiveColorBoolean(state => !state)
  }

  return data.map((e, i) => {
    return(
      <li key={uuid()}>
        {/* i === 0 is initial, change active onclick */}
        {
        // i === 0 ? 
        // <ListItem color={e.colorValue} onClick={() => handleColorButton(e.colorValue)} active={activeColorBoolean}/> 
        // : 
        <ListItem color={e.colorValue} onClick={() => handleColorButton(e.colorValue)} active={activeColorBoolean}/>
        // null
        }
        {/* <ListItem color={e.colorValue} onClick={handleColorButton}/> */}
      </li>
    ) 
  })
}

const ProductWrapper = styled.div`
@media screen and (min-width: 560px) {
  max-width: 600px;
  height: 100%;
  margin: 0 auto;
}
`



const App = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
gap: 30px;
@media screen and (min-width: 560px) {
  flex-direction: row;
  gap: 0;
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
      // setColor(colorThief.getColor(img));
      setOriginalColor(colorThief.getColor(img));
      // colorThief.getColor(img);
      //  this.mopl = colorThief.getColor(img)
     } else {
       img.addEventListener('load', () => {
        // setColor(colorThief.getColor(img));
        setOriginalColor(colorThief.getColor(img));
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

  const Product = ({data, common, id, src}) => {
    const getRGBValue = (rgbValue) => {
      // TODO remove rgb(...) keep only the numbers
      const beg = rgbValue.indexOf("(")
      const end = rgbValue.indexOf(")")

      const trimEdges = rgbValue.slice(beg+1, end);
      const [dr, dg, db] = trimEdges.split(/( *, *)/g).filter((e, i) => i%2 === 0);

      return [dr, dg, db]
    }

    const getHueRotation = (rgbValue) => {
      if(originalColor && activeColor) {
        console.log('inside function')
        console.log("color: ", originalColor);
        const [r,g,b] = originalColor;
        const hue = rgb2hue(r,g,b);
        console.log("hue: ", hue);
        // setHue(hue);
    
        const [dr, dg, db] = getRGBValue(activeColor)
        const desiredHue = rgb2hue(dr, dg, db);
        console.log("desiredHue: ", desiredHue)
    
        const rotation = desiredHue - hue;
        console.log("rotation: ", rotation);
    
        return rotation;
      }
    }
  
    const Image = styled.img`
      /* filter: hue-rotate(136.969deg); */
      /* background-color: pink; */
    
      filter: hue-rotate(${(activeColor === "transparent" ? 0 : getHueRotation(activeColor))}deg);
    
      display: block;
      object-fit: contain;
      width: 100%;
      height: 100%;
      padding: 20px 0;
    `
  
  
    return <Image id={id} src={src}/>;
  }

  const debug = () => {
    console.log('inside function')
    console.log(color);
    const [r,g,b] = color;
    const hue = rgb2hue(r,g,b);
    console.log("hue: ", hue);
    // setHue(hue);

    const [dr, dg, db] = activeColor;
    const desiredHue = rgb2hue(dr, dg, db);
    console.log("desiredHue: ", desiredHue)

    const rotation = desiredHue - hue;
    console.log("rotation: ", rotation);
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
        {/* original pic */}
        {/* <ImageWrapper><img src={product} alt="" /></ImageWrapper> */}
        {/* altered pic */}
        {/* <ImageWrapper><img id="shirt" src={product} alt="" /></ImageWrapper> */}
        {/* <div className="image_wrapper"><img id="shirt" src={product} alt="" /></div> */}
        <div className="image_wrapper"><Product id="shirt" src={product} alt="" /></div>

        {/* <ProductWrapper> */}
          {/* <Product/> */}
        {/* </ProductWrapper> */}

        {/* <ColorButtonsContainer> */}
          {/* <ColorButtons data={colors} common={commonColors}/> */}
        {/* </ColorButtonsContainer> */}
      </ColorPreview>

      {/* TODO */}
      {/* returns rgb value from ColorThief API */}
      {/* rgb(5, 161,203) is the base blue color */}
      {/* TODO now I need to turn the base color into one of the presets */}
      {/* 
      - follow debug()
      - insert rgb value of color preset to return the hue rotation value
      - insert hue rotation value as a property value
       */}
      {/* {console.log(color)} */}

      {/* {color && debug()} */}

      {/* {color && <div>{color}</div>} */}
      {/* {color ? <div>{color}</div> : null} */}
    {/* </> */}
    </App>
  );
}

export default App;

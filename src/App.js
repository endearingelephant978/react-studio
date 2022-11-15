import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
    item.image = process.env.PUBLIC_URL + "/" + item.image;
});
/* ############################################################## */

function App() {
    // TODO: use useState to create a state variable to hold the state of the cart
    /* add your cart state code here */
    const [cart, setCart] = useState([])
    
    const addToCart = (index) => {
        setCart([...cart, index])
    }

    const prices = cart.map((index) => (bakeryData[index].price))
    let total = prices.reduce((a,b) => a + b, 0)
    total = Math.round((total + Number.EPSILON) * 100) / 100

    return (
        <div className="App">
            <h1>🧁 The Bakery 🧁</h1>
            {bakeryData.map((item, index) => (
                <BakeryItem name={item.name} desc={item.description} price={item.price} image={item.image} onAddToCart={() => addToCart(index)} />
            ))}

            <div>
                <h2>🛒 Cart 🛒</h2>
                {cart.map((index) => (
                    <CartItem index={index}/>
                ))}
            </div>

            <h1>Your total is ${total} 💰</h1> 
        </div>
    );
}

function BakeryItem(props) {
    return (
        <>
            <h3>{props.name}</h3>
            <p>{props.desc}</p>
            <div>
                <img src={props.image} alt={'picture of ' + props.name}></img>
            </div>
            <button onClick={props.onAddToCart}>add to cart for ${props.price}</button>
        </>
    )
}

function CartItem(props) {
    return (
        <>
            <p>{bakeryData[props.index].name + ' x 1 for $' + bakeryData[props.index].price}</p>
        </>
    )
}

export default App;

import {useState,useEffect} from 'react';
import './index.css'

const PRODUCTS = [

    { id: 1, name: "Laptop", price: 500 },
  
    { id: 2, name: "Smartphone", price: 300 },
  
    { id: 3, name: "Headphones", price: 100 },
  
    { id: 4, name: "Smartwatch", price: 150 },
  
  ];
  
  
  const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
  
  const THRESHOLD = 1000;

 const ShoppingCart=()=>{
    const [cart, setCart]=useState([]);
    const [progress,setProgress]=useState(0);

    useEffect(()=>{
        const total=cart.reduce((sum,item)=> sum +item.price * item.quantity, 0);
        setProgress(total);

        if(total >= THRESHOLD && !cart.find((item)=> item.id === FREE_GIFT.id)){
            setCart([...cart, {...FREE_GIFT,quantity: 1}]);
        }else if(total < THRESHOLD){
            setCart(cart.filter((item)=>item.id !== FREE_GIFT.id));
        }
    },[cart]);

    const addToCart=(product)=>{
        setCart((prevCart)=>{
            const existing =prevCart.find((item)=>item.id === product.id);
            return existing 
            ? prevCart.map((item)=> item.id === product.id ? {...item, quantity:item.quantity +1}:item
        ):[...prevCart,{...product,quantity:1}];
        });
    };

    const updateQuantity =(id,delta)=>{
        setCart((prevCart)=>
        prevCart.map((item)=> (item.id === id ? {...item,quantity:item.quantity+delta}:item))
        .filter((item)=> item.quantity > 0)
        );
    };

    return(
        <div className ='container'>
            <h1>Shopping Cart</h1>
            <div className='products'>
                {PRODUCTS.map((product)=> (
                    <div key={product.id} className='product-card'>
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                        <button onClick={()=>addToCart(product)}>Add to Cart</button>
                        </div>
                ))}
        </div>
        <hr/>
        <h2>Cart</h2>
        <p className='threshold-msg'>
            {progress >= THRESHOLD ? 'Free gift added to your cart!' : `Spend $$ {Threshold - progress} more to unlock gift!`}
        </p>
        <div className='progress-bar'>
                <div className='progress'
                    style ={{width :`${Math.min((progress/ THRESHOLD)*100, 100)}%`}}>
                </div>
        </div>
        {cart.length > 0 ? (
            cart.map((item) => (
                <div key={item.id} className='cart-item'>
                    <h3>{item.name} ({item.quantity})</h3>
                    <p> ${item.price * item.quqntity}</p>
                    {item.id !== FREE_GIFT.id &&(
                        <div className='quantity-buttons'>
                            <button onClick={()=>updateQuantity(item.id,-1)}>-</button>
                            <button onClick={()=>updateQuantity(item.id,-1)}>-</button>
                            </div>
                    )}
                </div>
            ))
        ):(
            <p>Cart is empty.</p>
        )}
        </div>
    );
  }

  export default ShoppingCart;
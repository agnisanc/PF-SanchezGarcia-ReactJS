import { useState, createContext } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log( 'CART: ', cart)

    const addItem = (ProductToAdd) =>{
    if(!isInCart(ProductToAdd.id)) {
        setCart(prev => [...prev, ProductToAdd])
    } else {
        console.error('El producto ya ha sido agregado al carrito.')
    }
    }
    
    const isInCart = (id) => {
    return cart.some(prod => prod.id === id)
    }

    const clearCart = () => {
        setCart([])
    }

    const getTotalQuantity = () => {
    let accumulator = 0

    cart.forEach(prod => {
        accumulator += prod.quantity
    })
    return accumulator
    }

    const totalQuantity = getTotalQuantity()

    const getTotal = () => {
        let accumulator = 0
    
        cart.forEach(prod => {
            accumulator += prod.quantity * prod.price
        })
        return accumulator
        }
    
        const total = getTotal()
    return(
        <CartContext.Provider value={{cart, addItem, totalQuantity, total, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
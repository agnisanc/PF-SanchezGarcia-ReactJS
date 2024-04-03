import cartIcon from "./assets/carticon.png"
import classes from "./Cart.module.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"


const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    return (
        <div className={classes.cartContainer}>
        <img className={classes.img} src={cartIcon} alt="Cart icon" />
        {totalQuantity}
        </div>
    )
}

export default CartWidget
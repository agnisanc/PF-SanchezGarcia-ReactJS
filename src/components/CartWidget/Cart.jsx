import cartIcon from "./assets/carticon.png"
import classes from "./Cart.module.css"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from 'react-router-dom'

const CartWidget = () => {
    const { totalQuantity } = useContext(CartContext)

    return (
        <Link to={'/cart'} className={classes.cartContainer}>
        <div className={classes.cartContainer}>
        <img className={classes.img} src={cartIcon} alt="Cart icon" />
        {totalQuantity}
        </div>
        </Link>
    )
}

export default CartWidget
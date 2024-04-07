import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import classes from "./CartView.module.css"

const CartView = () => {
    const { cart } = useContext(CartContext)
    
    const totalAmount = () => {
        let total = 0;
        cart.forEach(prod => {
            total += prod.quantity * prod.price;
        });
        return total;
    };

    return (
        <div>
            <div className={classes.mainTitle}>
            <h1>TUS COMPRAS</h1>
            </div>
            <div className={classes.headlines}>
                <h2>Cantidad</h2>
                <h2>Joya</h2>
                <h2>Precio por unidad</h2>
            </div>
            <section>
            { cart.length === 0 ? 
                <section>
                    <div className={classes.empty}>
                    <h2>No has agregado nignuna joya al carrito!</h2>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Link to='/'className={`${classes.button} ${classes.buttonHover}`}>Ir al incio</Link>
                    </div>
                </section>
                :
            

            
                cart.map(prod => {
                    return (
                        <div key={prod.id}>
                        <article className={classes.details} >
                            <h3>{prod.quantity}</h3>
                            <h3>{prod.name}</h3>
                            <h3>$ {prod.price}</h3>
                        </article>
                        </div>
                    )
                })
            }
            </section>
            <div className={classes.priceDetail}>
                <h3>Total de su compra: ${totalAmount()}</h3>
            </div>
            <div className={classes.buttonContainer}>
                <Link to='/checkout'className={`${classes.button} ${classes.buttonHover}`}>COMPRAR!</Link>
            </div>
        </div>
    )
}

export default CartView
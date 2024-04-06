import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"

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
            <h1>Tus compras</h1>
            <section>
            {
            
                cart.map(prod => {
                    return (
                        <div>
                        <article key={prod.id}>
                            <h2>{prod.quantity}</h2>
                            <h2>{prod.name}</h2>
                            <h2>{prod.price}</h2>
                        </article>
                        </div>
                    )
                })
            }
            </section>
            <div>
                <h3>Total de su compra: ${totalAmount()}</h3>
            </div>
            <Link to='/checkout'>Comprar</Link>
        </div>
    )
}

export default CartView
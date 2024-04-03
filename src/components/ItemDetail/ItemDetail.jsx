import ItemCount from "../ItemCount/ItemCount"
import classes from "./ItemDetail.module.css"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../context/CartContext"


const ItemDetail = ({ name, category, stock, price, image, type, id}) => {

    const [quantity, setQuantity] = useState(0)

    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        const objProductToAdd = {
            id, name, price, quantity
        }
        console.log(objProductToAdd)
        console.log('Se ha agregado al carrito: ', quantity)
        setQuantity(quantity)
        addItem(objProductToAdd)
    }
    return (
        <article className={classes.itemDetail}>
            <div className={classes.image}>
            <img src={image} style={{width: 400}}/>
            </div>
            <div className={classes.details}>
            <h3>{name}</h3>
            <h3>Material: {category}</h3>
            <h3>Tipo: {type}</h3>
            <h3>${price}</h3>
            </div>
            <footer>
                {
                    quantity === 0 ? (
                        <ItemCount onAdd={handleOnAdd} stock={stock}/>
                    ) : (
                        <Link to='/cart'>Finalizar tu compra!</Link>
                    )
                }
            </footer>
        </article>
    )
}

export default ItemDetail
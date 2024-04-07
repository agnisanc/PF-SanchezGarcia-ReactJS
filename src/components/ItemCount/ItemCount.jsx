import { useState } from "react"
import classes from "./ItemCount.module.css"


const ItemCount = ({initial = 1, stock, onAdd}) => {

    const [count, setCount] = useState (initial)

    const decrease = () => {
        if (count > 1) {
            setCount(prev => prev - 1)
        }
    }

    const increase = () => {
        if (count < stock) {
            setCount(prev => prev + 1)
        }
    }


    return (
        <article >
            <h4>{count}</h4>
            <button onClick = {() => onAdd(count)} className={classes.button}>AGREGAR</button>
            <button onClick = {increase} className={classes.buttonAdd}>+</button>
            <button onClick = {decrease}className={classes.buttonAdd}>-</button>
        </article>
    )
}

export default ItemCount
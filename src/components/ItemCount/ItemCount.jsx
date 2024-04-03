import { useState } from "react"


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
        <article>
            <h4>{count}</h4>
            <button onClick = {() => onAdd(count)}>Agregar</button>
            <button onClick = {increase}>+</button>
            <button onClick = {decrease}>-</button>
        </article>
    )
}

export default ItemCount
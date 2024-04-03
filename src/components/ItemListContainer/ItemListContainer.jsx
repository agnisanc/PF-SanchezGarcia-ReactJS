import { useState, useEffect } from "react"
import { getProducts, getProductsByCategory } from "../AsyncMock/asyncMock.js"
import ItemList from "../ItemList/ItemList.jsx"
import { useParams } from "react-router-dom"
import classes from "./ItemListContainer.module.css"


const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        
        const asyncFunction = categoryId ? getProductsByCategory : getProducts

        asyncFunction(categoryId)
            .then(result => {
                setProducts(result)
            })
    }, [categoryId])

    return (
    <div>
        <h2 className={classes.greeting}>{ greeting }</h2>
        <div className={classes.products}>
            <ItemList products={products} />
        </div>
    </div>
    )
}

export default ItemListContainer
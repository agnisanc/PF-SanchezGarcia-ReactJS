import Item from "../Item/Item.jsx"
import classes from "../ItemList/ItemList.module.css"

const ItemList = ({ products }) => {
    return (
        <section className={classes.products}>
            {
                products.map(product => {
                    return <div><Item key={product.id} {...product} /></div>
                })
            }
        </section>
    )
}

export default ItemList
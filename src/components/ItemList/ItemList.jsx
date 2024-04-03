import Item from "../Item/Item.jsx"

const ItemList = ({ products }) => {
    return (
        <section>
            {
                products.map(product => {
                    return <div><Item key={product.id} {...product} /></div>
                })
            }
        </section>
    )
}

export default ItemList
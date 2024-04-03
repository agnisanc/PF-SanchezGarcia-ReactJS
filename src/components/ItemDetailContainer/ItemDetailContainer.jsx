import { useState, useEffect } from "react"
import { getProductById } from "../AsyncMock/asyncMock.js"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import { useParams } from "react-router-dom"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {
        getProductById(itemId)
            .then(result => {
                setProduct(result)
            })
    }, [itemId])

    return (
        <main>
            <ItemDetail {...product}/>
        </main>
    )
}

export default ItemDetailContainer
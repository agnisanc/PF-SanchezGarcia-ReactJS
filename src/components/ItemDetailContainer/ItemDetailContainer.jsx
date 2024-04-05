import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail/ItemDetail.jsx"
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig.js"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)

    const { itemId } = useParams()

    useEffect(() => {
        const productDoc = doc(db, 'products', itemId)
        getDoc(productDoc)
            .then(queryDocumentSnapshot => {
                const data = queryDocumentSnapshot.data()
                const productAdapted = { id: queryDocumentSnapshot.id, ...data }
            
            setProduct(productAdapted)
            })
            .catch()
    }, [itemId])

    return (
        <main>
            <ItemDetail {...product}/>
        </main>
    )
}

export default ItemDetailContainer
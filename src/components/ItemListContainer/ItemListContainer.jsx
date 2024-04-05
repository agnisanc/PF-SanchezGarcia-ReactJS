import { useState, useEffect } from "react"
import ItemList from "../ItemList/ItemList.jsx"
import { useParams } from "react-router-dom"
import classes from "./ItemListContainer.module.css"
import { getDocs, collection, query,  where} from "firebase/firestore"
import { db } from "../../services/firebase/firebaseConfig.js"

const ItemListContainer = ({ greeting }) => {

    const [products, setProducts] = useState([])

    const { categoryId } = useParams()

    useEffect(() => {
        
        const productCollection = categoryId ? (
            query(collection(db, 'products'), where('category', '==', categoryId))
        ) : ( 
            collection(db, 'products')
        )

        getDocs(productCollection)
            .then(QuerySnapshot =>{
                const productsAdapted = QuerySnapshot.docs.map(doc =>{
                    const data = doc.data()
                    return { id: doc.id, ...data}
                })
                setProducts(productsAdapted)
            })
            .catch(() => {
                showNotification('Se presento un error al cargar los productos.')
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
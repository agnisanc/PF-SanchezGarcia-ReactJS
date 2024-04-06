import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { collection, query, where, documentId, getDocs, addDoc, writeBatch  } from "firebase/firestore"
import { Link } from "react-router-dom"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const { cart, total, clearCart } = useContext(CartContext)

    const [userData, setUserData] = useState({
        name: '',
        card: '',
        code: '',
        fees: '',
        phone: '',
        email: '',
        confirmEmail: '',
        adress: '',
        numberAdress: '',
        postal: '',

    })

    function handleInputChange(e) {
        const { name, value} = e.target;
        setUserData(prevData => ({...prevData,[name]: value}))
    }



    const createOrder = async () => {
        try {
            setLoading(true)
            const batch = writeBatch(db)
            const outStock = []
    
            const ids = cart.map(prod => prod.id)
            const productsCollection = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const querySnapshot = await getDocs(productsCollection)
            const { docs } = querySnapshot
    
            docs.forEach(doc => {
                const data = doc.data()
                const stockDb = data.stock
                const productsAddedCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productsAddedCart.quantity
    
                if(stockDb >= prodQuantity ) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outStock.push({ id: doc.id, ...data })
                }
            })
    
            if (outStock.length === 0) {
                if (userData.email !== userData.confirmEmail) {
                    console.error('Los correos electrónicos ingresados no coinciden.');
                    setLoading(false);
                    return;
                }

                const objOrder = {
                    buyer: userData,
                    items: [],
                    total: total
                };

                batch.commit()
                const orderCollection = collection(db, 'orders')
                const { id } = await addDoc(orderCollection, objOrder)
                setOrderId(id)
                clearCart()

            } else {
                console.error('Algunos de estos productos no poseen stock!')
            }
    
        } catch (error) {
            console.error('Ocurrio un error al intentar generar su orden.')
        }  finally {
            setLoading(false)
        }
    }

    if(loading) {
        return <h3>Tu orden esta siendo generada. Por favor, aguarda.</h3>
    }

    if(orderId){
        return(
        <div>
        <h2>Su codigo de compra es: {orderId}</h2>
        <Link to='/'>Volver al inicio</Link>
        </div>)
    }





    return (
        <div>
            <h2>Ingresa tus datos para finalizar la compra:</h2>
            <form>
            <div>
                <label>Nombre</label>
                <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
            </div>
            <div>
                <label>Tarjeta de Credito</label>
                <input type="number" name="card" value={userData.card} onChange={handleInputChange} />
            </div>
            <div>
                <label>Codigo de seguridad</label>
                <input type="number" name="code" value={userData.code} onChange={handleInputChange} />
            </div>
            <div>
                <label>Numero de cuotas</label>
                <select value={userData.fees} onChange={handleInputChange}>
                    <option>1 cuota</option>
                    <option>3 cuotas</option>
                    <option>6 cuotas</option>
                    <option>12 cuotas</option>
                </select>
            </div>
            <div>
                <label>Telefono</label>
                <input type="number" name="phone" value={userData.phone} onChange={handleInputChange} />
            </div>
            <div>
                <label>Correo electronico</label>
                <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div>
                <label>Confirme su correo electronico</label>
                <input type="email" name="confirmEmail" value={userData.confirmEmail} onChange={handleInputChange} />
            </div>
            <div>
                <label>Direccion en la Ciudad de Córdoba</label>
                <input type="text" name="adress" value={userData.adress} onChange={handleInputChange} />
            </div>
            <div>
                <label>Altura</label>
                <input type="number" name="numberAdress" value={userData.numberAdress} onChange={handleInputChange} />
            </div>
            <div>
                <label>Codigo Postal</label>
                <input type="number" name="postal" value={userData.postal} onChange={handleInputChange} />
            </div>
            </form>
            <button onClick={createOrder}>Comprar!</button>
        </div>
    )
}

export default Checkout
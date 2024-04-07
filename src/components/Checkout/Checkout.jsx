import { useState, useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { db } from "../../services/firebase/firebaseConfig"
import { collection, query, where, documentId, getDocs, addDoc, writeBatch  } from "firebase/firestore"
import { Link } from "react-router-dom"
import classes from "./Checkout.module.css"

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
        return (
            <div className={classes.brief}>
            <h3 className={classes.sectionTitle}>Tu orden esta siendo generada. Por favor, aguarda.</h3>
            </div>
        )
    }

    if(orderId){
        return(
        <div className={classes.brief}>
        <h2 className={classes.sectionTitle}>Su codigo de compra es: {orderId}</h2>
        <h2 className={classes.sectionTitle}>Muchas gracias por su compra!</h2>
        <div className={classes.buttonContainer}>
        <Link to='/' className={`${classes.button} ${classes.buttonHover}`}>Volver al inicio</Link>
        </div>
        </div>)
    }





    return (
        <div>
            <h2 className={classes.sectionTitle}>Ingresa tus datos para finalizar la compra:</h2>
            <form className={classes.formDisplay}>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Nombre</label>
                <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Tarjeta de Credito</label>
                <input type="number" name="card" value={userData.card} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Codigo de seguridad</label>
                <input type="number" name="code" value={userData.code} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Numero de cuotas</label>
                <select value={userData.fees} onChange={handleInputChange}>
                    <option>1 cuota</option>
                    <option>3 cuotas</option>
                    <option>6 cuotas</option>
                    <option>12 cuotas</option>
                </select>
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Telefono</label>
                <input type="number" name="phone" value={userData.phone} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Correo electronico</label>
                <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Confirme su correo electronico</label>
                <input type="email" name="confirmEmail" value={userData.confirmEmail} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Direccion en la Ciudad de Córdoba</label>
                <input type="text" name="adress" value={userData.adress} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Altura</label>
                <input type="number" name="numberAdress" value={userData.numberAdress} onChange={handleInputChange} />
            </div>
            <div className={classes.formInput}>
                <label className={classes.formTitle}>Codigo Postal</label>
                <input type="number" name="postal" value={userData.postal} onChange={handleInputChange} />
            </div>
            </form>
            <div className={classes.buttonContainer}>
                <button onClick={createOrder} className={`${classes.button} ${classes.buttonHover}`}>Comprar!</button>
            </div>
        </div>
    )
}

export default Checkout
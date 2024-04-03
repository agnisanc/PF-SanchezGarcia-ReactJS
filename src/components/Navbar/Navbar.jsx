import CartWidget from "../CartWidget/Cart.jsx"
import { Link } from "react-router-dom"
import classes from "./Navbar.module.css"



const Navbar = () => {
    return (
        <>
        <header className={classes.header}>
        <div className={classes.title}>
        <h1><Link to='/' className={classes.link}>JOYAS AUREOM</Link></h1>
        <CartWidget />
        </div>
        <nav className = {classes.navbar}>
            <h2><Link to='/category/Oro' className={classes.link}>Oro</Link></h2>
            <h2><Link to='/category/Plata' className={classes.link}>Plata</Link></h2>
        </nav>
        </header>
        </>
    )
}

export default Navbar
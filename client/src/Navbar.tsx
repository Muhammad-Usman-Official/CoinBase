import { Link } from "react-router-dom";

const Navbar = () => {
    return <nav className={``}>
        <ul className={`flex container mx-auto`}>
            <li>
                <Link className={`p-3 block hover:bg-blue-200 active:opacity-80`} to={'/'}>Home</Link>
            </li>
            <li>
                <Link className={`p-3 block hover:bg-blue-200 active:opacity-80`} to={'/login'}>Login</Link>
            </li>
            <li>
                <Link className={`p-3 block hover:bg-blue-200 active:opacity-80`} to={'/signup'}>Sign up</Link>
            </li>
        </ul>
    </nav>
}


export default Navbar;


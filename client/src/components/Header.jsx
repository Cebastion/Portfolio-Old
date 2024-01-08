import { Link } from "react-router-dom";
import '../css/header.css'


function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <ul className="header__menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/works">Works</Link></li>
                    <li><Link to="/offers">Offers</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
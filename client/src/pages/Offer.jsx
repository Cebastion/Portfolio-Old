import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { offers } from "../API/offers";
import '../css/offer.css'


function Offer() {
    const { id } = useParams()
    let offer = offers.filter(offerid => offerid.id == id)
    return (
        <div className="wellaper">
            <Header />
            <main className="content">
                <div className="contant__container">
                    <div className="content__offer">
                        {offer.map(el => {
                            return (
                                <div key={el.id} className="offer__block">
                                    <div className="offer__title">
                                        <h2>{el.title}</h2>
                                    </div>
                                    <div className="offer__img">
                                        <img src={el.img} alt="" />
                                    </div>
                                    <div className="offer__description">
                                        <div className="description__title">
                                            <span>What you deliver with this Offer</span>
                                        </div>
                                        <div className="description__text">
                                            <span>{el.desription}</span>
                                        </div>
                                    </div>
                                    <div className="offer__order">
                                        <div className="order__price">
                                            <span>{el.price}$</span>
                                        </div>
                                        <Link to="/contact">
                                            <button className="offer__button">
                                                Order
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export { Offer };
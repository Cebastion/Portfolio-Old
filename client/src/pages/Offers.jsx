import ListAllOffers from '../components/ListAllOffers';
import '../css/offers.css'
import Header from "../components/Header";
import Footer from "../components/Footer";

function Offers() {
    return (
        <div className="wellaper">
            <Header />
            <main className="content">
                <div className="contant__container">
                    <div className="content__offers">
                        <div className="offers__title">
                            <span>All offers</span>
                        </div>
                        <ListAllOffers/>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export { Offers };
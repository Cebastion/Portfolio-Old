import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/style.css'
import ListAllWorks from "../components/ListAllWorks";

function WorkPage() {
    return ( 
        <div className="wellaper">
            <Header/>
            <main className="content">
                <div className="contant__container">
                    <div className="contact__works">
                        <div className="works__title">
                            <span>All works</span>
                        </div>
                        <ListAllWorks/>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export {WorkPage};
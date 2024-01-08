import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/contact.css'

function ContactPage() {
    const [formData, setFormData] = useState({
        nameproject: '',
        email: '',
        offer: '',
    });

    async function SendOffer(event) {
        event.preventDefault();
        try {
            await fetch('https://server-sand-kappa.vercel.app/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error(error);
        }
        ClearInput()
    }

    function ClearInput() {
        setFormData(
            {
                nameproject: '',
                email: '',
                offer: '',
            }
        )
    }

    return (
        <div className="wellaper">
            <Header />
            <main className="content">
                <div className="contant__container">
                    <div className="content__form-email">
                        <div className="email__title">
                            <h2>Send me an offer!</h2>
                        </div>
                        <form className="email__form" onSubmit={SendOffer} /*action="http://portfolio/server/server.php" method="post"*/ >
                            <label htmlFor="nameproject">Name project:</label>
                            <input type="text" name="nameproject" placeholder="The name of your project" value={formData.nameproject} onChange={e => setFormData(prev => ({ ...prev, nameproject: e.target.value }))} />
                            <label htmlFor="email">Email:</label>
                            <input type="email" name="email" placeholder="Your email" value={formData.email} onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))} />
                            <label htmlFor="offer">Your offer:</label>
                            <textarea onChange={e => setFormData(prev => ({ ...prev, offer: e.target.value }))} value={formData.offer} name="offer" id="" cols="30" rows="10" placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus quod voluptas accusamus suscipit, maxime amet officia voluptates veritatis praesentium voluptate, magnam sed quas et voluptatem. Cum ducimus neque omnis voluptatibus. Quasi, culpa iusto amet suscipit qui ad id, vel laudantium excepturi molestiae libero expedita perferendis quos dolor et dolores nisi!"></textarea>
                            <button type="submit">Send</button>
                        </form>
                    </div>
                    <div className="content__contact-freelance">
                        <div className="freelance__title">
                            <h2>I'm on the exchanges !</h2>
                        </div>
                        <div className="freelance__row">
                            <a href=" https://www.fiverr.com/dimakosenko">
                                <img src="/img/fiverr.webp" alt="" />
                            </a>
                            <a href="https://www.upwork.com/freelancers/~0103cb072ea799561b">
                                <img src="/img/upwork.webp" alt="" />
                            </a>
                            <a href="https://www.peopleperhour.com/freelancer/technology-programming/dmytro-kosenko-full-stack-developer-nmwvwxx">
                                <img src="/img/peopleperhour.webp" alt="" />
                            </a>
                            <a href="https://www.freelancer.com.ru/u/DmytroKosenko">
                                <img src="/img/freelancer.webp" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export { ContactPage };



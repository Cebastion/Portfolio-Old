import { Link } from "react-router-dom";
import '../css/error.css'

function ErrorPage() {
    return (
        <div className="wellaper">
            <main className="content">
                <div className="content__error">
                    <h2>Error 404</h2>
                    <p>Oops, please go back to the <Link to="/">main page</Link></p>
                </div>
            </main>
        </div>
    );
}

export { ErrorPage };
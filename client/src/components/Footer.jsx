import '../css/footer.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__icons">
                    <a href="https://t.me/obaldui_3000_official"><img src="/img/telegram.webp" alt="" /></a>
                    <a href="https://www.linkedin.com/in/dmytro-kosenko-49b4ab27b/"><img src="/img/linked.webp" alt="" /></a>
                </div>
                <div className="footer__copywrite">
                    <span>Copyright ©2023 All rights reserved</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
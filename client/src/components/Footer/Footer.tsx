import style from './footer.module.scss'

function Footer() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <footer className={style.footer}>
            <div className={style.footer__container}>
                <div className={style.footer__icons}>
                    <a href="https://t.me/obaldui_3000_official"><img src="/img/telegram.webp" alt="" /></a>
                    <a href="https://www.linkedin.com/in/dmytro-kosenko-49b4ab27b/"><img src="/img/linked.webp" alt="" /></a>
                </div>
                <div className={style.footer__copywrite}>
                    <span>Copyright ©{year} All rights reserved</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
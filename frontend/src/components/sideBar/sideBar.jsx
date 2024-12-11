import {useEffect, useState} from 'react'
import styles from "./sideBar.module.css"
import { useLocation } from 'react-router-dom';

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = useLocation().pathname;

    useEffect(() => {
        const getStatus = localStorage.getItem('sideBarOpened');
        if (getStatus === 'true') {
            setIsOpen(true);
        }
    }, []);

    useEffect (() => {
        localStorage.setItem('sideBarOpened', isOpen);
    }, [isOpen])
    function toggleSideBar() {
        setIsOpen(!isOpen); 
    }

    return ( 
        <>
            <aside className={`${styles.sideBar} ${isOpen ? styles.open : ''}`}>
                <div className={styles.topSideBar}>
                    <button className={styles.btnMenu} onClick={toggleSideBar}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                            className={styles.iconMenu}>
                            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                        </svg>
                    </button>
                </div>
                <div className={styles.middleSideBar}>
                    <ul className={styles.sideBarList}>
                        <li className={`${styles.sideBarListItem} ${isActive === '/inicio' ? styles.active : ''}`}>
                            <a className={styles.sideBarLink} href="/inicio" title="Inicio">
                                {/* inicio Icon*/}
                                <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M10.0044 3.61865H3.00439V10.6187H10.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 3.61865H14.0044V10.6187H21.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 14.6187H14.0044V21.6187H21.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.0044 14.6187H3.00439V21.6187H10.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className={styles.sideBarOpened}>Início</div>
                            </a>
                            </li>
                            <li className={`${styles.sideBarListItem} ${isActive === '/eventos' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="/eventos" title="Eventos">
                                    {/* Eventos Icon*/}
                                    <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5044 10.0186L7.50439 4.82861" stroke="#2A2D37" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M21.0044 16.6187V8.61868C21.004 8.26795 20.9115 7.92349 20.7359 7.61984C20.5604 7.31619 20.3081 7.06404 20.0044 6.88868L13.0044 2.88868C12.7004 2.71314 12.3555 2.62073 12.0044 2.62073C11.6533 2.62073 11.3084 2.71314 11.0044 2.88868L4.00439 6.88868C3.70066 7.06404 3.44837 7.31619 3.27286 7.61984C3.09734 7.92349 3.00475 8.26795 3.00439 8.61868V16.6187C3.00475 16.9694 3.09734 17.3139 3.27286 17.6175C3.44837 17.9212 3.70066 18.1733 4.00439 18.3487L11.0044 22.3487C11.3084 22.5242 11.6533 22.6166 12.0044 22.6166C12.3555 22.6166 12.7004 22.5242 13.0044 22.3487L20.0044 18.3487C20.3081 18.1733 20.5604 17.9212 20.7359 17.6175C20.9115 17.3139 21.004 16.9694 21.0044 16.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M3.27441 7.57861L12.0044 12.6286L20.7344 7.57861" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M12.0044 22.6987V12.6187" stroke="#2A2D37" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={styles.sideBarOpened}>Eventos</div>
                                </a>
                            </li>
                            <li className={`${styles.sideBarListItem} ${isActive === '/faleConosco' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="/faleConosco" title="Fale Conosco">
                                    {/* Notificação Icon*/}
                                    <svg className={styles.sideBarIcon} fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 82.796 82.796">
                                        <path d="M41.399,0C18.85,0,0.506,14.084,0.506,31.396c0,13.068,10.471,24.688,26.232,29.314c-0.316,4.892-1.662,9.507-4.01,13.747 c-1.92,3.466-2.352,5.477-1.488,6.938c0.523,0.892,1.475,1.401,2.609,1.401c0.004,0,0.008,0,0.012,0 c1.508,0,5.52-0.051,30.909-21.728c16.481-4.36,27.521-16.237,27.521-29.673C82.292,14.084,63.945,0,41.399,0z M53.295,57.221 l-0.463,0.117l-0.363,0.311c-17.201,14.707-24.262,19.146-27.018,20.48c0.201-0.445,0.479-1.002,0.859-1.689 c2.926-5.283,4.471-11.082,4.588-17.231l0.031-1.618l-1.568-0.402C14.55,53.369,4.599,43.003,4.599,31.396 c0-15.053,16.508-27.301,36.799-27.301c20.29,0,36.797,12.248,36.797,27.301C78.195,43.053,68.189,53.432,53.295,57.221z M44.469,12.298c0.246,0.252,0.379,0.592,0.369,0.943l-0.859,26.972c-0.018,0.707-0.598,1.271-1.305,1.271h-2.551 c-0.709,0-1.287-0.563-1.305-1.271l-0.859-26.972c-0.01-0.352,0.123-0.691,0.369-0.943c0.246-0.251,0.582-0.394,0.934-0.394h4.273 C43.887,11.905,44.223,12.047,44.469,12.298z M44.783,47.312v4.885c0,0.72-0.584,1.304-1.305,1.304h-4.16 c-0.721,0-1.305-0.584-1.305-1.304v-4.885c0-0.72,0.584-1.304,1.305-1.304h4.16C44.199,46.009,44.783,46.593,44.783,47.312z"></path>
                                        </svg>
                                    <div className={styles.sideBarOpened}>Fale conosco</div>
                                </a>
                            </li>
                    </ul>
                </div>
                <div className={styles.bottomSideBar}>
                <ul className={styles.sideBarList}>
                    <li className={`${styles.sideBarListItem} ${isActive === '/ajuda' ? styles.active : ''}`}>
                        <a className={styles.sideBarLink} href="/ajuda" title="Ajuda">
                            {/* Ajuda Icon*/}
                            <svg className={styles.sideBarIcon} viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6 22.4948C16.1228 22.4948 20.6 18.0176 20.6 12.4948C20.6 6.9719 16.1228 2.49475 10.6 2.49475C5.07713 2.49475 0.599976 6.9719 0.599976 12.4948C0.599976 18.0176 5.07713 22.4948 10.6 22.4948Z" />
                                <path d="M10.6 8.49475V12.4948"/>
                                <path d="M10.6 16.4948H10.61"/>
                            </svg>
                            <div className={styles.sideBarOpened}>Ajuda</div>
                        </a>
                    </li>
                </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar;


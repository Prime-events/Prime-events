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
                            <a className={styles.sideBarLink} href="/inicio">
                                {/* inicio Icon*/}
                                <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0044 3.61865H3.00439V10.6187H10.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 3.61865H14.0044V10.6187H21.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 14.6187H14.0044V21.6187H21.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.0044 14.6187H3.00439V21.6187H10.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className={styles.sideBarOpened}>Início</div>
                            </a>
                            </li>
                            <li className={`${styles.sideBarListItem} ${isActive === '/eventos' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="/eventos">
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
                            <li className={`${styles.sideBarListItem} ${isActive === '/notificacao' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="#">
                                    {/* Notificação Icon*/}
                                    <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.0044 8.61865C18.0044 7.02735 17.3723 5.50123 16.247 4.37601C15.1218 3.25079 13.5957 2.61865 12.0044 2.61865C10.4131 2.61865 8.88697 3.25079 7.76175 4.37601C6.63654 5.50123 6.00439 7.02735 6.00439 8.61865C6.00439 15.6187 3.00439 17.6187 3.00439 17.6187H21.0044C21.0044 17.6187 18.0044 15.6187 18.0044 8.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.7344 21.6187C13.5586 21.9217 13.3063 22.1733 13.0026 22.3482C12.699 22.5231 12.3548 22.6151 12.0044 22.6151C11.654 22.6151 11.3098 22.5231 11.0062 22.3482C10.7026 22.1733 10.4502 21.9217 10.2744 21.6187" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={styles.sideBarOpened}>Fale conosco</div>
                                </a>
                            </li>
                    </ul>
                </div>
                <div className={styles.bottomSideBar}>
                <ul className={styles.sideBarList}>
                    <li className={`${styles.sideBarListItem} ${isActive === '/ajuda' ? styles.active : ''}`}>
                        <a className={styles.sideBarLink} href="#">
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


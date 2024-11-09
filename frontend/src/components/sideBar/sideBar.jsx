import {useState} from 'react'
import styles from "./sideBar.module.css"
import { useLocation } from 'react-router-dom';

function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const isActive = useLocation().pathname;

    function toggleSideBar() {
        setIsOpen(!isOpen);
    }

    return ( 
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
                        <li className={`${styles.sideBarListItem} ${isActive === 'inicio' ? styles.active : ''}`}>
                            <a className={styles.sideBarLink} href="/inicio">
                                {/* inicio Icon*/}
                                <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0044 3.61865H3.00439V10.6187H10.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 3.61865H14.0044V10.6187H21.0044V3.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M21.0044 14.6187H14.0044V21.6187H21.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10.0044 14.6187H3.00439V21.6187H10.0044V14.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <div className={styles.sideBarOpened}>inicio</div>
                            </a>
                            </li>
                            <li className={`${styles.sideBarListItem} ${isActive === 'eventos' ? styles.active : ''}`}>
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
                            <li className={`${styles.sideBarListItem} ${isActive === 'notificacao' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="#">
                                    {/* Notificação Icon*/}
                                    <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.0044 8.61865C18.0044 7.02735 17.3723 5.50123 16.247 4.37601C15.1218 3.25079 13.5957 2.61865 12.0044 2.61865C10.4131 2.61865 8.88697 3.25079 7.76175 4.37601C6.63654 5.50123 6.00439 7.02735 6.00439 8.61865C6.00439 15.6187 3.00439 17.6187 3.00439 17.6187H21.0044C21.0044 17.6187 18.0044 15.6187 18.0044 8.61865Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M13.7344 21.6187C13.5586 21.9217 13.3063 22.1733 13.0026 22.3482C12.699 22.5231 12.3548 22.6151 12.0044 22.6151C11.654 22.6151 11.3098 22.5231 11.0062 22.3482C10.7026 22.1733 10.4502 21.9217 10.2744 21.6187" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <div className={styles.sideBarOpened}>Notificações</div>
                                </a>
                            </li>
                            <li className={`${styles.sideBarListItem} ${isActive === 'configuracao' ? styles.active : ''}`}>
                                <a className={styles.sideBarLink} href="#">
                                    {/* Configuração Icon*/}
                                    <svg className={styles.sideBarIcon} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0044 15.6187C13.6612 15.6187 15.0044 14.2755 15.0044 12.6187C15.0044 10.9618 13.6612 9.61865 12.0044 9.61865C10.3475 9.61865 9.00439 10.9618 9.00439 12.6187C9.00439 14.2755 10.3475 15.6187 12.0044 15.6187Z" stroke="#2A2D37" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M19.4044 15.6187C19.2713 15.9203 19.2316 16.2548 19.2904 16.5792C19.3492 16.9036 19.5039 17.203 19.7344 17.4387L19.7944 17.4987C19.9804 17.6844 20.1279 17.905 20.2285 18.1478C20.3292 18.3906 20.381 18.6508 20.381 18.9137C20.381 19.1765 20.3292 19.4367 20.2285 19.6795C20.1279 19.9223 19.9804 20.1429 19.7944 20.3287C19.6087 20.5146 19.3881 20.6621 19.1453 20.7628C18.9025 20.8634 18.6422 20.9152 18.3794 20.9152C18.1166 20.9152 17.8563 20.8634 17.6135 20.7628C17.3707 20.6621 17.1501 20.5146 16.9644 20.3287L16.9044 20.2687C16.6687 20.0381 16.3694 19.8835 16.045 19.8247C15.7206 19.7658 15.386 19.8055 15.0844 19.9387C14.7886 20.0654 14.5364 20.2759 14.3587 20.5442C14.181 20.8125 14.0857 21.1269 14.0844 21.4487V21.6187C14.0844 22.1491 13.8737 22.6578 13.4986 23.0329C13.1235 23.4079 12.6148 23.6187 12.0844 23.6187C11.554 23.6187 11.0453 23.4079 10.6702 23.0329C10.2951 22.6578 10.0844 22.1491 10.0844 21.6187V21.5287C10.0767 21.1977 9.96951 20.8766 9.77691 20.6074C9.5843 20.3381 9.31513 20.1329 9.0044 20.0187C8.70278 19.8855 8.3682 19.8458 8.04381 19.9047C7.71941 19.9635 7.42007 20.1181 7.1844 20.3487L7.1244 20.4087C6.93865 20.5946 6.71807 20.7421 6.47528 20.8428C6.23248 20.9434 5.97223 20.9952 5.7094 20.9952C5.44656 20.9952 5.18631 20.9434 4.94351 20.8428C4.70072 20.7421 4.48014 20.5946 4.29439 20.4087C4.10844 20.2229 3.96092 20.0023 3.86028 19.7595C3.75963 19.5167 3.70782 19.2565 3.70782 18.9937C3.70782 18.7308 3.75963 18.4706 3.86028 18.2278C3.96092 17.985 4.10844 17.7644 4.29439 17.5787L4.35439 17.5187C4.58493 17.283 4.73958 16.9836 4.7984 16.6592C4.85722 16.3348 4.81751 16.0003 4.68439 15.6987C4.55763 15.4029 4.34715 15.1506 4.07886 14.973C3.81057 14.7953 3.49618 14.6999 3.17439 14.6987H3.00439C2.47396 14.6987 1.96525 14.4879 1.59018 14.1129C1.21511 13.7378 1.00439 13.2291 1.00439 12.6987C1.00439 12.1682 1.21511 11.6595 1.59018 11.2844C1.96525 10.9094 2.47396 10.6987 3.00439 10.6987H3.09439C3.42539 10.6909 3.7464 10.5838 4.01569 10.3912C4.28499 10.1986 4.49011 9.92939 4.60439 9.61865C4.73751 9.31704 4.77722 8.98246 4.7184 8.65806C4.65958 8.33367 4.50493 8.03433 4.27439 7.79865L4.21439 7.73865C4.02844 7.55291 3.88092 7.33233 3.78028 7.08953C3.67963 6.84674 3.62782 6.58648 3.62782 6.32365C3.62782 6.06082 3.67963 5.80057 3.78028 5.55777C3.88092 5.31498 4.02844 5.0944 4.21439 4.90865C4.40014 4.7227 4.62072 4.57518 4.86351 4.47453C5.10631 4.37388 5.36656 4.32208 5.6294 4.32208C5.89223 4.32208 6.15248 4.37388 6.39528 4.47453C6.63807 4.57518 6.85865 4.7227 7.0444 4.90865L7.1044 4.96865C7.34007 5.19919 7.63941 5.35384 7.96381 5.41266C8.2882 5.47148 8.62278 5.43177 8.9244 5.29865H9.0044C9.30016 5.17189 9.55241 4.96141 9.73009 4.69312C9.90776 4.42483 10.0031 4.11044 10.0044 3.78865V3.61865C10.0044 3.08822 10.2151 2.57951 10.5902 2.20444C10.9653 1.82937 11.474 1.61865 12.0044 1.61865C12.5348 1.61865 13.0435 1.82937 13.4186 2.20444C13.7937 2.57951 14.0044 3.08822 14.0044 3.61865V3.70865C14.0057 4.03044 14.101 4.34483 14.2787 4.61312C14.4564 4.88141 14.7086 5.09189 15.0044 5.21865C15.306 5.35177 15.6406 5.39148 15.965 5.33266C16.2894 5.27384 16.5887 5.11919 16.8244 4.88865L16.8844 4.82865C17.0701 4.6427 17.2907 4.49518 17.5335 4.39453C17.7763 4.29388 18.0366 4.24208 18.2994 4.24208C18.5622 4.24208 18.8225 4.29388 19.0653 4.39453C19.3081 4.49518 19.5286 4.6427 19.7144 4.82865C19.9003 5.0144 20.0479 5.23498 20.1485 5.47777C20.2492 5.72057 20.301 5.98082 20.301 6.24365C20.301 6.50648 20.2492 6.76674 20.1485 7.00953C20.0479 7.25233 19.9003 7.47291 19.7144 7.65865L19.6544 7.71865C19.4239 7.95433 19.2692 8.25367 19.2104 8.57806C19.1516 8.90246 19.1913 9.23704 19.3244 9.53865V9.61865C19.4512 9.91442 19.6616 10.1667 19.9299 10.3443C20.1982 10.522 20.5126 10.6174 20.8344 10.6187H21.0044C21.5348 10.6187 22.0435 10.8294 22.4186 11.2044C22.7937 11.5795 23.0044 12.0882 23.0044 12.6187C23.0044 13.1491 22.7937 13.6578 22.4186 14.0329C22.0435 14.4079 21.5348 14.6187 21.0044 14.6187H20.9144C20.5926 14.6199 20.2782 14.7153 20.0099 14.893C19.7416 15.0706 19.5312 15.3229 19.4044 15.6187V15.6187Z"/>
                                    </svg>
                                    <div className={styles.sideBarOpened}>Configuração</div>
                                </a>
                            </li>
                    </ul>
                </div>
                <div className={styles.bottomSideBar}>
                <ul className={styles.sideBarList}>
                    <li className={`${styles.sideBarListItem} ${isActive === 'ajuda' ? styles.active : ''}`}>
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

    )
}

export default SideBar;


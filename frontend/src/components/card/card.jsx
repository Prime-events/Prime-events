import React from 'react';
import styles from './card.module.css';

const Card = ({ color, icon, number, text }) => (
  <div className={styles.card} style={{ backgroundColor: color }}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.number}>{number}</div>
    <div className={styles.text}>{text}</div>
  </div>
);

export default Card;

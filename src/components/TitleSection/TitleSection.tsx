import React from 'react';
import styles from './TitleSection.module.css';

interface TitleSectionProps {
    title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
    return (
        <section className={styles['title-container']}>
            <h2>{title}</h2>
            <div className={styles['line']}></div>
        </section>
    );
};

export default TitleSection;

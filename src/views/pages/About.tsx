// About.tsx
import React from 'react';
import styles from './About.module.css';
import Carousel from '../../components/Carousel/Carousel';

const About: React.FC = () => {
    return (
        <div className={styles['about']}>
            <div className={styles['about-us']}>
                <div className={styles['about-us-text']}>
                    <h1>Welcome!</h1>
                    <p>
                        Coffee Palace – an oasis of taste and relaxation in the 
                        heart of the city! We are a café that's passionate about giving
                        our customers an experience out of the ordinary, with
                        carefully selected varieties of coffee and home-baked delicacies.
                        <br /> <br />
                        With us you can enjoy a relaxing coffee in a cozy
                        and inspiring environment. Our range includes everything
                        from classic espresso and cappuccino to more unique ones
                        specialties, along with a wide range of
                        sandwiches, pastries and other treats, all prepared with
                        love and care.
                        
                    </p>
                </div>

                <div className={styles['about-us-carousel']}>
                    <Carousel />
                </div>
            </div>
        </div>
    );
};

export default About;

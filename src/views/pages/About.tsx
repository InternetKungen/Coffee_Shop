// About.tsx
import React from 'react';
import styles from './About.module.css';
import Carousel from '../../components/Carousel/Carousel';

const About: React.FC = () => {
    return (
        <div className={styles['about']}>
            <div className={styles['about-us']}>
                <div className={styles['about-us-text']}>
                    <h1>Välkommen!</h1>

                    <p>
                        Coffee Palace – din oas av smak och avkoppling mitt i stadens hjärta! Vi är
                        ett café som brinner för att ge våra kunder en upplevelse utöver det
                        vanliga, med noggrant utvalda kaffesorter och hembakade delikatesser.
                        <br /> <br />
                        Hos oss kan du njuta av en avkopplande fika i en mysig och inspirerande
                        miljö. Vårt sortiment inkluderar allt från klassiska espresso och cappuccino
                        till mer unika specialiteter, tillsammans med ett brett utbud av smörgåsar,
                        bakverk och andra godsaker, allt tillagat med kärlek och omsorg.
                        <br /> <br />
                    </p>
                </div>

                <div className={styles['about-us-carousel']}>
                    <Carousel />
                </div>
            </div>

            {/*<div>
                <p>
                    För dig som är på språng erbjuder vi även möjligheten att
                    beställa online via vår hemsida. Med några enkla klick kan
                    du beställa din favoritkaffe och fika för avhämtning eller
                    leverans direkt till din dörr. Vi vill göra det enkelt för
                    dig att njuta av högkvalitativt kaffe och nybakade
                    läckerheter, oavsett var du befinner dig. Kom in och upplev
                    atmosfären på Coffee Palace, eller besök oss online för att
                    göra din beställning. Vi ser fram emot att få ge dig en
                    minnesvärd fikaupplevelse!
                </p>
             </div>*/}
        </div>
    );
};

export default About;

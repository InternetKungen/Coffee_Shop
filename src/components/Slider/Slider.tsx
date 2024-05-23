// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Slider.module.css';
// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import images
import SliderImg01 from '../../assets/img/slide-img-01.jpg';
import SliderImg02 from '../../assets/img/slide-img-02.jpg';
import SliderImg03 from '../../assets/img/slide-img-03.jpg';
import SliderImg04 from '../../assets/img/slide-img-04.jpg';

function Slider() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                /* navigation={true} */
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                /* className="mySwiper" */
                className={styles['swiper']}
            >
                <SwiperSlide className={styles['swiper-slide']}>
                    <img src={SliderImg01} />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img src={SliderImg02} />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img src={SliderImg03} />
                </SwiperSlide>
                <SwiperSlide className={styles['swiper-slide']}>
                    <img src={SliderImg04} />
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Slider;

'use client';
import React, { useEffect, useState } from 'react';
import { useGetProduct } from '@/hooks/queries/use-get-product/useGetProduct';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import styles from './OneProduct.module.scss';
import './productSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper/types';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import DeliveryIcon from '@/components/pages/catalog/one-product-page/components/delivery-icon/DeliveryIcon';
import PaymentIcon from '@/components/pages/catalog/one-product-page/components/payment-icon/PaymentIcon';
import Link from 'next/link';
import ServiceSection from '@/components/pages/catalog/one-product-page/components/sections/service-section/ServiceSection';
import ProductAdaptiveInfoSection from '@/components/pages/catalog/one-product-page/components/sections/product-adaptive-info-section/ProductAdaptiveInfoSection';
import ProductInfoSection from '@/components/pages/catalog/one-product-page/components/sections/product-info-section/ProductInfoSection';
import PriceSection from '@/components/pages/catalog/one-product-page/components/sections/price-section/PriceSection';
import ColorsSection from '@/components/pages/catalog/one-product-page/components/sections/colors-section/ColorsSection';
import PopularProductSection from '@/components/pages/catalog/one-product-page/components/sections/popular-products-section/PopularProductSection';
import CharacteristicsSection from '@/components/pages/catalog/one-product-page/components/sections/characteristics-section/CharacteristicsSection';
import DescriptionSection from '@/components/pages/catalog/one-product-page/components/sections/description-section/DescriptionSection';
import ProductSkeletonPage from '@/components/pages/catalog/one-product-page/product-skeleton-page/ProductSkeletonPage';

const OneProduct = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading } = useGetProduct(id);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    useEffect(() => {
        if (id) {
            setThumbsSwiper(null);
        }
    }, [id]);

    useEffect(() => {
        if (thumbsSwiper) {
            thumbsSwiper.update();
        }
    }, [thumbsSwiper]);

    const breadcrumbsItems = [
        { label: 'Каталог', href: '/catalog' },
        {
            label: data?.categoryName,
            href: `/catalog/subcatalog?category=${data?.category}`,
        },
        {
            label: data?.subcategoryName,
            href: `/catalog/subcatalog/products?id=${data?.subcategory}`,
        },
        {
            label: data?.name,
        },
    ];

    if (isLoading) {
        return (
            <ProductSkeletonPage
                name={data?.name}
                category={data?.category}
                categoryName={data?.categoryName}
                subcategory={data?.subcategory}
                subcategoryName={data?.subcategoryName}
            />
        );
    }

    return (
        <div className={styles.cnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href={'#'}>Все про товар</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href={'#desc'}>Опис</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href={'#characteristics'}>Характеристики</Link>
                    </li>
                </ul>
            </nav>
            <div className={styles.content}>
                <ProductAdaptiveInfoSection data={data} />
                {data && data.imgArr && (
                    <div className={styles.imgCnt}>
                        <Swiper
                            style={
                                {
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                } as React.CSSProperties
                            }
                            loop={true}
                            spaceBetween={10}
                            navigation={true}
                            thumbs={{
                                swiper: thumbsSwiper ? thumbsSwiper : undefined,
                            }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={'mySwiper2'}
                        >
                            {data.imgArr.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} alt={'Свайпер тумблер'} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            onSwiper={(swiper: SwiperCore) => setThumbsSwiper(swiper)}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className={'mySwiper'}
                        >
                            {data.imgArr.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img src={img} alt={'Свайпер тумблер'} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
                <div className={styles.textContent}>
                    <ProductInfoSection data={data} />
                    <PriceSection data={data} />
                    <ColorsSection data={data} />
                    <div className={styles.btnContent}>
                        <button className={styles.buyBtn}>
                            <div className={styles.cartIconCnt}>
                                <img
                                    className={styles.cartIcon}
                                    src={'/icons/cart-icon.svg'}
                                    alt={'Іконка кошику'}
                                />
                            </div>
                            Купити
                        </button>
                    </div>
                    <div className={styles.servicesContent}>
                        <ServiceSection
                            title="Cпособи доставки"
                            iconSrc="/product/delivery-icon.svg"
                            iconAlt="Delivery icon"
                            items={data?.deliveryMethod}
                            ItemComponent={DeliveryIcon}
                        />
                        <ServiceSection
                            title="Умови оплати"
                            iconSrc="/product/payment-icon.svg"
                            iconAlt="Payment icon"
                            items={data?.paymentMethod}
                            ItemComponent={PaymentIcon}
                        />
                        <ServiceSection
                            title="Умови повернення"
                            iconSrc="/product/turning-icon.svg"
                            iconAlt="Return icon"
                            items={data?.turningMethod}
                        />
                    </div>
                </div>
            </div>
            <PopularProductSection />
            <div className={styles.characteristics} id={'characteristics'}>
                <CharacteristicsSection data={data} />
                <DescriptionSection data={data} />
            </div>
        </div>
    );
};

export default OneProduct;

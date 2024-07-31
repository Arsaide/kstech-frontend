'use client';
import React, { useEffect, useState } from 'react';
import { useGetProduct } from '@/hooks/queries/use-get-product/useGetProduct';
import { useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/components/layout/nav/breadcrubms/Breadcrumbs';
import styles from './OneProduct.module.scss';
import './productSwiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import classNames from 'classnames';
import { Ban, Check, History } from 'lucide-react';
import { priceConvert } from '@/utils/priceConvert';
import { discountPriceCalc } from '@/utils/discountPriceCalc';
import DeliveryIcon from '@/components/pages/catalog/one-product-page/components/delivery-icon/DeliveryIcon';
import PaymentIcon from '@/components/pages/catalog/one-product-page/components/payment-icon/PaymentIcon';

const OneProduct = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading } = useGetProduct(id);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const discountCalc = priceConvert(discountPriceCalc(data?.price, data?.discount));
    const priceCalc = priceConvert(data?.price);

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

    return (
        <div className={styles.cnt}>
            <Breadcrumbs items={breadcrumbsItems} />
            <div className={styles.content}>
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
                                swiper: thumbsSwiper || undefined,
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
                            onSwiper={(swiper: any) => {
                                setThumbsSwiper(swiper);
                            }}
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
                    <h2 className={styles.title}>{data?.name}</h2>
                    <div className={styles.availabilityContent}>
                        <div
                            className={classNames(styles.availabilityCnt, {
                                [styles.isAvailability]: data?.inAvailability === 'В наявності',
                                [styles.isOrder]: data?.inAvailability === 'Під замовлення',
                                [styles.isNotAvailability]:
                                    data?.inAvailability === 'Немає в наявності',
                                [styles.undefinedAvailability]: ![
                                    'В наявності',
                                    'Під замовлення',
                                    'Немає в наявності',
                                ].includes(data?.inAvailability as string),
                            })}
                        >
                            {data?.inAvailability === 'В наявності' ? (
                                <>
                                    <Check size={25} />В наявності
                                </>
                            ) : data?.inAvailability === 'Під замовлення' ? (
                                <>
                                    <History size={20} /> Під замовлення
                                </>
                            ) : data?.inAvailability === 'Немає в наявності' ? (
                                <>
                                    <Ban size={20} /> Немає в наявності
                                </>
                            ) : (
                                <>
                                    <Ban size={20} /> data?.inAvailability
                                </>
                            )}
                        </div>
                        {data?.inAvailability === 'Під замовлення' && (
                            <p className={styles.term}>Термін виготовлення: 7-14 днів</p>
                        )}
                    </div>
                    <div className={styles.pricesContent}>
                        {data?.discount == '0' ? (
                            <>
                                <div className={styles.price}>{priceCalc} грн</div>
                            </>
                        ) : (
                            <div className={styles.priceCnt}>
                                <div className={styles.price}>{discountCalc} грн</div>
                                <div className={styles.discount}>{priceCalc} грн</div>
                            </div>
                        )}
                        <div className={styles.productHint}>Код товару: {data?.article}</div>
                    </div>
                    <div className={styles.colorsContent}>
                        <h4 className={styles.colorTitle}>Колір виробу:</h4>
                        <ul className={styles.colors}>
                            {data?.colors.map((item, index) => (
                                <li
                                    key={index}
                                    style={{ backgroundColor: item }}
                                    className={styles.colorItem}
                                />
                            ))}
                        </ul>
                    </div>
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
                        <div className={styles.service}>
                            <h5 className={styles.listTitle}>
                                <img
                                    src={'/product/delivery-icon.svg'}
                                    className={styles.icon}
                                    alt={'Іконка способів доставки товару'}
                                />{' '}
                                Cпособи доставки
                            </h5>
                            <ul className={styles.list}>
                                {data?.deliveryMethod.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        <DeliveryIcon method={item} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.service}>
                            <h5 className={styles.listTitle}>
                                <img
                                    src={'/product/payment-icon.svg'}
                                    className={styles.icon}
                                    alt={'Іконка умов оплати товару'}
                                />{' '}
                                Умови оплати
                            </h5>
                            <ul className={styles.list}>
                                {data?.paymentMethod.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        <PaymentIcon method={item} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.service}>
                            <h5 className={styles.listTitle}>
                                <img
                                    src={'/product/turning-icon.svg'}
                                    className={styles.icon}
                                    alt={'Іконка умов повернення товару'}
                                />{' '}
                                Умови повернення
                            </h5>
                            <ul className={styles.list}>
                                {data?.turningMethod.map((item, index) => (
                                    <li key={index} className={styles.item}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OneProduct;

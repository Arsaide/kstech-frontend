import React, { FC } from 'react';
import { Package } from 'lucide-react';

interface DeliveryIconProps {
    method: string;
}

const DeliveryIcon: FC<DeliveryIconProps> = ({ method }) => {
    switch (method) {
        case 'Нова пошта':
            return <img src={'/product/novaposhta.svg'} alt={'Логотип Нової пошти'} />;
        case "Кур'єр Нова Пошта":
            return <img src={'/product/novaposhta.svg'} alt={'Логотип Нової пошти'} />;
        case 'Укр пошта':
            return <img src={'/product/ukrposhta.svg'} alt={'Логотип Укр пошти'} />;
        case 'Автолюкс':
            return <img src={'/product/autolux.svg'} alt={'Логотип Автолюкс доставки'} />;
        case 'Delivery':
            return <img src={'/product/delivery.svg'} alt={'Логотип Delivery доставки'} />;
        case 'KS TECH доставка':
            return <img src={'/product/kstech.svg'} alt={'Логотип KS TECH доставки'} />;
        case 'Тільки самовивіз':
            return <Package size={20} color={'brown'} />;
        default:
            return <img src={'/product/novaposhta.svg'} alt={'Логотип Нової пошти'} />;
    }
};

export default DeliveryIcon;

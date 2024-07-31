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
        case 'Тільки самовивіз':
            return <Package size={20} color={'brown'} />;
        default:
            return <img src={'/product/novaposhta.svg'} alt={'Логотип Нової пошти'} />;
    }
};

export default DeliveryIcon;

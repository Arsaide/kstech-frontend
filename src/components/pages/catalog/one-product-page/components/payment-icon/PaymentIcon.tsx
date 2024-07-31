import React, { FC } from 'react';
import { Banknote, CreditCard, HandCoins, Landmark, Nfc } from 'lucide-react';
import { ColorsEnum } from '@/utils/enums/ColorEnums';

interface DeliveryIconProps {
    method: string;
}

const PaymentIcon: FC<DeliveryIconProps> = ({ method }) => {
    switch (method) {
        case "Готівкою (кур'єру, в магазині, у відділенні)":
            return <Banknote size={20} color={ColorsEnum.GREEN} />;
        case 'Оплата частинами від ПриватБанк або Монобанку':
            return <Landmark size={20} />;
        case 'Безготівковий розрахунок для юр.осіб':
            return <HandCoins size={20} />;
        case 'Оплата на карту через VISA, Private24, Apple Pay, Google Pay, MasterCard':
            return <Nfc size={24} />;
        default:
            return <HandCoins />;
    }
};

export default PaymentIcon;

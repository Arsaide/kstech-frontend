import React, { FC } from 'react';
import { OneProductTypes } from '@/api/models/ProductsModels';

interface CharacteristicsSectionProps {
    data: OneProductTypes | undefined;
}

const CharacteristicsSection: FC<CharacteristicsSectionProps> = ({ data }) => {
    return <div></div>;
};

export default CharacteristicsSection;

import React, { FC } from 'react';
import styles from './CartForm.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useProductsStore from '@/api/store/ProductStore';
import useCartStore from '@/api/store/CartStore';
import TextFieldInput from '@/components/ui/inputs/text-field-input/TextFieldInput';
import ToggleSwitchInput from '@/components/ui/inputs/toggle-switch-input/ToggleSwitchInput';
import TextAreaInput from '@/components/ui/inputs/text-area-input/TextAreaInput';

interface FormValues {
    name: string;
    surname: string;
    number: string;
    email: string;
    feedback: boolean;
    country: string;
    town: string;
    street: string;
    office?: string;
    comment?: string;
}

interface CartFormProps {
    order: number;
}

const CartForm: FC<CartFormProps> = ({ order = 0 }) => {
    const { buy } = useProductsStore();
    const cart = useCartStore(state => state.cart);

    const {
        handleSubmit,
        control,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            surname: '',
            number: '',
            email: '',
            feedback: false,
            country: '',
            town: '',
            street: '',
            office: '',
            comment: '',
        },
    });

    const { mutate, isError, isSuccess, isPending, error } = useMutation({
        mutationKey: ['buy-product'],
        mutationFn: (product: FormValues) =>
            buy(
                cart,
                order,
                product.name,
                product.surname,
                product.number,
                product.email,
                product.feedback,
                product.country,
                product.town,
                product.street,
                product.office,
                product.comment,
            ),
    });

    const onSubmit = (data: FormValues) => {
        mutate(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.contact}>
                <h2 className={styles.title}>Контактна інформація</h2>
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Обов'язкова поле!" }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Ім'я"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.name}
                            error={errors.name?.message}
                            placeholder="Ваше ім'я"
                        />
                    )}
                />
                <Controller
                    name="surname"
                    control={control}
                    rules={{ required: "Обов'язкова поле!" }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Прізвище"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.surname}
                            error={errors.surname?.message}
                            placeholder="Ваше прізвище"
                        />
                    )}
                />
                <Controller
                    name="number"
                    control={control}
                    rules={{
                        required: "Обов'язкова поле!",
                        pattern: { value: /^[0-9]+$/, message: 'Неправильно введений номер' },
                    }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Номер телефону"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.number}
                            error={errors.number?.message}
                            placeholder="+38 (067) 475-48-48"
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Обов'язкова поле!",
                        pattern: { value: /^\S+@\S+$/i, message: 'Не правильно написана пошта' },
                    }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="E-mail"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.email}
                            error={errors.email?.message}
                            placeholder="kstek.ltd24@gmail.com"
                        />
                    )}
                />
                <Controller
                    name="feedback"
                    control={control}
                    render={({ field }) => (
                        <ToggleSwitchInput
                            label="Звʼязатися в Telegram/Viber/WhatsApp"
                            checked={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.feedback}
                            error={errors.feedback?.message}
                        />
                    )}
                />
            </div>
            <div className={styles.pay}>
                <h2 className={styles.title}>Адреса доставки</h2>
                <Controller
                    name="country"
                    control={control}
                    rules={{ required: "Обов'язкова поле!" }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Країна/Регіон"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.country}
                            error={errors.country?.message}
                            placeholder="Україна"
                        />
                    )}
                />
                <Controller
                    name="town"
                    control={control}
                    rules={{ required: "Обов'язкова поле!" }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Місто/Село"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.town}
                            error={errors.town?.message}
                            placeholder="Київ"
                        />
                    )}
                />
                <Controller
                    name="street"
                    control={control}
                    rules={{ required: "Вулиця та номер будинку обов'язкове поле!" }}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Вулиця та номер будинку"
                            value={field.value}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.street}
                            error={errors.street?.message}
                            placeholder="Введіть адресу доставки"
                        />
                    )}
                />
                <Controller
                    name="office"
                    control={control}
                    render={({ field }) => (
                        <TextFieldInput
                            label="Квартира, офіс, блок, тощо (опціонально)"
                            value={field.value || ''}
                            onChange={field.onChange}
                            isPending={isPending}
                            isError={!!errors.office}
                            error={errors.office?.message}
                            placeholder="Введіть адресу доставки"
                        />
                    )}
                />
                <Controller
                    name="comment"
                    control={control}
                    render={({ field }) => (
                        <TextAreaInput
                            label="Додати коментар"
                            value={field.value || ''}
                            onChange={field.onChange}
                            placeholder="Ваш коментар, уточнення, прохання тощо."
                        />
                    )}
                />
                <button className={styles.submit} type="submit" disabled={isPending || !isValid}>
                    Оформити замовлення
                </button>
            </div>
        </form>
    );
};

export default CartForm;

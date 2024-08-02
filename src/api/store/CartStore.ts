import { create, StateCreator } from 'zustand';
import { OneProductTypes } from '@/api/models/ProductsModels';
import { persist, PersistOptions } from 'zustand/middleware';

type CartProduct = OneProductTypes & {
    quantity: number;
};

interface CartState {
    cart: CartProduct[];
    addProduct: (product: OneProductTypes) => void;
    removeProduct: (id: string) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    getQuantityById: (id: string) => number;
}

type Persist = (
    config: StateCreator<CartState>,
    options: PersistOptions<CartState>,
) => StateCreator<CartState>;

const useCartStore = create<CartState>(
    (persist as Persist)(
        (set, get) => ({
            cart: [],
            addProduct: product => {
                const existingProduct = get().cart.find(p => p.id === product.id);
                if (existingProduct) {
                    set({
                        cart: get().cart.map(p =>
                            p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
                        ),
                    });
                } else {
                    set({
                        cart: [...get().cart, { ...product, quantity: 1 }],
                    });
                }
            },
            removeProduct: id => {
                set({
                    cart: get().cart.filter(product => product.id !== id),
                });
            },
            increaseQuantity: id => {
                set({
                    cart: get().cart.map(product =>
                        product.id === id
                            ? { ...product, quantity: product.quantity + 1 }
                            : product,
                    ),
                });
            },
            decreaseQuantity: id => {
                set({
                    cart: get()
                        .cart.map(product =>
                            product.id === id
                                ? { ...product, quantity: product.quantity - 1 }
                                : product,
                        )
                        .filter(product => product.quantity > 0),
                });
            },
            getQuantityById: id => {
                const product = get().cart.find(p => p.id === id);
                return product ? product.quantity || 1 : 0;
            },
        }),
        {
            name: 'cart-storage',
        },
    ),
);

export default useCartStore;

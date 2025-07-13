"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
// NEW: Import the Service type to use it directly
import { Service } from '@/lib/services';

// --- Define the shape of our mock data ---
interface MockAddress {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    country_code: string;
    postal_code: string;
    phone?: string;
}

// THE FIX: The cart items will now be of type `Service`, but we handle the ID type internally.
interface MockCart {
    id: string;
    shipping_address: MockAddress | null;
    billing_address: MockAddress | null;
    shipping_methods: { option_id: string }[];
    region: {
        id: string;
        currency_code: string;
    };
    items: Service[]; // The cart now holds full Service objects
}

interface CartContextType {
    cart: MockCart;
    updateCart: {
        mutateAsync: (payload: any) => Promise<void>;
        isLoading: boolean;
    };
    addToCart: (item: Service) => void; // Expects a full Service object
    removeFromCart: (itemId: string) => void;
    isItemInCart: (itemId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<MockCart>({
        id: 'mock-cart-123',
        shipping_address: null,
        billing_address: null,
        shipping_methods: [],
        region: {
            id: 'mock-region-bd',
            currency_code: 'bdt',
        },
        items: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateCart = async (payload: any) => {
        setIsLoading(true);
        await new Promise(res => setTimeout(res, 400));
        setCart(prevCart => ({ ...prevCart, ...payload }));
        setIsLoading(false);
    };

    // --- THE CORE FIX IS IN THIS FUNCTION ---
    const addToCart = (serviceToAdd: Service) => {
        // Check if the item is already in the cart using its string ID
        if (!isItemInCart(String(serviceToAdd.id))) {
            setCart(prevCart => ({
                ...prevCart,
                // Add the original service object to the items array
                items: [...prevCart.items, serviceToAdd],
            }));
        }
    };

    const removeFromCart = (itemId: string) => {
        setCart(prevCart => ({
            ...prevCart,
            // When removing, compare the string ID to the item's number ID (converted to string)
            items: prevCart.items.filter(item => String(item.id) !== itemId),
        }));
    };

    const isItemInCart = (itemId: string): boolean => {
        // When checking, compare the string ID to the item's number ID (converted to string)
        return cart.items.some(item => String(item.id) === itemId);
    };

    const value = {
        cart,
        updateCart: { mutateAsync: handleUpdateCart, isLoading },
        addToCart,
        removeFromCart,
        isItemInCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

// --- Hooks remain the same ---
export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const useUpdateCart = (cartId?: string) => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useUpdateCart must be used within a CartProvider');
    }
    return context.updateCart;
};
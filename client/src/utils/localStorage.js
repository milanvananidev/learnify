'use client'

export const setItemToStorage = (key, value) => {
    localStorage.setItem(key, String(value));
};

export const getItemFromStorage = (key) => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(key) || '';
    }
    return '';
};

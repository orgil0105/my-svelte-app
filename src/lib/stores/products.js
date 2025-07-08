import { writable } from 'svelte/store';

const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");

export const products = writable(storedProducts);

products.subscribe((value) => {
	localStorage.setItem("products", JSON.stringify(value));
});
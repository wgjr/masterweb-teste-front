import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("products", () => {
    const products = ref<any | undefined>();
    const setProductList = (data: any | undefined) => {
        products.value = data;
    };

    return {
        products,
        setProductList
    };
});

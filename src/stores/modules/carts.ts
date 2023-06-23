import { defineStore } from "pinia";
import { ref } from "vue";

export const useMyCarts = defineStore("myCarts", () => {
    const carts = ref<any | undefined>();
    const cartsItem = ref<any | undefined>();
    const closeCart = ref<boolean>(false);

    const setCarts = (data: any | undefined) => {
        carts.value = data;
    };

    function setInMyCart(data: any | undefined) {
        carts.value = data;
    }

    function setInMyCartItens(data: any | undefined) {
        cartsItem.value = data;
    }

    function showCloseCart(data: boolean | false) {
        closeCart.value = !closeCart.value
    }

    return {
        carts,
        cartsItem,
        setCarts,
        setInMyCart,
        setInMyCartItens,
        closeCart,
        showCloseCart
    };
});

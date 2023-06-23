<script setup lang="ts">
    import {onMounted, computed, ref} from 'vue';
    import myImageLogo from "../../assets/logo-white-blue-masterdaweb.png"
    import {getProducts} from "../../services/productsServices";
    import {useProductStore} from "../../stores/modules/products"
    import {useMyCarts} from "../../stores/modules/carts"
    import {storeToRefs} from 'pinia';
    import {Loading} from "quasar";

    const cart = ref<any>([]);
    const groupedItems = ref<any>([]);

    function formatCarUnity(items: any) {
        groupedItems.value = items.reduce((accumulator: any, current: any) => {
            const existingItem = accumulator.find((item: any) => item.item.id === current.item.id && item.item.name === current.item.name);

            if (existingItem) {
                existingItem.count++;
                existingItem.itemvalue += existingItem.item.price
            } else {
                current.itemvalue = current.item.price
                current.count = 1;
                accumulator.push(current);
            }

            return accumulator;
        }, []);
    }

    const {setInMyCart} = useMyCarts();
    const {setInMyCartItens} = useMyCarts();
    const {setProductList} = useProductStore();
    const {products} = storeToRefs(useProductStore());
    const {cartsItem} = storeToRefs(useMyCarts());

    const loading = ref<boolean>(false);

    async function cartAdd(item: any) {
        cart.value.push(item)
        setInMyCartItens(cart.value)

        formatCarUnity(cart.value)

        setInMyCart(groupedItems.value);
    }

    async function cartRemove(item: any) {
        let newCart = cartsItem

        const indexToRemove = newCart.value.findIndex((element: any) => element.item.id === item.id);
        if (indexToRemove !== -1) {
            newCart.value.splice(indexToRemove, 1);
        }

        setInMyCartItens(newCart.value)
        formatCarUnity(newCart.value)
        setInMyCart(groupedItems.value);
    }

    async function collectProducts() {
        Loading.show();
        loading.value = true;
        try {
            const {status, data} = await getProducts();
            if (status === 200) setProductList(data.Products)
        } catch (error) {
            console.log('error', error)
        } finally {
            Loading.hide();
        }
    }

    onMounted(async () => {
        await collectProducts();
    });

    const productList = products

    function formatPrice(value: number): string {
        const val = (value).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
</script>

<template>
    <div class="row">
        <q-img
                src="../../assets/logo-white-blue-masterdaweb.png"
                alt="Logo MasterdaWeb"
                class="my-image"
        />
        <q-card square dark class="q-ma-none no-shadow text-center c_container" style="background-color: #191e29">
            <q-card-section class="content-center">
            </q-card-section>
            <q-card-section>
                <div class="text-h6">Lista de produtos</div>
                <div class="text-subtitle2">Escolha uma das opções abaixo:</div>
            </q-card-section>
            <q-card-actions>
                <q-list bordered separator style="width: 100%;">
                    <q-item v-for="productItem in productList" key="productItem.id" v-ripple>
                        <q-item-section top side>
                            <div class="text-grey-8 q-gutter-xs">
                                <q-btn class="gt-xs" @click="cartAdd({item : productItem})" flat round color="primary"
                                       icon="add"/>
                                <q-btn class="gt-xs"
                                       @click="cartRemove(productItem)" flat round color="primary"
                                       icon="remove"/>
                            </div>
                        </q-item-section>
                        <q-item-section>{{productItem.name}}</q-item-section>
                        <q-item-section>R$ {{formatPrice(productItem.price)}}</q-item-section>
                    </q-item>
                </q-list>
            </q-card-actions>
            <q-card-section>
            </q-card-section>
        </q-card>
    </div>
</template>
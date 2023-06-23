<template>
    <div class="row" style="margin-bottom: 25px">
        <q-card square dark class="q-ma-none no-shadow text-center c_container" style="background-color: #191e29">
            <q-card-section class="content-center">
            </q-card-section>
            <q-card-section>
                <div class="text-h6">Checkout</div>
                <div class="text-subtitle2">Resumo da compra:</div>
            </q-card-section>
            <q-card-section>
                <div v-if="!carts" class="text-h6 text-center">Nenhum produto no carrinho</div>

                <q-list bordered separator style="width: 100%;">
                    <q-item v-for="cartsItem in carts" key="productItem.id" v-ripple>
                        <q-item-section side style="color: white">
                            {{cartsItem.count}} x
                        </q-item-section>
                        <q-item-section>{{cartsItem.item.name}}</q-item-section>
                        <q-item-section class="q-gutter-xs">
                            R$ {{formatPrice(cartsItem.item.price)}} (x {{cartsItem.count}} = R$
                            {{formatPrice(cartsItem.itemvalue)}})
                        </q-item-section>
                        <q-item-section>
                            <q-btn class="gt-xs" @click="removeProduct(cartsItem.item.id)" flat round color="primary"
                                   icon="delete"/>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
            <q-card-actions>
                <q-btn @click="onCloseOrder" outline class="full-width" size="lg" :disable="!carts"
                       icon="local_grocery_store"
                       label="FECHAR PEDIDO"/>
            </q-card-actions>
            <CartClosed />
        </q-card>
    </div>
</template>

<script setup lang="ts">
    import {ref} from 'vue';
    import {useMyCarts} from "../../stores/modules/carts"
    import {storeToRefs} from 'pinia';
    import {createSales} from '../../services/salesServices'
    import {useRouter} from "vue-router"
    import {useQuasar} from 'quasar'
    import CartClosed from "./CartClosed.vue"

    const $q = useQuasar()
    const router = useRouter()

    const {carts, cartsItem} = storeToRefs(useMyCarts())
    const {setInMyCart, setInMyCartItens, showCloseCart} = useMyCarts()

    const groupedItems = ref<any>([]);
    const loading = ref<boolean>(false);

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

    function removeProduct(id: number) {
        let newCart = cartsItem

        newCart.value = newCart.value.filter((element: any) => element.item.id !== id);

        setInMyCartItens(newCart.value)
        formatCarUnity(newCart.value)
        setInMyCart(groupedItems.value);
    }

    function formatPrice(value: number): string {
        const val = (value).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    const onCloseOrder = async () => {
        loading.value = true;
        try {
            const newFormatToApi = cartsItem.value.map((element: any) => element.item);

            const {status, data} = await createSales(newFormatToApi);
            if (status === 200) {
                showCloseCart(true)
            }
        } catch (error) {
            console.log('error', error)
        } finally {
            loading.value = false;
        }
    };
</script>
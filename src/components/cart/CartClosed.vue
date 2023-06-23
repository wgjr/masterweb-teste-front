<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="inception">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Pedido realizado com sucesso!</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-item v-for="cartsItem in carts" key="productItem.id" v-ripple>
                        <q-item-section>{{cartsItem.item.name}}</q-item-section>

                        <q-item-section >
                            X {{cartsItem.count}}
                        </q-item-section>
                        <q-item-section class="q-gutter-xs">
                            R$ {{formatPrice(cartsItem.item.price)}}
                        </q-item-section>
                        <q-item-section>
                           = R$ {{formatPrice(cartsItem.itemvalue)}}
                        </q-item-section>
                    </q-item>
                </q-card-section>
                <q-card-section class="text-right">
                    Total: R$ {{formatPrice(totalItemValue)}}
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Finalizar" @click="endCart" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
    import {ref, watch} from "vue"
    import {useMyCarts} from "../../stores/modules/carts"
    import {storeToRefs} from "pinia";
    import {useRouter} from "vue-router";

    const router = useRouter();
    const inception = ref<boolean>(false)
    const totalItemValue = ref<number>(0)

    const {carts, closeCart} = storeToRefs(useMyCarts())
    const {setInMyCart, setInMyCartItens, showCloseCart} = useMyCarts()

    watch(closeCart, () => {
        inception.value = closeCart.value
    })

    watch(carts, () => {
        totalItemValue.value = carts.value.reduce((total:number, element:any) => total + element.itemvalue, 0)
    })

    function formatPrice(value: number): string {
        const val = (value).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }

    function endCart() {
        inception.value = false

        setInMyCart([]);
        setInMyCartItens([]);
        showCloseCart(false)

        router.go(0)
    }

</script>
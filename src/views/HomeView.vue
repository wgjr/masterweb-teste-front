<script setup lang="ts">
    import {ref} from 'vue';
    import Catalog from "../components/cart/Catalog.vue"
    import MyCart from "../components/cart/MyCart.vue"

</script>

<template>
    <div class="column">
        <Catalog />

        <MyCart />
    </div>
</template>

<style lang="sass">
.c_container
    body.mobile &
        width: 70vw

    body.desktop &
        width: 70vw
</style>

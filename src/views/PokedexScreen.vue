
<template>
    <PokemonsCardsExibitor/>
</template>



<script lang="ts">
import PokemonsCardsExibitor from '@/components/pokedexComponents/PokemonsCardsExibitor.vue';
import { defineComponent } from 'vue';


export default defineComponent({
    name: 'PokedexScreen',
    components: { PokemonsCardsExibitor }
})
</script>
<template>

<div class="bg-green-200 flex flex-col">
    <div>
        <img @click="toggleCaptured" v-if="pokemon.captured" src="@/assets/images/pokeball.png" alt="" class="captured">
        <img v-else @click="toggleCaptured" src="@/assets/images/pokeball_gray.png" alt="" class="captured" />
    </div>
    <img :src="`${pokemon.image}`" alt="">
    <p class=""> {{ pokemon.name }}</p>
            <div v-if="pokemon.types && pokemon.types.length > 1">
                <span :class="pokemon.types[0].toLowerCase()" class=" " 
                id="double-type"> {{ pokemon.types[0] }} </span>
                <span :class="pokemon.types[1].toLowerCase()" class="" 
                id="double-type"> {{ pokemon.types[1] }} </span>
            </div>
            <div v-else>
                <span :class="pokemon.types[0].toLowerCase()" class="" id=""> {{ pokemon.types[0] }} </span>
            </div>
</div>

</template>

<script lang="ts">
import IPokemonData from '@/interfaces/IPokemonData';
import { PropType, defineComponent } from 'vue';
import { useStore } from '@/store';
import { ref } from 'vue';
import { ATUALIZAR_POKEMON } from '@/store/typeActions';


export default defineComponent({
    name:'PokemonCard',
    props: {
        pokemon: {
            type: Object as PropType<IPokemonData>, required: true
        }
    },
    setup(props) {
        const store = useStore();

        const toggleCaptured = () => {

            store.dispatch(ATUALIZAR_POKEMON, props.pokemon)
        }

        return {
            toggleCaptured, store
        }
    }

})


</script>
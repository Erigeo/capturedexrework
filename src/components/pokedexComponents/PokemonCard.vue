<template>
    <div class="bg-green-100 w-[150] h-[200] rounded-md p-1">
        <div class="flex justify-end m-0.9 ">
            <img @click="toggleCaptured" v-if="pokemon.captured" src="@/assets/images/pokeball.png" alt="" class="captured">
            <img v-else @click="toggleCaptured" src="@/assets/images/pokeball_gray.png" alt="" class="captured" />
        </div>
        <div class=" mt-2 flex items-center justify-center w-auto h-fit mx-1 rounded-md bg-white ">
            <img :src="`${pokemon.image}`" alt="">
        </div>

        <div class="flex justify-center mt-1 mb-1">
            <p class="text-[10px]"> {{ pokemon.name }}</p>
        </div>

        <div v-if="pokemon.types && pokemon.types.length > 1" class="flex justify-center">
            

            <div  class="  w-auto h-fit px-1 rounded-md flex" :class="getPokemonType(pokemon.types[0])">
                <span  class=" text-[7px] " > {{ pokemon.types[0] }}</span>
            </div>
            
            <div  class=" w-auto h-fit px-1 rounded-md flex" :class="getPokemonType(pokemon.types[1])" >
                <span  class="text-[7px]" > {{ pokemon.types[1] }}</span>
            </div>
           
        </div>

        <div v-else  :class="getPokemonType(pokemon.types[0])" class="flex justify-center w-auto h-fit mx-1 rounded-md flex  " >
            <span  class="text-[7px] " > {{ pokemon.types[0] }} </span>
        </div>
    </div>
</template>

<script lang="ts">
import IPokemonData from '@/interfaces/IPokemonData';
import { PropType, defineComponent } from 'vue';
import { useStore } from '@/store';
import { ATUALIZAR_POKEMON } from '@/store/typeActions';


export default defineComponent({
    name: 'PokemonCard',
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

        const getPokemonType = (type: string) : string => {
        console.log('bg-' + type)
            return 'bg-' + type
        }

        return {
            toggleCaptured, store, getPokemonType
        }
    }

})


</script>
<template>
    <div class="bg-green-100 w-[70px] h-[115px]  md:w-[100px] md:h-[120px] lg:w-[100px] lg:h-[140px] xl:w-[100px] xl:h-[150px] rounded-md p-1">
        <div class="flex  justify-end">
            <img @click="toggleCaptured" v-if="pokemon.captured" src="@/assets/images/pokeball.png" alt="" class="w-4" >
            <img v-else @click="toggleCaptured" src="@/assets/images/pokeball_gray.png" alt="" class="w-4" />
        </div>
        <div class=" mt-1 flex items-center justify-center w-auto h-fit mx-1 rounded-md bg-white ">
            <img :src="`${pokemon.image}`" alt="">
        </div>

        <div class="flex justify-center mt-1 mb-1">
            <p class="text-[10px]"> {{ pokemon.name }}</p>
        </div>

        <div v-if="pokemon.types && pokemon.types.length > 1" class="flex justify-center gap-0.5 mx-0.5">


            <div class="  w-auto h-fit px-[4px] rounded-md flex" :class="getPokemonType(pokemon.types[0])">
                <span class=" text-[7px] "> {{ pokemon.types[0] }}</span>
            </div>

            <div class=" w-auto h-fit px-[4px] rounded-md flex" :class="getPokemonType(pokemon.types[1])">
                <span class="text-[7px]"> {{ pokemon.types[1] }}</span>
            </div>

        </div>

        <div v-else :class="getPokemonType(pokemon.types[0])"
            class="flex justify-center w-auto h-fit mx-3 rounded-md flex  ">
            <span class="text-[7px] "> {{ pokemon.types[0] }} </span>
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
        type ColorMap = {
            [key: string]: string;
        };
        const store = useStore();
        const colorMap: ColorMap = {
            fire: 'bg-fire',
            normal: 'bg-normal',

            water: 'bg-water',
            electric: 'bg-electric',
            grass: 'bg-grass',
            ice: 'bg-ice',
            fighting: 'bg-rose-600',
            poison: 'bg-purple-500',
            ground: 'bg-ground',
            flying: 'bg-flying',
            psychic: 'bg-psychic',
            bug: 'bg-bug',
            rock: 'bg-rock',
            ghost: 'bg-violet-400',
            dragon: 'bg-indigo-500',
            dark: 'bg-dark',
            steel: 'bg-steel',
            fairy: 'bg-rose-200'


        }

        const toggleCaptured = () => {

            store.dispatch(ATUALIZAR_POKEMON, props.pokemon)
        }

        const getPokemonType = (type: string): string => {
            return colorMap[type] || 'bg-gray-100'
        }

        return {
            toggleCaptured, store, getPokemonType
        }
    }

})


</script>
<template>
    <div class="flex flex-row items-center justify-center mx-20 my-5">


       
            <div class="flex flex-row justify-start  mx-5">
                <input v-model="showCaptured" id="checkbox_captured" type="checkbox"
                    class="w-4 h-4 text-blue-600 bg-white  border-gray-300 rounded">
                <label for="checkbox-captured" class="ms-2 text-[11px]  flex">Show Captured</label>
            </div>
            <div class="flex flex-row   mx-5">
                <input checked id="checkbox_non_captured" type="checkbox" v-model="showNonCaptured"
                    class="w-4 flex h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
                <label for="checkbox_non_captured" class="ms-2 text-[11px]">Show NonCaptured</label>
            </div>
      

            <div class="flex flex-col m-2 justify-start ">
        <div>
            <div @click="open = !open" class="w-[100px] h-[25px] bg-white text-[13px] rounded-t flex justify-center items-center    " :class="{'rounded-b': !open}">
                <button class="mx-1">
                {{ selectedGame }}
            </button>

                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
            </div>


            <div v-if="open" class="w-[100px] h-auto  bg-white  absolute p-1 rounded-b ">
                <ul class="items-center text-left flex-col flex">
                    <li v-for="game in games" :key="game.id" class="flex flex-row cursor-pointer">
                        <a  v-if="game.label != selectedGame"  class="text-[11px] text-right block " @click="selectGame(game)"> {{ game.label }} </a>
                    </li>
                </ul>

            </div>
        </div>

    </div>
        
         

        <div class="flex flex-row  border-gray-300 bg-white rounded-md  mx-5 ">
                <input v-model="search" type="search" class=" m-auto h-10 px-5 focus:outline-none rounded-md " name="search" placeholder="Search">
                <button type="submit" class="mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>

        </div>
    </div>



   




    <div class="flex justify-center">
        <section class="grid grid-cols-5 sm:grid-cols-7 gap-1 p-1 md:grid-cols-10 ">
            <div v-for="pokemon in filteredPokemon" :key="pokemon.id" class="sm:m-1 flex">
                <PokemonCard :pokemon="pokemon" class="" />
            </div>
        </section>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { OBTER_POKEMONS } from '@/store/typeActions'
import { ref } from 'vue';
import PokemonCard from './PokemonCard.vue';



export default defineComponent({
    name: 'PokemonsCardsExibitor',
    setup() {
        const store = useStore();
        const showCaptured = ref(false);
        const showNonCaptured = ref(true);
        const open = ref(false);
        const selectedGame = ref('All games');
        const games = ref([
            { id: 1, label: 'All games' },
            { id: 2, label: 'Emerald' },
            { id: 3, label: 'Fire Red' },
        ]);
        const capturedKey = ref(0);
        const search = ref('');
        const localStorageKey = ref('pokemonApp');
        let pokemons = computed(() => store.state.pokemons);

        store.dispatch(OBTER_POKEMONS);


        const filteredPokemon = computed(() => {
            return pokemons.value.filter(pokemon => (pokemon.Games?.includes(selectedGame.value.toLowerCase()) || selectedGame.value == "All games") && ((pokemon.captured && showCaptured.value) || (!pokemon.captured && showNonCaptured.value)) &&
                (pokemon.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1));
        });

        const selectGame = (game: {
            id: number;
            label: string;
        }) => {
            selectedGame.value = game.label;
        };

        const saveFiltersState = () => {
            const filtersState = {
                showCaptured: showCaptured.value,
                showNonCaptured: showNonCaptured.value,
                selectedGame: selectedGame.value,
                search: search.value,
            };
            localStorage.setItem(localStorageKey.value, JSON.stringify(filtersState));
        };

        watch(pokemons, () => {
            capturedKey.value += 1;
            saveFiltersState();
        }, { deep: true });
        const propertiesToWatch = ['showCaptured', 'showNonCaptured', 'selectedGa   me', 'search'];
        propertiesToWatch.forEach(prop => {
            watch(() => prop, saveFiltersState);
        });

        const loadFiltersState = () => {
            const storedFiltersState = localStorage.getItem(localStorageKey.value);
            if (storedFiltersState) {
                const filtersState = JSON.parse(storedFiltersState);
                showCaptured.value = filtersState.showCaptured;
                showNonCaptured.value = filtersState.showNonCaptured;
                selectedGame.value = filtersState.selectedGame;
                search.value = filtersState.search;
            }
        };

        onMounted(() => {
            const storedPokebank = localStorage.getItem('projetos');
            if (storedPokebank) {
                pokemons = JSON.parse(storedPokebank);
            }
            loadFiltersState();
        });



        return {
            pokemons: computed(() => store.state.pokemons), store, showCaptured, showNonCaptured, filteredPokemon, open, selectedGame, selectGame, games, search
        };
    },
    components: { PokemonCard }
})


</script>



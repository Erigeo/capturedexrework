<template>

<div class="flex items-center mb-4">
            <input v-model="showCaptured" id="checkbox_captured" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox-captured" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Captured</label>
        </div>
        <div class="flex items-center">
            <input checked id="checkbox_non_captured" type="checkbox" v-model="showNonCaptured"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checkbox_non_captured" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show NonCaptured</label>
        </div>

    <section class="grid grid-cols-5 p-1 ">
        <div v-for="pokemon in filteredPokemon" :key="pokemon.id" class="m-1">
            <PokemonCard :pokemon="pokemon"/>
        </div>
    </section>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useStore} from '@/store';
import { OBTER_POKEMONS } from '@/store/typeActions'
import { ref } from 'vue';
import PokemonCard from './PokemonCard.vue';



export default defineComponent({
    name: 'PokemonsCardsExibitor',
    setup() {
        const store = useStore();
         const showCaptured = ref(false);
        const showNonCaptured = ref(true);
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
            pokemons: computed(() => store.state.pokemons), store, showCaptured, showNonCaptured, filteredPokemon
        };
    },
    components: { PokemonCard }
})


</script>



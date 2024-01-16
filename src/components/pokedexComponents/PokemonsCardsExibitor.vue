<template>
<section class="">






<div v-for="pokemon in filteredPokemon" :key="pokemon.id">
 
</div>
</section>





</template>


<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { OBTER_POKEMONS } from '@/store/typeActions'
import { ref } from 'vue';



export default defineComponent({
    name: 'PokemonsCardsExibitor',


    setup() {
        const store = useStore()
        const showCaptured = ref('false')
        const showNonCaptured = ref('true')
        const selectedGame = ref('All games')
        const games = ref([
            { id: 1, label: 'All games' },
            { id: 2, label: 'Emerald' },
            { id: 3, label: 'Fire Red' },
        ]);
        const capturedKey = ref(0)
        const search = ref('')
        const localStorageKey = ref('pokemonApp')
        let pokemons = computed(() => store.state.pokemons)


        const filteredPokemon = computed(() => {
            return pokemons.value.filter(pokemon =>
                (pokemon.Games?.includes(selectedGame.value.toLowerCase()) || selectedGame.value == "All games") && ((pokemon.captured && showCaptured.value) || (!pokemon.captured && showNonCaptured.value)) &&
                (pokemon.name.toLowerCase().indexOf(search.value.toLowerCase()) != -1)
            )
        }
        )

        const selectGame = (game: { id: number, label: string }) => {
            selectedGame.value = game.label
        }

        const saveFiltersState = () => {
            const filtersState = {
                showCaptured: showCaptured.value,
                showNonCaptured: showNonCaptured.value,
                selectedGame: selectedGame.value,
                search: search.value,
            };

            localStorage.setItem(localStorageKey.value, JSON.stringify(filtersState));
        }

        watch(pokemons, () => {
            capturedKey.value += 1;
            saveFiltersState();
        }, { deep: true });

        const propertiesToWatch = ['showCaptured', 'showNonCaptured', 'selectedGame', 'search'];

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
        }

        onMounted(() => {
            const storedPokebank = localStorage.getItem('projetos');

            if (storedPokebank) {
                pokemons = JSON.parse(storedPokebank);
            }
            loadFiltersState();
        })

        store.dispatch(OBTER_POKEMONS)

        return {
            pokemons: computed(() => store.state.pokemons), store, filteredPokemon
        }
    }

})


</script>



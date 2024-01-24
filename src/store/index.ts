import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore } from "vuex"
import IPokemonData from '@/interfaces/IPokemonData'
import http from '@/http'
import { DEFINIR_POKEMONS, EDITAR_STATUS_POKEMON } from './typeMutations'
import { ATUALIZAR_POKEMON, OBTER_POKEMONS } from './typeActions'



export interface estado {
    pokemons: IPokemonData[]

}

export const key: InjectionKey<Store<estado>> = Symbol()


export const store = createStore<estado>({
    state: {
        pokemons: [

        ]
    },
    mutations: {
        [DEFINIR_POKEMONS] (state, pokemon: IPokemonData[]){
            state.pokemons = pokemon
        },
        [EDITAR_STATUS_POKEMON] (state, pokemon: IPokemonData){
            const index = state.pokemons.findIndex( poke => poke.id == pokemon.id)
            
            if (index !== -1) {
                // Verifica se o Pokémon foi encontrado no array antes de tentar acessá-lo
                state.pokemons[index].captured = !state.pokemons[index].captured;
            }

        }
    },
    actions: {
        [OBTER_POKEMONS] ({commit}) {
            const url = 'pokemons'
            http.get(url)
                .then(resposta => commit(DEFINIR_POKEMONS, resposta.data))
        },
        [ATUALIZAR_POKEMON] ({commit}, pokemon: IPokemonData){
            return http.put(`/pokemons/${pokemon.id}`, pokemon)
                .then(resposta => commit(EDITAR_STATUS_POKEMON, resposta.data) )
        }
    },

})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}
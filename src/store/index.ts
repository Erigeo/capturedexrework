import { InjectionKey } from 'vue'
import { Store, createStore, useStore as vuexUseStore } from "vuex"
import IPokemonData from '@/interfaces/IPokemonData'
import http from '@/http'
import { DEFINIR_POKEMONS } from './typeMutations'
import { OBTER_POKEMONS } from './typeActions'



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
        }
    },
    actions: {
        [OBTER_POKEMONS] ({commit}) {
            let url = 'pokemons'

            http.get(url)
                .then(resposta => commit(DEFINIR_POKEMONS, resposta.data))
        }
    },

})

export function useStore(): Store<estado> {
    return vuexUseStore(key)
}
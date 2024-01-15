<template>
    <header>
        <nav class="flex-col md:flex-row flex  md:items-center justify-between bg-pink-100 border-gray-200">

            <div class="bg-pink-100 border-gray-200 font-[Poppins] w-full flex items-center justify-between flex-row">
                <div class="flex items-center">
                    <img class="w-20"
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/da52d9d4-ad20-466e-baa8-9be772063da2/da5lewb-b97d46f4-f193-40fd-b3d7-fbc05f6691cd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RhNTJkOWQ0LWFkMjAtNDY2ZS1iYWE4LTliZTc3MjA2M2RhMlwvZGE1bGV3Yi1iOTdkNDZmNC1mMTkzLTQwZmQtYjNkNy1mYmMwNWY2NjkxY2QucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.EyCUsh5dNHINAU9R-GjLs8HnfaGR843HRWiHegK7JXQ"
                        alt="">
                    <span class="text-xl">captureDex</span>
                </div>
                    <!--ver isso do condicional baseado no tamanho da tela-->
                    <!-- <button class="rounded-2xl bg-white p-1 mx-3">SignUp</button>-->
                    <ion-icon v-if="!toggleIsActived" @click="toggle" name="menu-outline"
                        class="text-3xl cursor-pointer md:hidden mx-3"></ion-icon>
                    <ion-icon v-else @click="toggle" name="close" class="text-3xl cursor-pointer md:hidden mx-3"></ion-icon>
            </div>

            
                <ul class=" flex-col justify-start md:mx-5 flex md:flex-row md:items-center md:justify-between " :class="{ 'hidden md:flex': !toggleIsActived }">
                    <li class="hover:text-gray-300 md:mx-5 px-4 py-2 mt-2">
                        <RouterLink to="/">
                            Home
                        </RouterLink>
                    </li>
                    <li class="hover:text-gray-300 md:mx-5 px-4 py-2 mt-2">
                        <RouterLink to="/pokedex">
                            Pokedex
                        </RouterLink>
                    </li>
                    <li class="hover:text-gray-300 md:mx-5 px-4 py-2 mt-2">
                        <RouterLink to="/login">
                            FAQ
                        </RouterLink>
                    </li>
                </ul>
        </nav>
    </header>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';


export default defineComponent({
    name: 'BannerNav',

    setup() {
        const toggleIsActived = ref(false);

        const toggle = () => {
            toggleIsActived.value = !toggleIsActived.value

        }

        return {
            toggleIsActived, toggle
        }
    }
})
</script>



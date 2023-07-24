<template>
    <div class="flex flex-col w-full h-full pt-[124px] px-[5%]">
        <div class="flex flex-col items-center justify-center w-full p-24">
            <div class="flex border-2 border-white rounded-full p-24">
                <font-awesome-icon icon="user" class="text-white text-8xl" />
            </div>
            <button
                class="outline-none border px-2 py-4 w-[120px] my-5 rounded-xl text-white text-lg hover:text-red-500">Edit</button>
            <div class="flex flex-col text-center my-5">
            </div>
            <div class="flex flex-col text-center w-full">
                <h2 class="text-white text-2xl">{{ data.userName }}</h2>
                <h2 class="text-white text-2xl">{{ data.email }}</h2>
            </div>
            <div class="flex h-[1px] my-4 bg-white w-2/4"></div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: "profile",
    data() {
        return {
            data: {}
        }
    },
    methods: {
        async getUserData() {
            const userId = localStorage.getItem("userId");
            const response = await axios.get("http://localhost:4444/auth/me", {
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer" + localStorage.getItem('token'),
                },
            })
            console.log(response.data)
            this.data = response.data
        }
    },
    created() {
        this.getUserData()
    }
}
</script>
<style></style>
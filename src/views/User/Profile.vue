<template>
    <div class="flex flex-col w-full h-screen pt-[124px] px-[5%]">
        <div class="flex flex-col items-center justify-center w-full p-24">
            <div class="flex border-2 border-white rounded-full p-24">
                <font-awesome-icon icon="user" class="text-white text-8xl" />
            </div>
            <input type="file" ref="fileInput" style="display: none" @change="upLoadFile" />
            <button class="outline-none border px-2 py-4 w-[120px] my-5 rounded-xl text-white text-lg hover:text-red-500"
                @click="selectFile">Select File</button>
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
import { ref } from 'vue'
export default {
    name: "profile",
    setup() {
        const fileInput = ref(null);
        const selectedFile = ref(null);

        const selectFile = () => {
            if (fileInput.value) {
                fileInput.value.click();
            }
        };

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            selectedFile.value = file;
            console.log(file)
        };

        return {
            fileInput,
            selectedFile,
            selectFile,
            handleFileChange
        };
    },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        async getUserData() {
            try {
                const response = await axios.get("http://localhost:4444/auth/me", {
                    headers: {
                        accept: "application/json",
                        Authorization:
                            "Bearer" + localStorage.getItem('token'),
                    },
                })
                // console.log(response.data)
                this.data = response.data
            } catch (e) {
                console.log(e)
            }
        },
        async upLoadFile(event) {
            try {
                const userId = localStorage.getItem("userId")

                const formData = new FormData();
                const file = event.target.files[0]
                formData.append("image", file);

                const response = await axios.post(`http://localhost:4444/upload/${userId}`, formData)
                console.log(response.data)

            } catch (error) {
                console.log(error)
            }

        }
    },
    created() {
        this.getUserData()
    },
    computed() {
        this.getUserData()
    }
}
</script>
<style></style>
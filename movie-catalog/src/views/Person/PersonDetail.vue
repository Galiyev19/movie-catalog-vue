<template>
    <div class="person_detail_main">
        <div class="person_info">
            <div class="person_info_img">
                <img :src="url + personData.profile_path" />
            </div>
            <div class="person_info_detail">
                <h2 class="text-white text-3xl font-bold mb-4">{{ personData.name }}</h2>
                <p class="text-white text-2xl leading-9 whitespace-pre-wrap mb-8">{{ personData.biography }}</p>
                <ul class="grid grid-cols-2 w-3/5">
                    <template v-if="personData.place_of_birth">
                        <span class="flex text-red-600 mb-2">Place of birth</span>
                        <span class="flex text-white">{{ personData.place_of_birth }}</span>
                    </template>
                    <template v-if="personData.birthday">
                        <span class="flex text-red-600 mb-2">Birthday</span>
                        <span class="flex text-white">{{ personData.birthday }}</span>
                    </template>
                    <template v-if="personData.known_for_department">
                        <span class="flex text-red-600 mb-2">Known for</span>
                        <span class="flex text-white">{{ personData.known_for_department }}</span>
                    </template>
                </ul>
                <person-links />
            </div>
        </div>
    </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import PersonLinks from '../../components/PersonLinks.vue';
export default {
    name: "person-detail",
    components: { PersonLinks },
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original/",
            personData: []
        }
    },
    methods: {
        async getPersonData() {
            const personId = sessionStorage.getItem("personId")
            const result = await apiMovies.getPersonInfo(personId)
            console.log(result)
            this.personData = result
        }
    },
    computed() {
        this.getPersonData()
    },
    created() {
        this.getPersonData()
    },
}
</script>
<style >
.person_detail_main {
    display: flex;
    width: 100%;

    flex-direction: column;
    padding: 124px 10% 0% 5%;
}

.person_info {
    display: flex;
    /* display: grid; */
    /* grid-template-columns: 20% 60%; */
    width: 100%;
    align-items: start;
    justify-content: center;
    padding: 5rem 0px;
}

.person_info_img {
    display: flex;
    align-items: start;
    justify-content: center;
    width: 100%;
    height: 50%;
}

.person_info_img img {
    /* height: 400px;
    width: 300px; */
    height: 100%;
}

.person_info_detail {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    padding: 1rem;
}

@media (max-width:1024px) {
    .person_info {
        flex-direction: column;
        padding: 0;
        justify-content: start;
    }
}
</style>Links
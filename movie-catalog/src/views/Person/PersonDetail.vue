<template>
    <div class="person_detail_main">
        <div class="person_info">
            <div class="person_info_img">
                <img :src="url + personData.profile_path" class="w-2/4" />
            </div>
            <div class=" person_info_detail">
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
        <!-- /**
            * ! Tabs menu
        */ -->
        <div class="flex flex-col w-full my-2">
            <tabs-menu :tabs="tabs" :currentIndex="currentIndex" :setCurrentindex="setCurrentindex" />
            <!-- /**
                * ! Known for movie and tv list
            */ -->
            <div class="flex flex-col" v-if="currentIndex === 0">
                <span class="text-white text-4xl font-bold mt-2">Movie</span>
                <div class="flex w-full h-[1px] bg-white mt-3"></div>
                <div class="flex w-full py-10">
                    <media :personCredits="personMovieCredits" :media_type="movie" />
                </div>
                <span class="text-white text-4xl font-bold mt-2">TV Serials</span>
                <div class="flex w-full h-[1px] bg-white mt-3"></div>
                <div class="flex w-full py-10" v-if="!currentIndex">
                    <media :personCredits="personTvCredits" :media_type="tv" />
                </div>
            </div>
            <!-- /**
                * ! Person photo list
            */ -->
            <div class="flex flex-col" v-if="currentIndex === 1">
                <span class=" text-white text-3xl">Photos</span>
                <div class="flex w-full h-[1px] bg-white mt-3"></div>
                <div class="flex w-full py-10">
                    <photos :photos="this.photos" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apiMovies from '../../api/api-movies';
import PersonLinks from '../../components/PersonLinks.vue';
import TabsMenu from '../../components/TabsMenu.vue';
import Media from '../../components/Media.vue';
import Photos from '../../components/Person/Photos.vue';
export default {
    name: "person-detail",
    components: { PersonLinks, TabsMenu, Media, Photos },
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original/",
            personData: [],
            tabs: [
                { id: 1, nameTab: "known for" },
                { id: 2, nameTab: "photos" },
            ],
            currentIndex: 0,
            personMovieCredits: [],
            personTvCredits: [],
            movie: "movie",
            tv: "tv",
            photos: []
        }
    },
    methods: {
        async getPersonData() {
            const personId = sessionStorage.getItem("personId");
            const result = await apiMovies.getPersonInfo(personId);
            console.log(result);
            this.personData = result;
        },
        async getPersonMovieCredits() {
            const personId = sessionStorage.getItem("personId");
            const result = await apiMovies.getPersonMovieCredits(personId);
            this.personMovieCredits = result.data.cast
        },
        async getPersonTvCredits() {
            const personId = sessionStorage.getItem("personId");
            const result = await apiMovies.getPersonTvCredits(personId);
            this.personTvCredits = result.data.cast
        },
        async getPersonImage() {
            const personId = sessionStorage.getItem("personId");
            const result = await apiMovies.getPersonImage(personId);
            console.log(result)
            this.photos = result;
        },
        setCurrentindex(index) {
            this.currentIndex = index;
        }
    },
    computed() {
        this.getPersonData();
        this.getPersonMovieCredits();
        this.getPersonTvCredits();
        this.getPersonImage();
    },
    created() {
        this.getPersonData();
        this.getPersonMovieCredits()
        this.getPersonTvCredits()
        this.getPersonImage();
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
    /* height: 50%; */
}

/* .person_info_img img {
    height: 400px;
    width: 300px;
    height: 100%;
} */

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
</style>
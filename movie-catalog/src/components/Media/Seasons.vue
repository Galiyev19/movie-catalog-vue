<template>
    <div class="flex w-full items-center justify-between">
        <button class="btn_slider" @click="prev">
            <font-awesome-icon icon="chevron-left"
                class="text-white text-6xl max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs hover:text-red-500" />
        </button>
        <div class="flex w-full items-center  overflow-x-auto overflow-y-hidden whitespace-nowrap scroll-smooth"
            ref="scrollRef">
            <div class="card_season cursor-pointer relative hover:opacity-70"
                v-for="(season, index) in this.$store.getters.getMovieDetail.seasons" :key="season.id"
                v-on:mouseover="mouseover(index)" v-on:mouseleave="this.mouseLeave()">
                <img :src="url + season.poster_path" class="object-contain max-h-[800px]" />
                <div class="show flex-col items-center justify-center absolute h-full w-full inset-0 card_season__content">
                    <h2 class="text-red-600 text-3xl font-bold">Season Name: {{ season.name }}</h2>
                    <h2 class="text-red-600 text-3xl font-bold">Episodes: {{ season.episode_count }}</h2>
                </div>
            </div>

        </div>
        <button class="btn_slider" @click="next">
            <font-awesome-icon icon="chevron-right"
                class="text-white text-6xl max-[992px]:text-6xl max-[768px]:text-4xl max-[576px]:text-2xl max-[418px]:text-xs hover:text-red-500" />
        </button>
    </div>
</template>
<script>
//  :class="currentIndex === index ? 'show' : 'hide'"
import { mapActions } from 'vuex';
import { ref } from 'vue'
export default {
    setup() {
        const scrollRef = ref(null);

        const next = () => {
            if (scrollRef.value) {
                scrollRef.value.scrollBy({
                    left: window.innerWidth,
                    behavior: "smooth",
                });
            }
            console.log(1)
        };

        const prev = () => {
            if (scrollRef.value) {
                scrollRef.value.scrollBy({
                    left: -window.innerWidth,
                    behavior: "smooth",
                });
            }
        };
        return {
            next,
            scrollRef,
            prev,
        };
    },
    name: 'seasons-list',
    props: [''],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original/",
            isHover: false,
            currentIndex: null,
        }
    },
    methods: {
        ...mapActions(["getMovieDetail"]),
        mouseover(index) {
            this.currentIndex = index
            this.isHover = true
        },
        mouseLeave() {
            this.currentIndex = null
            this.isHover = false
        }
    },
    created() {
        this.getMovieDetail()
    },
    computed() {
        this.getMovieDetail()
    },

}
</script>
<style>
::-webkit-scrollbar {
    height: 8px;
    cursor: pointer;
}

::-webkit-scrollbar-thumb {
    background: gray;
    cursor: pointer;
}

.card_season {
    display: flex;
    flex-direction: column;
    min-width: 25%;
    width: 100%;
    margin-right: 30px;
    transition: 0.3s;
    justify-content: space-between;
    margin-bottom: 16px;

}

.card_season__content {
    transform: translateY(75%);
    transition: transform 500ms ease;
}

.card_season:hover .card_season__content {
    transform: translateY(0);
}

.show {
    display: flex;
    transition: 0.3s ease-in;
}

.hide {
    display: none;
}


.btn_slider {
    border-radius: 4px;
    border: 1px solid #ffffffb3;
    background: rgb(18, 18, 18);
    /* position: absolute; */
    cursor: pointer;
    margin: 0px 8px;
    padding: 0.75rem 0.25rem;
}
</style>
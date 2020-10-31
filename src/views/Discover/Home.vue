<template>
  <div id="discover-home">
    <app-search-bar
      class="header"
      cursor="pointer"
      @click="search"
    >
      <template v-slot:left>
        <header class="title">网易云音乐</header>
      </template>
      <template v-slot:right>
        <app-play-indicator class="play-indicator"/>
      </template>
    </app-search-bar>
    <div class="wrapper" ref="wrapper">
      <div class="contents">
        <discover-banner/>
        <div class="features">
          <div class="feature-container" @tap="tap('recommendation')">
            <div class="calendar-container">
              <app-icon icon="calendar"/>
              <span>17</span>
            </div>
            <span>每日推荐</span>
          </div>
          <div class="feature-container" @tap="tap('/radio')">
            <app-icon icon="radio"/>
            <span>私人FM</span>
          </div>
        </div>
        <div class="recommend">
          <span class="recommend-title">推荐歌单</span>
          <div
            class="list-container"
            v-for="list in recommend"
            :key="list.id"
            @tap="tap('songlist/' + list.id)"
          >
            <img class="list-img fade-in" :src="list.picUrl">
            <span class="list-count">{{ formatNum(list.playcount) }}</span>
            <span class="list-name">{{ list.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiscoverBanner from '@/components/DiscoverBanner.vue';
import AppSearchBar from '@/components/AppSearchBar.vue';
import AppPlayIndicator from '@/components/AppPlayIndicator.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
export default {
  data: function() {
    return {
      recommend: []
    };
  },

  computed: {
    login() {
      return this.$store.state.auth.login;
    }
  },

  components: {
    DiscoverBanner,
    AppSearchBar,
    AppPlayIndicator
  },

  methods: {
    search() {
      this.$router.push('search');
    },

    tap(to) {
      if (to.includes('songlist') || this.login) {
        this.$router.push(to);
      } else {
        alert('该功能需要登录');
        this.$router.push({name: 'login', params: {dock: true}});
      }
    },

    formatNum(num) {
      if (num >= 10000) {
        return Math.floor(num / 10000) + '万';
      } else {
        return num;
      }
    }
  },

  created() {
    if (this.login) {
      fetchJSON('/recommend/resource')
        .then((res) => {
          this.recommend = res.recommend.map((item) => {
            return {
              id: item.id,
              name: item.name,
              playcount: item.playcount,
              picUrl: item.picUrl.replace('http:', 'https:')
            };
          });
          console.log(this.recommend);
        });
    } else {
      fetchJSON('/personalized')
        .then((res) => {
          this.recommend = res.result.map((item) => {
            return {
              id: item.id,
              name: item.name,
              playcount: item.playcount,
              picUrl: item.picUrl.replace('http:', 'https:')
            };
          });
          console.log(this.recommend);
        });
    }
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.scroll = createScroll(0, this.$refs.wrapper);
      });
  },

  updated() {
    this.scroll.refresh();
  }
};
</script>

<style scoped>
#discover-home {
  height: 100%;
  display: grid;
  grid-template-rows:
    [start header-start] 3rem
    [header-end contents-start] 1fr [contents-end end];
}

.wrapper {
  height: 100%;
  grid-row: contents;
  overflow: hidden;
  position: relative;
}

.contents {
  min-height: 101%;
  user-select: none;
  display: grid;
  grid-template-rows:
    [start banner-start] min(42vw, 20rem) [banner-end features-start]
    min-content [features-end list-start] max-content [list-end];
}

.header {
  width: 100%;
  height: 100%;
  background-color: var(--app-color);
  color: white;
  grid-row: header;

  display: grid;
  grid-template-columns: [start left-start] 6rem [left-end search-start]
    1fr [search-end right-start] 3rem [right-end end];
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.title {
  grid-column: left-start / left-end;
}

.play-indicator {
  grid-column: right-start / right-end;
}

.features {
  grid-row: features;
  padding: 1rem;
  box-sizing: border-box;
  height: 5.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 40vw 40vw;
  justify-content: space-around;
  place-items: center;
}

.feature-container {
  width: 100%;
  max-width: 10rem;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 2fr 3fr;
  border-radius: 0.6rem;
  box-shadow: 0 0 10px #ddd;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.feature-container > svg {
  font-size: 1.5rem;
  justify-self: end;
  color: var(--app-color);
  padding: 0.4rem;
}

.feature-container > span {
  justify-self: start;
}

.calendar-container {
  font-size: 1.5rem;
  justify-self: end;
  color: var(--app-color);
  padding: 0.4rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr;
  place-items: center;
}

.calendar-container > svg {
  grid-row: 1 / 3;
  grid-column: 1 / 2;
}

.calendar-container > span {
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  font-size: 0.7rem;
}

.recommend {
  box-sizing: border-box;
  grid-row: list;
  display: grid;
  grid-template-rows: [title-start] 2rem [title-end];
  grid-template-columns: [start] repeat(3, 29vw) [end];
  place-items: center;
  justify-content: center;
  grid-auto-rows: 33vw;
  gap: 2vw;
}

.recommend-title {
  justify-self: start;
  grid-row: title;
  grid-column: start / end;
  font-size: 1.1rem;
  font-weight: bold;
}

.list-container {
  height: 29vw;
  width: 29vw;
  display: grid;
  grid-template-rows:
    [img-start] minmax(25vw, 1fr) [img-end text-start]
    2rem [text-end];
  grid-template-columns:
    [start] 0.5rem [img-start]
    minmax(25vw, 1fr) [img-end] 0.5rem [end];
}

.list-img {
  grid-row: img;
  grid-column: img;
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
}

.list-name {
  grid-row: text;
  grid-column: img;
  width: 100%;
  height: 2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.7rem;
}

.list-count {
  grid-row: img;
  grid-column: img;
  justify-self: end;
  padding: 0.3rem;
  font-size: 0.7rem;
  color: white;
}
</style>

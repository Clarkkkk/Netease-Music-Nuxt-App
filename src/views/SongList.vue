<template>
  <div id="song-list" ref="wrapper">
    <div class="background-container" ref="backgroundBox">
      <div
        class="background fade-in"
        ref="background"
        :style="bgStyle"
      ></div>
    </div>
    <div :class="['fixed-container', {'blur': type==='songlist'}]">

      <div class="header">
        <app-back-button/>
        <div class="title">
          {{ title ? title : '歌单' }}
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>

      <div class="info" ref="info">
        <div class="cover" v-if="type==='songlist'">
          <img :src="cover" class="fade-in">
        </div>
        <div class="name" v-if="name">
          {{ name }}
        </div>
        <div class="creator" v-if="creator">
          {{ creator }}
        </div>
        <div class="description" v-if="description">
          {{ description }}
        </div>
        <div class="date" v-if="type==='recommendation'">
          {{ dateString }}
        </div>
      </div>

      <div class="playall" @tap="playAll">
        <app-icon icon="play-circle"/>
        <span>播放全部</span>
      </div>
    </div>

    <div class="list">
      <div class="placeholder"></div>
      <app-loading-icon v-if="loading"/>
      <app-song-entry
        v-for="song in list"
        class="entry"
        :key="song.id"
        :songName="song.name"
        :songArtist="song.artist"
        :songId="song.id"
        :songAlbum="song.album"
        :songCover="song.cover"
      />
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppSongEntry from '@/components/AppSongEntry.vue';
import AppLoadingIcon from '@/components/AppLoadingIcon';
import fetchJSON from '@/functions/fetchJSON.js';
import createScroll from '@/functions/createScroll.js';
export default {
  data: function() {
    return {
      loading: true,
      title: '',
      name: '',
      creator: '',
      description: '',
      cover: require('@/assets/default-pic.jpg'),
      tags: [],
      list: []
    };
  },

  props: ['type', 'listId'],

  computed: {
    dateString: function() {
      const today = new Date();
      const hours = today.getHours();
      let greetings = '你好';
      if (hours >= 6 && hours <= 12) {
        greetings = '早上好';
      } else if (hours >= 13 && hours <= 18) {
        greetings = '下午好';
      } else if (hours >= 19 && hours <= 24) {
        greetings = '晚上好';
      } else if (hours >= 0 && hours <= 5) {
        greetings = '早点睡哦';
      }
      return `${today.getMonth()}月${today.getDate()}日，${greetings}`;
    },

    bgStyle: function() {
      if (this.type === 'songlist') {
        return `background-image:url(${this.cover})`;
      } else {
        return `background-image:linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)`;
      }
    }
  },

  components: {
    AppBackButton,
    AppSongEntry,
    AppLoadingIcon
  },

  created() {
    if (this.type === 'recommendation') {
      this.title = '每日推荐';
      fetchJSON('/recommend/songs')
        .then((res) => {
          if (res.code === 200) {
            this.createList(res.data.dailySongs);
          }
        });
    } else if (this.type === 'songlist') {
      fetchJSON('/playlist/detail', {id: this.listId})
        .then((res) => {
          if (res.code === 200) {
            console.log(res);
            this.name = res.playlist.name;
            this.creator = res.playlist.creator.nickname;
            this.description = res.playlist.description;
            this.cover = res.playlist.coverImgUrl.replace('http:', 'https:');
            this.tags = res.playlist.tags;
            const ids = res.playlist.trackIds.map((item) => item.id).join(',');
            this.createList(res.playlist.tracks);
            if (res.playlist.tracks.length < res.playlist.trackCount) {
              return fetchJSON('/song/detail', {ids: ids});
            }
          }
        }).then((res) => {
          if (res && res.code === 200) {
            this.createList(res.songs);
          }
        });
    }
  },

  mounted() {
    if (!this.cover) {
      this.$refs.background.style.backgroundImage =
        'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)';
    }
  },

  updated() {
    if (this.scroll) {
      this.scroll.refresh();
    }
  },

  watch: {
    loading(isLoading) {
      if (!isLoading) {
        this.$nextTick()
          .then(() => {
            this.scroll = createScroll(2, this.$refs.wrapper, onScroll);
            const self = this;
            function onScroll(pos) {
              const percentage = (-pos.y) / 200 < 1 ? (-pos.y) / 200 : 1;
              self.$refs.info.style.opacity = `${1 - percentage}`;
              self.$refs.info.style.height = `calc(12rem + (${pos.y}px))`;
              self.$refs.backgroundBox.style.height = `calc(15rem + (${pos.y}px))`;
              self.$refs.background.style.height = `calc(15rem + (${pos.y}px))`;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  },

  methods: {
    playAll() {
      this.$router.push('/play');
      this.$store.commit('commonPlay/playTheList', this.list);
    },

    createList(songs) {
      // extract useful information and map it to songList
      this.list = songs.map((song) => {
        const arString = song.ar.map((item) => item.name).join('/');
        return {
          id: song.id,
          name: song.name,
          artist: arString,
          album: song.al.name,
          cover: song.al.picUrl
        };
      });
      this.loading = false;
    }
  }
};
</script>

<style scoped>
#song-list {
  grid-column: start / end;
  width: 100%;
  height: calc(100vh - 2.5rem);
  background-color: white;
  position: relative;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(15rem + env(safe-area-inset-top));
  min-height: 3rem;
  overflow: hidden;
  z-index: 10;
}

.background {
  background-color: #000;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform: scale(1.1);
  width: 100%;
  height: 15rem;
  min-height: 3rem;
  overflow: hidden;
}

@supports not (backdrop-filter: blur(30px)) {
  .background {
    filter: brightness(0.2);
  }
}

@supports (backdrop-filter: blur(30px)) {
  .blur {
    backdrop-filter: blur(30px);
  }
}

/* fixed container */
.fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20;
  transform: translate3d(0px, 0px, 2px);
  background-color: #00000010;
  display: grid;
  grid-template-rows:
    [start header-start] min-content [header-end info-start]
    min-content [info-end button-start] 3rem
    [button-end end];
  grid-template-columns: [start] 100% [end];
}

/* filter build another stack context, z-index is required */
.header {
  grid-row: header;
  grid-column: start / end;
  height: calc(3rem + env(safe-area-inset-top));
  width: 100%;
  display: grid;
  grid-template-columns:
    [back-start] 2rem [back-end title-start]
    1fr [title-end right-start] 2rem [right-end];
  grid-auto-flow: column;
  place-items: center;
  color: white;
  user-select: none;
  z-index: 10;
}

.title {
  grid-row: title;
  font-size: 1.2rem;
  font-weight: bold;
}

.info {
  grid-row: info;
  grid-column: start / end;
  z-index: 10;
  height: 12rem;
  width: 100%;
  display: grid;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
  grid-template-rows:
    [start] 1fr [cover-start name-start]
    min-content [name-end creator-start] 2rem
    [creator-end des-start] 3rem [des-end]
    min-content [cover-end] 1fr [end];
  grid-template-columns:
    [cover-start] min-content [cover-end info-start]
    1fr [info-end];
  gap: 0 1rem;
  align-items: center;
}

.cover {
  grid-row: cover;
  grid-column: cover;
  height: 8rem;
  width: 8rem;
  object-fit: cover;
}

.cover > img {
  height: 100%;
  width: 100%;
  border-radius: 0.3rem;
}

.name {
  grid-row: name;
  grid-column: info;
  font-size: 1rem;
  font-weight: bold;
  color: white;
}

.creator {
  grid-row: creator;
  grid-column: info;
  font-size: 0.8rem;
  color: #eee;
}

.description {
  font-size: 0.7rem;
  line-height: 1rem;
  grid-row: des;
  grid-column: info;
  color: #eee;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.date {
  grid-row: span 1 / cover-end;
  grid-column: info;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.playall {
  background-color: white;
  position: sticky;
  grid-row: button;
  grid-column: start / end;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:
    [icon-start] 2rem [icon-end text-start]
    1fr [text-end];
  padding: 0 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  align-items: center;
  font-size: 1rem;
}
/* fixed container */

/* list */
.list {
  min-height: 101%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.5rem;
  padding-top: env(safe-area-inset-top);
  display: grid;
  grid-template-rows: [placeholder-start] min-content [placeholder-end];
  grid-auto-rows: 3rem;
  grid-template-columns: [start] 100% [end];
}

.placeholder {
  height: 18rem;
  width: 100%;
  grid-row: placeholder;
}
</style>

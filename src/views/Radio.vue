<template>
  <div id="play">

    <img alt="背景图片" class="background fade-in" :src="picUrl">

    <div class="content">
      <div class="header">
        <app-back-button/>
        <span class="title">私人FM</span>
      </div>

      <img alt="封面图片" class="cover fade-in" :src="picUrl">

      <app-loop-text :text="currentSong.name" class="song-name"/>
      <div class="song-artist">{{ currentSong.artist }}</div>

      <play-progress-bar/>
      <radio-controls/>

    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppLoopText from '@/components/AppLoopText.vue';
import PlayProgressBar from '@/components/PlayProgressBar.vue';
import RadioControls from '@/components/RadioControls.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  computed: {
    ...mapState('playStatus', ['playing']),
    ...mapGetters('radioPlay', ['currentSong']),
    ...mapState('radioPlay', ['radioIndex', 'radioList']),
    picUrl() {
      return this.currentSong.cover ?
        this.currentSong.cover : require('@/assets/default-pic.jpg');
    }
  },

  created() {
    console.log(this.$store);
    this.updateList();
    console.log(this.$store);
  },

  watch: {
    radioIndex(newIndex) {
      if (this.radioList.length - newIndex < 2) {
        this.updateList();
      }
    }
  },

  components: {
    AppBackButton,
    AppLoopText,
    PlayProgressBar,
    RadioControls
  },

  methods: {
    ...mapMutations(['clear']),
    ...mapMutations('radioPlay', ['radioListUpdate']),
    updateList() {
      fetchJSON('/personal_fm')
        .then((res) => {
          console.log(res);
          const list = res.data.map((song) => {
            const arString = song.artists.map((item) => item.name).join('/');
            return {
              id: song.id,
              name: song.name,
              artist: arString,
              album: song.album.name,
              cover: song.album.picUrl
            };
          });
          this.radioListUpdate(list);
        });
    }
  }
};
</script>

<style scoped>
#play {
  width: 100vw;
  height: 100vh;
  color: white;
  background-color: #666;
}

.background {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  filter: blur(30px) brightness(100%);
  opacity: 0.6;
  transform: scale(1.12);
}

.content {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10;
  left: 0;
  top: 0;
  display: grid;
  grid-template-areas:
    "header"
    "..."
    "cover"
    "loop-text"
    "artist"
    "..."
    "progress-bar"
    "controls";
  grid-template-rows: [start] 4rem 1fr 80vmin 3rem 1rem 2fr 2rem 5rem [end];
  grid-template-columns: [start] 100% [end];
  place-items: center;
}

/* header */
.header {
  grid-row: header;
  width: 100%;
  display: grid;
  grid-template-rows: [start] 100% [end];
  grid-template-columns:
    [start back-start] 3rem [back-end title-start]
    1fr [title-end] 3rem [end];
  grid-auto-flow: column;
  align-items: center;
  justify-items: center;
  user-select: none;
}

.title {
  grid-row: start / end;
  grid-column: title;
  font-size: 1.2rem;
  font-weight: bold;
}
/* header */

.cover {
  grid-row: cover;
  height: 100%;
  box-shadow: 0 0 20px #00000030;
  border-radius: 0.5rem;
}

/* song info */
.song-name {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.2rem;
  height: 1.2rem;
}

.song-artist {
  grid-row: artist;
  grid-column: start / end;
  font-size: 0.8rem;
}
/* song info */
</style>

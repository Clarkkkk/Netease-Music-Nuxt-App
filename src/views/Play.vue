<template>
  <div id="play">
    <img alt="背景图片" class="background" :src="picUrl">

    <div class="content">
      <div class="header">
        <app-back-button/>
        <div class="song-name">{{ songName }}</div>
        <div class="song-artist">{{ songArtist }}</div>
      </div>

      <div :class="['cover-frame', {'rolling': playing}]">
        <img
          alt="专辑图片"
          class="cover"
          :src="picUrl"
          @dragstart="dragPrevent"
        >
      </div>
      <play-controls :playing="playing"/>
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import fetchJSON from '@/functions/fetchJSON.js';
import PlayControls from '@/components/PlayControls.vue';
import {mapState, mapGetters} from 'vuex';
export default {
  data: function() {
    return {
      picUrl: require('@/assets/default-cover.png'),
      songName: '',
      songArtist: '',
    };
  },

  computed: {
    ...mapState(['playing', 'playList']),
    ...mapGetters(['playID'])
  },

  components: {
    AppBackButton,
    PlayControls,
  },

  created: function() {
    this.getInfo(this.playID);
  },

  watch: {
    playID: function(newID) {
      this.getInfo(newID);
    }
  },

  methods: {
    getInfo(id) {
      if (id) {
        fetchJSON('/song/detail', {ids: id})
          .then((obj) => {
            console.log(obj);
            const data = obj.songs[0];
            if (data.al.picUrl) {
              this.picUrl = data.al.picUrl;
            } else {
              this.picUrl = require('@/assets/default-cover.png');
            }
            this.songName = data.name;
            this.songArtist = data.ar[0].name;
          });
      }
    },

    dragPrevent(event) {
      event.preventDefault();
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

.background{
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
  grid-template-rows:
    [start header-start] 4rem [header-end] 1fr [cover-start]
    70vmin [cover-end] 1fr [controls-start] 10rem [controls-end end];
  align-items: center;
  justify-items: center;
}

/* header */
.header {
  grid-row: header-start / header-end;
  width: 100%;
  display: grid;
  grid-template-columns:
    [start back-start] 3rem [back-end info-start]
    1fr [info-end] 3rem [end];
  grid-template-rows:
    [start name-start] 1.2fr [name-end artist-start]
    1fr [artist-end end];
  align-items: center;
  justify-items: center;
  user-select: none;
}

.song-name {
  grid-row: name-start / name-end;
  grid-column: info-start / info-end;
  font-size: 1.2rem;
  font-weight: bold;
}

.song-artist {
  grid-row: artist-start / artist-end;
  grid-column: info-start / info-end;
  font-size: 0.8rem;
}
/* header */

/* rolling cover */
.cover-frame {
  grid-row: cover-start / cover-end;
  background-color: #ffffff30;
  width: 64vmin;
  height: 64vmin;
  border-radius: 32vmin;
  display: grid;
  align-items: center;
  justify-items: center;
  box-shadow: 0 0 20px #00000020;
  animation: 30s linear infinite rolling;
  animation-play-state: paused;
}

.cover {
  object-fit: cover;
  height: 60vmin;
  width: 60vmin;
  border-radius: 30vmin;
  box-shadow: 0 0 10px #00000040;
}

.cover-frame.rolling {
  animation-play-state: running;
}

@keyframes rolling {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
/* rolling cover */
</style>

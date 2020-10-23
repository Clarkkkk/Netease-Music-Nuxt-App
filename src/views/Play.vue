<template>
  <div id="play">
    <img alt="背景图片" class="background" :src="picUrl">

    <div class="content">
      <div class="header">
        <app-back-button/>
        <div class="song-name" ref="nameContainer">
          <div class="song-name-text" ref="nameText">
            {{ playName }}
          </div>
          <div class="song-name-clone" ref="nameTextClone">
            {{ playName }}
          </div>
        </div>
        <div class="song-artist">{{ playArtist }}</div>
      </div>

      <play-cover/>
      <play-interactions/>
      <play-progress-bar/>
      <play-controls :showPlayList.sync="showPlayList"/>

      <transition name="play-list">
        <play-list
          v-if="showPlayList"
          :show.sync="showPlayList"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import PlayCover from '@/components/PlayCover.vue';
import PlayInteractions from '@/components/PlayInteractions.vue';
import PlayProgressBar from '@/components/PlayProgressBar.vue';
import PlayControls from '@/components/PlayControls.vue';
import PlayList from '@/components/PlayList.vue';
import {mapState, mapGetters} from 'vuex';
export default {
  data: function() {
    return {
      showPlayList: false
    };
  },

  computed: {
    ...mapGetters(['playID', 'playName', 'playArtist', 'playCover']),
    ...mapState(['playing']),
    picUrl() {
      return this.playCover ? this.playCover : require('@/assets/default-cover.png');
    }
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        const boxWidth = this.$refs.nameContainer.clientWidth;
        const textWidth = this.$refs.nameText.clientWidth;
        const text = this.$refs.nameText;
        const clone = this.$refs.nameTextClone;
        console.log(boxWidth);
        console.log(textWidth);
        if (boxWidth < textWidth) {
          (function loop() {
            text.classList.remove('loop');
            clone.classList.remove('loop');
            text.style.transform = `translateX(0px)`;
            clone.style.transform = `translateX(${textWidth}px)`;
            document.body.offsetWidth;
            text.classList.add('loop');
            clone.classList.add('loop');
            text.style.transform = `translateX(${-textWidth}px)`;
            clone.style.transform = `translateX(0px)`;
            setTimeout(loop, 12000);
          })();
        }
      });
  },

  components: {
    AppBackButton,
    PlayCover,
    PlayInteractions,
    PlayProgressBar,
    PlayControls,
    PlayList
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
    "..."
    "interactions"
    "progress-bar"
    "controls";
  grid-template-rows: [start] 4rem 1fr 70vmin 1fr 3rem 2rem 5rem [end];
  place-items: center;
}

/* header */
.header {
  grid-row: header;
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
  grid-row: name;
  grid-column: info;
  font-size: 1.2rem;
  line-height: 1.2rem;
  height: 1.2rem;
  width: 100%;
  overflow: hidden;
  font-weight: bold;
  display: grid;
  grid-template-columns: [start] 100% [end];
  grid-template-rows: [start] 100% [end];
}

.song-name-text {
  grid-row: start / end;
  grid-column: start / end;
  white-space: nowrap;
  padding-right: 3rem;
  width: max-content;
}

.song-name-clone {
  grid-row: start / end;
  grid-column: start / end;
  white-space: nowrap;
  padding-right: 3rem;
  width: max-content;
}

.loop {
  transition: transform 8000ms linear 2000ms;
}

.song-artist {
  grid-row: artist;
  grid-column: info;
  font-size: 0.8rem;
}
/* header */

.play-list-enter, .play-list-leave-to {
  opacity: 0;
}

.play-list-enter-active, .play-list-leave-active {
  transition: opacity 300ms;
}
</style>

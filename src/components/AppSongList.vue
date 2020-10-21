<template>
  <div id="app-song-list" ref="wrapper">
    <div class=fixed-container  :style="`background-image: ${cover}`">
      <div class="header">
        <app-back-button/>
        <div class="title">
          <slot name="title">歌单</slot>
        </div>
        <div class="right">
          <slot name="right"></slot>
        </div>
      </div>

      <div class="info" ref="info">
        <div class="cover">
          <slot name="cover"></slot>
        </div>
        <div class="name">
          <slot name="name"></slot>
        </div>
        <div class="creator">
          <slot name="creator"></slot>
        </div>
      </div>

      <div class="playall" @tap="playAll">
        <app-icon icon="play-circle"/>
        <span>播放全部</span>
      </div>
    </div>

    <div class="list">
      <div class="placeholder"></div>
      <app-song-entry
        v-for="song in list"
        class="entry"
        :key="song.id"
        :songName="song.name"
        :songArtists="song.artists"
        :songId="song.id"
        :songAlbum="song.album"
      />
    </div>
  </div>
</template>

<script>
import AppBackButton from '@/components/AppBackButton.vue';
import AppSongEntry from '@/components/AppSongEntry.vue';
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import ScrollBar from '@better-scroll/scroll-bar';
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);
export default {
  props: ['list', 'cover'],
  components: {
    AppBackButton,
    AppSongEntry
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          mouseWheel: true,
          scrollbar: true,
          probeType: 3,
          tap: 'tap',
          specifiedIndexAsContent: 1
        });
        const barStyle = this.scroll.plugins.scrollbar.indicators[0].elStyle;
        const wrapperStyle = this.scroll.plugins.scrollbar.indicators[0].wrapperStyle;
        barStyle.border = 'none';
        wrapperStyle.width = '5px';
        this.scroll.on('scroll', onScroll);
        const self = this;
        function onScroll(pos) {
          const percentage = (-pos.y) / 200 > 1 ? 1 : (-pos.y) / 200;
          self.$refs.info.style.opacity = `${1 - percentage}`;
          self.$refs.info.style.height = `calc(12rem + (${pos.y}px))`;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  },

  updated() {
    this.scroll.refresh();
  },

  methods: {
    playAll() {
      this.$store.commit('playTheList', this.list);
    }
  }
};
</script>

<style scoped>
#app-song-list {
  width: 100%;
  height: calc(100vh - 2.5rem);
  overflow: hidden;
  position: relative;
}

/* fixed container */
.fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  display: grid;
  grid-template-rows:
    [header-start] 3rem [header-end info-start]
    min-content [info-end button-start] 3rem
    [button-end];
}

.header {
  grid-row: header;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns:
    [back-start] 2rem [back-end title-start]
    1fr [title-end right-start] 2rem [right-end];
  grid-auto-flow: column;
  place-items: center;
  color: white;
  user-select: none;
}

.title {
  grid-row: title;
  font-size: 1.2rem;
  font-weight: bold;
}

.info {
  position: sticky;
  grid-row: info;
  height: 12rem;
  width: 100%;
  display: grid;
  padding: 0 1rem;
  box-sizing: border-box;
  grid-template-rows:
    [start] 1fr [cover-start name-start]
    2rem [name-end creator-start] 1.5rem
    [creator-end] min-content [cover-end end];
  grid-template-columns:
    [cover-start] min-content [cover-end info-start]
    1fr [info-end];
}

.cover {
  grid-row: cover;
  grid-column: cover;
  border-radius: 1rem;
  object-fit: cover;
}

.name {
  grid-row: name;
  grid-column: info;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.creator {
  grid-row: creator;
  grid-column: info;
  font-size: 1rem;
  color: white;
}

.playall {
  background-color: white;
  position: sticky;
  grid-row: button;
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
  display: grid;
  grid-template-rows: [placeholder-start] min-content [placeholder-end];
  grid-auto-rows: 3rem;
}

.placeholder {
  height: 18rem;
  width: 100%;
  grid-row: placeholder;
}
</style>

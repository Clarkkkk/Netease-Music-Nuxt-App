<template>
  <div id="playing-list" @click.self="hide">
    <div class="container">
      <div class="header">
        <span class="title">当前播放</span>
        <span class="amount">（{{ playList.length }}）</span>
      </div>
      <div class="wrapper" ref="wrapper">
        <div
          :class="['entry', {'playing': song.id===playID}]"
          v-for="song in playList"
          :key="song.id"
        >
          <app-icon icon="speaker" v-if="song.id===playID"/>
          <span class="song-name">{{ song.name }}</span>
          <span class="song-artist">{{ ' - ' + song.artist }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import BScroll from 'better-scroll';
export default {
  porps: ['show'],
  computed: {
    ...mapState(['playList']),
    ...mapGetters(['playID'])
  },

  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        wheel: true,
        scrollbar: true,
      });
    });
  },

  methods: {
    hide() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style scoped>
#playing-list {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  padding: 1.2rem;
  box-sizing: border-box;
  background-color: #00000080;
  display: grid;
  grid-template-rows: 1fr [container-start] 25rem [container-end];
  align-items: end;
}

.container {
  grid-row: container-start / container-end;
  height: 100%;
  width: 100%;
  background-color:#ffffff90;
  backdrop-filter: blur(20px);
  border-radius: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  color: #222;
  overflow: hidden;
  display: grid;
  grid-template-rows:
    [start header-start] 2rem [header-end wrapper-start] 1fr [wrapper-end end];
  align-items: center;
}

.header {
  grid-row: header-start / header-end;
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
}

.amount {
  color: #555;
}

.wrapper {
  grid-row: wrapper;
  height: 100%;
  display: grid;
  grid-template-rows: repeat(auto-fit, 2rem);
}

.entry {
  font-size: 1rem;
  user-select: none;
}

.playing {
  color: var(--app-color);
}

.playing::before {
}
</style>

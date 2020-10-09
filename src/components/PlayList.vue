<template>
  <div id="playing-list" @click.self="hide">
    <transition name="list">
      <div v-if="showList" class="container">
        <div class="header">
          <span class="title">当前播放</span>
          <span class="amount">（{{ playList.length }}）</span>
          <app-icon
            icon="trash"
            class="clear"
            @click.native="clear"
          />
        </div>
        <div class="wrapper" ref="wrapper">
          <div class="content">
            <div
              :class="['entry', {'playing': song.id===playID}]"
              v-for="song in playList"
              :key="song.id"
              @tap="playSongOfList(song)"
            >
              <app-icon class="icon" icon="speaker" v-if="song.id===playID"/>
              <div class="song-info">
                {{ song.name + (song.artist ? ' - ' + song.artist : '') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex';
import BScroll from 'better-scroll';
export default {
  data: function() {
    return {
      showList: false
    };
  },
  porps: ['show'],
  computed: {
    ...mapState(['playList']),
    ...mapGetters(['playID'])

  },

  mounted() {
    this.$nextTick().
      then(() => {
        this.showList = true;
      })
      .then(() => {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          mouseWheel: true,
          scrollbar: true,
          tap: 'tap'
        });
        const barStyle = this.scroll.plugins.scrollbar.indicators[0].elStyle;
        const wrapperStyle = this.scroll.plugins.scrollbar.indicators[0].wrapperStyle;
        barStyle.border = 'none';
        wrapperStyle.width = '5px';
        console.log(barStyle);
      });
  },

  methods: {
    ...mapMutations(['clear', 'playSongOfList']),
    hide() {
      this.showList = false;
      this.$nextTick(() => {
        this.$emit('update:show', false);
      });
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
  background-color:transparent;
  box-shadow: 0 0 15px #00000080;
  border-radius: 1.2rem;
  box-sizing: border-box;
  color: #222;
  overflow: hidden;
  display: grid;
  grid-template-rows:
    [start header-start] 3.5rem [header-end wrapper-start] 1fr [wrapper-end end];
  align-items: center;
}

.header {
  grid-row: header;
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  background-color: #ffffffc0;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #00000010;
  z-index: 10;
  user-select: none;
  grid-template-columns:
    [start title-start] 5rem [title-end amount-start]
    2rem [amount-end] 1fr [clear-start] 3rem [clear-end];
}

.title {
  grid-column: title;
  font-size: 1.2rem;
  font-weight: bold;
}

.amount {
  grid-column: amount;
  color: #555;
}

.clear {
  grid-column: clear;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0.9rem;
}

.wrapper {
  z-index: 0;
  grid-row: wrapper;
  padding: 0 1rem;
  box-sizing: border-box;
  background-color: #ffffffc0;
  backdrop-filter: blur(20px);
  height: 100%;
  width: 100%;
  position: relative;
}

.content {
  height: 101%;
  width: 100%;
  overflow-y: hidden;
  display: grid;
  align-items: center;
  grid-template-rows: repeat(auto-fit, 2.5rem);
}

.entry {
  font-size: 1rem;
  height: 100%;
  border-bottom: 1px solid #00000010;
  display: grid;
  align-items: center;
  user-select: none;
  cursor: pointer;
  grid-template-columns:
    [start icon-start] min-content [icon-end info-start]
    minmax(max-content, 70%) [info-end] 1fr [end];
}

.entry > .icon {
  grid-column: icon;
  margin-right: 0.3rem;
}

.entry > .song-info {
  grid-column: info;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.playing {
  color: var(--app-color);
}

.list-enter, .list-leave-to {
  transform: translateY(25rem);
}

.list-enter-active {
  transition: transform 300ms ease;
}
.list-leave-active {
  transition: transform 300ms ease;
}
</style>

<template>
  <div id="profile" ref="wrapper">
    <div class="content">
      <div
        class="card"
      >
        <img class="avatar" :src="avtSrc">
        <span class="nickname">{{ nickname }}</span>
        <span class="level">{{ 'LV. ' + level }}</span>
        <span class="listen-songs">{{ '累计听歌 ' + listenSongs + ' 首' }}</span>
      </div>
    </div>
    <img class="background" ref="bg" :src="bgSrc">
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
export default {
  data: function() {
    return {
      nickname: '',
      level: '',
      listenSongs: '',
      avtSrc: '',
      bgSrc: ''
    };
  },

  created() {
    fetchJSON('/user/detail', {uid: this.$store.state.userID})
      .then((res) => {
        this.nickname = res.profile.nickname;
        this.level = res.level;
        this.listenSongs = res.listenSongs;
        this.avtSrc = res.profile.avatarUrl;
        this.bgSrc = res.profile.backgroundUrl;
      });
  },

  mounted() {
    this.$nextTick()
      .then(() => {
        BScroll.use(ScrollBar);
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollY: true,
          mouseWheel: true,
          scrollbar: true,
          probeType: 3,
          tap: 'tap'
        });
        console.log(this.scroll);
        const barStyle = this.scroll.plugins.scrollbar.indicators[0].elStyle;
        const wrapperStyle = this.scroll.plugins.scrollbar.indicators[0].wrapperStyle;
        barStyle.border = 'none';
        wrapperStyle.width = '5px';
        const self = this;
        function onScroll(pos) {
          if (pos.y > 0) {
            self.$refs.bg.style = `
              height: calc(15rem + ${pos.y}px);
            `;
          }
        }
        this.scroll.on('scroll', onScroll);
      });
  }
};
</script>

<style scoped>
#profile {
  grid-row: start / end;
  grid-column: start / end;
  height: 100%;
  width: 100%;
}

.content {
  min-height: 101%;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-rows:
    [start card-start] 15rem [card-end list-start]
    1fr [list-end];
  grid-template-columns: [start] 1fr [end];
  position: relative;
  z-index: 10;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 15rem;
  object-fit: cover;
}

.card {
  grid-row: card;
  grid-column: start / end;
  height: 100%;
  width: 100%;
  color: white;
  padding: 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows:
    [start] 1fr [avatar-start]
    6rem [avatar-end name-start] 2rem
    [name-end info-start] 2rem [info-end];
  align-items: center;
}

.avatar {
  grid-row: avatar;
  height: 90%;
  border-radius: 50%;
  border: 3.5px solid white;
  box-sizing: border-box;
  box-shadow: 0 0 5px #444;
}

.nickname {
  grid-row: name;
  font-size: 1.2rem;
  font-weight: bold;
}

.level {
  grid-row: info;
  background: #dddddd80;
  font-size: 0.7rem;
  width: 2.8rem;
  text-align: center;
  border-radius: 1rem;
  padding: 0.1rem;
}

.listen-songs {
  grid-row: info;
  background: #dddddd80;
  font-size: 0.7rem;
  width: 7rem;
  text-align: center;
  border-radius: 1rem;
  padding: 0.1rem;
}
</style>

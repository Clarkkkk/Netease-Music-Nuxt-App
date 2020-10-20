<template>
  <div id="profile" ref="wrapper">
    <div class="content">
      <div
        class="card"
        ref="card"
      >
        <img class="avatar" :src="avtSrc" ref="avatar">
        <span class="nickname" ref="nickname">{{ nickname }}</span>
        <span class="level" ref="level">{{ 'LV. ' + level }}</span>
      </div>

      <div class="features">
        <div class="feature-container">
          <app-icon icon="bar-chart"/>
          <span>听歌排行</span>
        </div>
        <div class="feature-container">
          <div class="icon-container">
            <app-icon icon="like-fill"/>
          </div>
          <span>我喜欢的音乐</span>
        </div>
      </div>

      <div class="lists-container">
        <nav class="nav">
          <span @click="navTo('created')">创建歌单</span>
          <span @click="navTo('saved')">收藏歌单</span>
        </nav>
        <div class="lists">
          <div class="title" ref="created">创建歌单</div>
          <div
            v-for="list in createdLists"
            :key="list.id"
            class="list"
          >
            <img :src="list.coverImgUrl">
            <span class="list-name">{{ list.name }}</span>
            <span class="list-info">{{ list.trackCount + '首'}}</span>
          </div>
        </div>
        <div class="lists">
          <div class="title" ref="saved">收藏歌单</div>
          <div
            v-for="list in savedLists"
            :key="list.id"
            class="list"
          >
            <img :src="list.coverImgUrl">
            <span class="list-name">{{ list.name }}</span>
            <span class="list-info">
              {{ list.trackCount + '首，来自 ' + list.creator.nickname }}
            </span>
          </div>
        </div>
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
      bgSrc: '',
      createdLists: [],
      savedLists: []
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

    fetchJSON('/user/playlist', {uid: this.$store.state.userID})
      .then((res) => {
        if (res.code === 200) {
          this.allList = res.playlist;
        }
        return fetchJSON('/user/subcount');
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          const createdCount = res.createdPlaylistCount;
          this.createdLists =
            this.allList.slice(1, createdCount);
          this.savedLists =
            this.allList.slice(createdCount, this.allList.length);
        }
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
        const barStyle =
          this.scroll.plugins.scrollbar.indicators[0].elStyle;
        const wrapperStyle =
          this.scroll.plugins.scrollbar.indicators[0].wrapperStyle;
        barStyle.border = 'none';
        wrapperStyle.width = '5px';
        const self = this;
        function onScroll(pos) {
          if (pos.y > 0) {
            self.$refs.bg.style = `height: calc(15rem + ${pos.y}px)`;
          } else {
            self.$refs.bg.style = `height: calc(15rem + ${pos.y}px)`;
            const progress = (-pos.y) / 200 < 1 ? (-pos.y) / 200 : 1;
            const bgOpacity = progress;
            self.$refs.card.style =
              `background-color: rgba(var(--app-color-rgb), ${bgOpacity});
              height: calc(15rem + ${pos.y}px);
              min-height: 3rem;
              transform: translateY(${-pos.y}px)`;
            self.$refs.avatar.style =
              `height: calc(6rem + ${pos.y}px);
              min-height: 2.2rem;
              transform: translateY(${-progress * 2.5}rem)`;
            self.$refs.nickname.style =
              `transform: translateX(${progress * 3}rem)
                translateY(${-progress * 6.5}rem)`;
            self.$refs.level.style = `opacity: ${1 - progress}`;
          }
        }
        this.scroll.on('scroll', onScroll);
      });
  },

  // refresh the scroll after all the content is loaded
  updated() {
    this.scroll.refresh();
  },

  methods: {
    navTo(position) {
      if (position === 'created') {
        this.scroll.scrollToElement(this.$refs.created, 300);
      } else if (position === 'saved') {
        this.scroll.scrollToElement(this.$refs.saved, 300);
      }
    }
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
    [start card-start] 15rem [card-end features-start]
    min-content [list-start] min-content [list-end];
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

/* brief info card */
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
  line-height: 1.2rem;
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
/* brief info card */

/* middle buttons */
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
  grid-template-columns: min-content;
  grid-auto-flow: column;
  place-items: center;
  justify-content: center;
  border-radius: 0.6rem;
  box-shadow: 0 0 10px #ddd;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.feature-container > svg {
  font-size: 1.8rem;
  justify-self: end;
  color: var(--app-color);
  margin-right: 0.3rem;
}

.feature-container > span {
  justify-self: start;
}

.icon-container {
  height: 1.4rem;
  width: 1.4rem;
  margin-right: 0.3rem;
  border-radius: 0.2rem;
  background-color: var(--app-color);
  display: grid;
  place-items: center;
  color: white;
  font-size: 0.8rem;
}
/* middle buttons */

/* song lists */
.list-container {
  grid-row: list;
  display: grid;
  grid-template-rows:
    [start nav-start] 3rem [nav-end created-start]
    min-content [created-end saved-start] min-content [saved-end];
}

.nav {
  grid-row: nav;
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
}

.nav > span {
  cursor: pointer;
}

.lists {
  grid-row: created;
  display: grid;
  grid-template-rows: [title-start] 3rem [title-end];
  grid-auto-rows: 4rem;
  align-items: center;
}

.title {
  grid-row: title;
  color: #888;
  font-size: 0.7rem;
}

.list {
  height: 4rem;
  display: grid;
  grid-template-rows:
    [start name-start] 1.5fr [name-end info-start]
    1fr [info-end end];
  grid-template-columns:
    [start pic-start] 4rem [pic-end text-start]
    1fr [text-end];
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.list > img {
  grid-row: start / end;
  grid-column: pic;
  height: 90%;
  width: 90%;
  border-radius: 0.2rem;
}

.list-name {
  grid-row: name;
  grid-column: text;
  font-size: 1rem;
}

.list-info {
  grid-row: info;
  grid-column: text;
  font-size: 0.7rem;
}
/* song lists */
</style>

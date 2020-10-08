<template>
  <div id="discover-banner">
    <transition-group
      name="banner"
      class="transition-group"
    >
      <div
        class="pic-container"
        :key="pic.bannerId"
        v-for="pic in loopPics"
      >
        <img
          alt="轮播图片"
          :src="pic.pic"
        >
        <span
          class="type-title"
          :type="pic.typeTitle"
        >{{ pic.typeTitle }}</span>
      </div>
    </transition-group>

    <div class="dot-container">
      <div
        v-for="dot in dots"
        :key="dot"
        :class="['dot', {'current-dot': dot===currentIndex}]"
        :current-dot="dot===currentIndex"
      ></div>
    </div>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data: function() {
    return {
      banners: [],
      loopPics: [],
      dots: [],
      currentIndex: 0,
      intervalID: 0,
      amount: 0
    };
  },

  created: function() {
    fetchJSON('/banner?type=2')
      .then((res) => {
        console.log(res);
        this.banners = res.banners;
        this.amount = this.banners.length;
        this.loopPics.push(this.banners.pop());
        this.loopPics.push(this.banners.shift());
        this.loopPics.push(this.banners.shift());
        this.currentIndex = 0;
        for (let i = 0; i < this.amount; i++) {
          this.dots[i] = i;
        }
      });
  },

  mounted: function() {
    this.loop();
  },

  methods: {
    loop() {
      setInterval(() => {
        this.loopPics.push(this.banners.shift());
        this.banners.push(this.loopPics.shift());
        if (this.currentIndex < this.amount - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
      }, 8000);
    },
  }
};
</script>

<style scoped>
#discover-banner {
  width: 100%;
  height: 100%;
  grid-row: app-banner-start / app-banner-end;
  display: grid;
  grid-template-columns: [start] 1fr [end];
  grid-template-rows: [start] 1fr [dot-start] 2.5rem [dot-end end];
  justify-items: center;
  justify-content: space-around;
}

.transition-group {
  grid-row: start / end;
  grid-column: start / end;
  width: 300%;
  max-width: 160rem;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
}

.pic-container {
  height: 90%;
  width: 90%;
  border-radius: 1rem;
  display: grid;
  grid-template-rows: [start] 1fr [title-start] max-content [title-end end];
  grid-template-columns: [start] 1fr [title-start] max-content [title-end end];
}

.pic-container img {
  grid-row: start / end;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
}

.type-title {
  grid-row: title-start / title-end;
  grid-column: title-start / title-end;
  background-color: #fc5244;
  color: white;
  font-size: 1rem;
  padding: 0.3rem 0.8rem;
  border-radius: 1rem 0 1rem 0;
  user-select: none;
}

.type-title[type="数字专辑"] {
  background-color: #43a5f0;
}

.banner-move {
  transition: transform 300ms;
}

.banner-leave-active {
  opacity: 0;
  position: absolute;
}

.dot-container {
  grid-row: dot-start / dot-end;
  grid-column: start / end;

  width: 30%;
  min-width: 10rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, 1rem);
  justify-content: space-around;
}

.dot {
  height: 0.6rem;
  width: 0.6rem;
  background-color: #ddd;
  border-radius: 50%;
  z-index: 10;
  transition: background-color, 200ms;
}

.current-dot {
  background-color: var(--app-color);
}
</style>

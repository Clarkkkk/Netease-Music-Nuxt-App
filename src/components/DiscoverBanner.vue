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
        @pointerdown="pointerDown"
        @pointerup="pointerUp"
        @pointermove="pointerMove"
        ref="pics"
      >
        <img
          alt="轮播图片"
          :src="pic.pic"
          @dragstart.prevent
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
      amount: 0,
      isPointerDown: false
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
      })
      .then(() => {
        this.rect0 = this.$refs.pics[0].getBoundingClientRect();
        this.rect1 = this.$refs.pics[1].getBoundingClientRect();
        this.rect2 = this.$refs.pics[2].getBoundingClientRect();
        this.bannerRect = this.$el.getBoundingClientRect();
      });
  },

  mounted: function() {
    this.loop();
  },

  methods: {
    loop() {
      this.intervalID = setInterval(() => {
        this.slideLeft();
      }, 30000000);
    },

    slideLeft() {
      this.loopPics.push(this.banners.shift());
      this.banners.push(this.loopPics.shift());
      this.currentIndex = ++this.currentIndex % this.amount;
    },

    slideRight() {
      this.loopPics.unshift(this.banners.pop());
      this.banners.unshift(this.loopPics.pop());
      this.currentIndex = (this.currentIndex - 1 + this.amount) % this.amount;
    },

    pointerDown(event) {
      this.isPointerDown = true;
      event.target.setPointerCapture(event.pointerId);
      console.log(event.target);
      this.relativeX = event.clientX - this.rect1.left - event.offsetX;
      this.mouseDownX = event.clientX;
      for (const pic of this.$refs.pics) {
        pic.style = `transform:translateX(${this.relativeX}px)`;
      }
      clearInterval(this.intervalID);
    },

    pointerUp(event) {
      if (event.target.hasPointerCapture(event.pointerId)) {
        this.isPointerDown = false;
        const mouseMoveX = event.clientX - this.mouseDownX;
        if (mouseMoveX > 50) {
          this.slideRight();
        } else if (mouseMoveX < -50) {
          this.slideLeft();
        } else {
          for (const pic of this.$refs.pics) {
            pic.classList.add('banner-move');
            pic.addEventListener('transitionend', () => {
              pic.classList.remove('banner-move');
            });
          }
          for (const pic of this.$refs.pics) {
            pic.style = '';
          }
        }

        this.loop();
        console.log(event.target);
      }
    },

    pointerMove(event) {
      if (this.isPointerDown) {
        const mouseMoveX = event.clientX - this.mouseDownX;
        for (const pic of this.$refs.pics) {
          pic.style = `transform:translateX(${this.relativeX + mouseMoveX}px)`;
        }
      }
    },
  }
};
</script>

<style scoped>
#discover-banner {
  width: 100%;
  max-width: 45rem;
  overflow: hidden;
  height: 40vw;
  max-height: 18rem;
  grid-row: banner;
  place-self: center;
  display: grid;
  grid-template-columns: [start] 1fr [end];
  grid-template-rows: [start] 1fr [dot-start] 2rem [dot-end end];
  justify-items: center;
  justify-content: space-around;
  user-select: none;
}

.transition-group {
  grid-row: start / end;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
}

.pic-container {
  height: 90%;
  width: 90%;
  grid-row: auto;
  border-radius: 1rem;
  display: grid;
  overflow: hidden;
  grid-template-rows: [start] 1fr [title-start] max-content [title-end end];
  grid-template-columns: [start] 1fr [title-start] max-content [title-end end];
}

.pic-container img {
  grid-row: start / end;
  grid-column: start / end;
  width: 100%;
  height: 100%;
  object-fit: cover;
  touch-action: none;
}

.type-title {
  grid-row: title-start / title-end;
  grid-column: title-start / title-end;
  background-color: #fc5244;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 1rem 0 1rem 0;
  user-select: none;
}

.type-title[type="数字专辑"] {
  background-color: #43a5f0;
}

.banner-move {
  transition: transform 1000ms;
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
  height: 0.5rem;
  width: 0.5rem;
  background-color: #ddd;
  border-radius: 50%;
  z-index: 10;
  transition: background-color, 200ms;
}

.current-dot {
  background-color: var(--app-color);
}
</style>

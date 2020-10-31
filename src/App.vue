<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <app-dock/>
    </transition>
  <app-audio-player/>
  </div>
</template>

<script>
import AppAudioPlayer from '@/components/AppAudioPlayer.vue';
import AppDock from '@/components/AppDock.vue';
export default {
  computed: {
    transitionName() {
      return this.$store.state.routeHistory.transitionName;
    }
  },

  components: {
    AppAudioPlayer,
    AppDock
  },

  created() {
    if (navigator.userAgent.includes('Safari')) {
      this.$store.commit('routeHistory/agent', true);
    }
    document.documentElement.setAttribute('lang', 'zh-Hans');
    document.documentElement.addEventListener('error', (event) => {
      console.log(event);
    });
    document.documentElement.addEventListener('touchend', (event) => {
      this.$store.commit('routeHistory/touchEnd');
    });
    this.createPreconnect(
      'https://p1.music.126.net',
      'https://p2.music.126.net',
      'https://m8.music.126.net',
      'https://clarkkkk.xyz'
    );
  },

  methods: {
    createPreconnect(...links) {
      for (const link of links) {
        const elm = document.createElement('link');
        elm.setAttribute('rel', 'preconnect');
        elm.setAttribute('href', link);
        document.head.appendChild(elm);
      }
    }
  }
};
</script>

<style>
body {
  height: 100vh;
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
  --app-color: #e91a3d;
  --app-color-rgb: 233, 26 ,61;
}

#app {
  height: 100%;
  width: 100vw;
  background-color: black;
  position: relative;
  z-index: 0;
}

.fade-in {
  animation: fadeIn 300ms ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* slide-left */
.slide-left-enter {
  transform: translateX(100vw) !important;
}

.slide-left-leave-to {
  transform: translateX(-30vw) !important;
}

.slide-left-leave-active {
  transition: transform 360ms ease;
  z-index: 0;
}

.slide-left-enter-active {
  transition: transform 360ms ease;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 12000 !important;
}
/* slide-left */

/* slide-right */
.slide-right-leave-to {
  transform: translateX(100vw) !important;
}

.slide-right-enter {
  transform: translateX(-30vw) !important;
}

.slide-right-enter-active {
  transition: transform 360ms ease;
  z-index: 0;
}

.slide-right-leave-active {
  transition: transform 360ms ease;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 12000 !important;
}
/* slide-right */

/* expand */
.expand-enter {
  transform: translateX(40vw) translateY(-65vw) scale(0.1) !important;
  opacity: 0.5;
}

.expand-leave-to {
  transform: scale(0.8);
}

.expand-leave-active {
  transition: transform 360ms ease;
  z-index: 0;
}

.expand-enter-active {
  transition: transform 360ms ease, opacity 200ms ease;
  position: fixed !important;
  left: 0;
  top: 0;
  z-index: 12000 !important;
}
/* expand */

.no-transition-enter-active, no-transition-leave-active {
  transition: none !important;
  opacity: 1;
}
</style>

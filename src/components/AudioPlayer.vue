<template>
  <div id="audio-player">
    <audio
      :src="src"
      :loop="loop"
      ref="audio"
      @canplaythrough="play"
    ></audio>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data: function() {
    return {
      src: ''
    };
  },

  computed: {
    playingID: function() {
      return this.$store.state.playingID;
    },

    loop: function() {
      return this.$store.state.loop;
    }
  },

  created: function() {
    if (this.playingID) {
      this.getUrl(this.playingID);
    }
  },

  mounted: function() {
    this.$store.commit('setPlayer', this.$refs.audio);
    this.$refs.audio.addEventListener('canplay', (event) => {
      this.$store.commit('durationChange', this.$refs.audio.duration);
      this.$store.commit('timeUpdate', this.$refs.audio.currentTime);
    });
    this.$refs.audio.addEventListener('durationchange', (event) => {
      this.$store.commit('durationChange', this.$refs.audio.duration);
    });
    this.$refs.audio.addEventListener('timeupdate', (event) => {
      this.$store.commit('timeUpdate', this.$refs.audio.currentTime);
    });
    this.$refs.audio.addEventListener('play', (event) => {
      this.$store.commit('played');
    });
    this.$refs.audio.addEventListener('pause', () => {
      this.$store.commit('paused');
    });
  },

  watch: {
    playingID: function(newID) {
      this.getUrl(newID);
    }
  },

  methods: {
    play() {
      console.log('play');
      this.$refs.audio.play()
        .catch((err) => {
          console.log(err);
        });
    },
    getUrl(id) {
      fetchJSON('/song/url?id=' + id)
        .then((obj) => {
          console.log(obj);
          if (obj.code === 200 && obj.data[0]) {
            this.src = obj.data[0].url;
          }
        });
    }
  }
};
</script>

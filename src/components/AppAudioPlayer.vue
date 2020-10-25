<template>
  <audio
    id="app-audio-player"
    :src="src"
    :loop="mode==='song-loop'"
    ref="audio"
    @canplay="durationChange($event.target.duration)"
    @durationchange="durationChange($event.target.duration)"
    @timeupdate="timeUpdate($event.target.currentTime)"
    @play="played"
    @pause="paused"
    @waiting="waiting(true)"
    @playing="waiting(false)"
    @ended="ended"
  ></audio>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import {mapGetters, createNamespacedHelpers} from 'vuex';
const {mapState, mapMutations} = createNamespacedHelpers('playStatus');
export default {
  data: function() {
    return {
      src: ''
    };
  },

  computed: {
    ...mapState(['mode']),
    ...mapGetters(['currentSong']),
    playID() {
      return this.currentSong.id ? this.currentSong.id : 0;
    },
  },

  created: function() {
    if (this.playID) {
      this.getUrl(this.playID);
    }
  },

  mounted: function() {
    this.setPlayer(this.$refs.audio);
  },

  watch: {
    playID: function(newID) {
      console.log(newID);
      if (newID) {
        this.getUrl(newID)
          .then(() => {
            this.$refs.audio.play();
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.$refs.audio.pause();
        this.src = '';
      }
    }
  },

  methods: {
    ...mapMutations([
      'setPlayer', 'durationChange', 'timeUpdate',
      'played', 'paused', 'waiting', 'ended'
    ]),
    getUrl(id) {
      if (id) {
        return fetchJSON('/song/url', {id: id})
          .then((obj) => {
            if (obj.code === 200 && obj.data[0]) {
              this.src = obj.data[0].url;
            } else {
              throw (new Error('url not exited: ' + JSON.stringify(obj)));
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  }
};
</script>

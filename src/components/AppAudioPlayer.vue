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
import {mapState, mapGetters, mapMutations} from 'vuex';
export default {
  data: function() {
    return {
      src: ''
    };
  },

  computed: {
    ...mapState(['mode', 'play']),
    ...mapGetters(['playID'])
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
    playID: function(newID, old) {
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
    ...mapMutations([
      'setPlayer', 'durationChange', 'timeUpdate',
      'played', 'paused', 'waiting', 'ended'
    ])
  }
};
</script>

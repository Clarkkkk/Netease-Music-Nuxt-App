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
    console.log(this.playID);
    if (this.playID) {
      this.getUrl(this.playID);
    }
  },

  mounted: function() {
    this.setPlayer(this.$refs.audio);
  },

  watch: {
    playID: function(newID, old) {
      console.log('playID changed.');
      console.log('new:' + newID);
      console.log('old:' + old);
      if (newID) {
        this.getUrl(newID)
          .then(() => {
            this.$refs.audio.play();
            console.log(this.src);
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
            console.log(obj);
            if (obj.code === 200 && obj.data[0]) {
              this.src = obj.data[0].url;
              console.log(this.src);
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

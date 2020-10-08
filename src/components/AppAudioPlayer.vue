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
    playID: function(newID) {
      console.log('playID changed.');
      this.getUrl(newID)
        .then(() => {
          this.$refs.audio.play();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    play: function(toPlay) {
      if (toPlay) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    }
  },

  methods: {
    getUrl(id) {
      if (id) {
        return fetchJSON('/song/url?id=' + id)
          .then((obj) => {
            console.log(obj);
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
      'played', 'paused', 'waiting'
    ])
  }
};
</script>

<template>
  <audio
    id="audio-player"
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
    ...mapState(['mode']),
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
    playID: function(newID) {
      this.getUrl(newID);
    }
  },

  methods: {
    getUrl(id) {
      fetchJSON('/song/url?id=' + id)
        .then((obj) => {
          console.log(obj);
          if (obj.code === 200 && obj.data[0]) {
            this.src = obj.data[0].url;
          }
        });
    },
    ...mapMutations(
      ['setPlayer', 'durationChange', 'timeUpdate', 'played', 'paused', 'waiting']
    )
  }
};
</script>

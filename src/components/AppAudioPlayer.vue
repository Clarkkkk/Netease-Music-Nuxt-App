<template>
  <audio
    id="app-audio-player"
    ref="audio"
    :src="src"
    :loop="mode==='song-loop'"
    @canplay="durationChange($event.target.duration)"
    @durationchange="durationChange($event.target.duration)"
    @timeupdate="timeUpdate($event.target.currentTime)"
    @play="played"
    @pause="paused"
    @waiting="waiting(true)"
    @playing="waiting(false)"
    @ended="ended"
  />
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import {mapGetters, createNamespacedHelpers} from 'vuex';
const {mapState, mapMutations, mapActions} = createNamespacedHelpers('playStatus');
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
      if (this.currentSong) {
        return this.currentSong.id ? this.currentSong.id : 0;
      } else return 0;
    },
  },

  created: function() {
    if (this.playID) {
      this.getUrl(this.playID);
    }
  },

  mounted: function() {
    this.setPlayer(this.$refs.audio);
    console.log(this.src);
  },

  watch: {
    playID: function(newID) {
      console.log(newID);
      if (newID) {
        this.getUrl(newID)
          .then(() => this.$refs.audio.play())
          .catch((e) => {
            console.log(e);
            return this.$refs.audio.play();
          }).catch((e) => {
            this.ended();
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
      'played', 'paused', 'waiting'
    ]),
    ...mapActions(['ended']),
    getUrl(id) {
      if (id) {
        return fetchJSON('/check/music', {id: id})
          .then((res) => {
            console.log(res);
            if (res.success) {
              return fetchJSON('/song/url', {id: id});
            } else {
              alert('这首歌暂无版权');
              throw new Error('这首歌暂无版权');
            }
          }).then((obj) => {
            console.log(obj);
            if (obj.code === 200 && obj.data[0]) {
              this.src = obj.data[0].url.replace('http:', 'https:');
            } else {
              alert('这首歌暂无版权');
              throw (new Error('url not exited: ' + JSON.stringify(obj)));
            }
          })
          .catch((e) => {
            console.log(e.message);
            this.ended();
          });
      }
    }
  }
};
</script>

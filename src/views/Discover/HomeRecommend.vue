<template>
  <div id="home-recommend">
    <app-song-list
      :list="songList"
      :cover="background"
    >
      <template v-slot:title>
        每日推荐
      </template>
      <template v-slot:name>
        {{ dateString }}
      </template>
    </app-song-list>
  </div>
</template>

<script>
import AppSongList from '@/components/AppSongList.vue';
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  data: function() {
    return {
      songList: [],
      background: 'linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)'
    };
  },

  computed: {
    dateString: function() {
      const today = new Date();
      const hours = today.getHours();
      let greetings = '你好';
      if (hours >= 6 && hours <= 12) {
        greetings = '早上好';
      } else if (hours >= 13 && hours <= 18) {
        greetings = '下午好';
      } else if (hours >= 19 && hours <= 24) {
        greetings = '晚上好';
      } else if (hours >= 0 && hours <= 5) {
        greetings = '早点睡哦';
      }
      return `${today.getMonth()}月${today.getDate()}日，${greetings}`;
    }
  },

  components: {
    AppSongList
  },

  created() {
    fetchJSON('/recommend/songs')
      .then((res) => {
        if (res.code === 200) {
          // extract useful information and map it to songList
          this.songList = res.data.dailySongs.map((song) => {
            return {
              id: song.id,
              name: song.name,
              artists: song.ar,
              album: song.al.name
            };
          });
        }
      });
  }
};
</script>

<style scoped>

</style>

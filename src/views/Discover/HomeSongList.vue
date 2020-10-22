<template>
  <div id="discover-song-list">
    <app-song-list
      :list="songList"
      :cover="coverSrc"
      :name="name"
      :creator="creator"
      :description="description"
      :tags="tags"
    >

    </app-song-list>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
import AppSongList from '@/components/AppSongList.vue';
export default {
  data: function() {
    return {
      name: '',
      creator: '',
      description: '',
      coverSrc: '',
      tags: [],
      songList: []
    };
  },

  props: ['listId'],

  components: {
    AppSongList
  },

  created() {
    fetchJSON('/playlist/detail', {id: this.listId})
      .then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.name = res.playlist.name;
          this.creator = res.playlist.creator.nickname;
          this.description = res.playlist.description;
          this.coverSrc = res.playlist.coverImgUrl;
          this.tags = res.playlist.tags;
          const ids = res.playlist.trackIds.map((item) => item.id).join(',');
          return fetchJSON('/song/detail', {ids: ids});
        }
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          // extract useful information and map it to songList
          this.songList = res.songs.map((song) => {
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

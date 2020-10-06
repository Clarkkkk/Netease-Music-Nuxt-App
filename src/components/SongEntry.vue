<template>
  <div class="song-entry" @click="play">
    <span class="name">
      {{ songName }}
    </span>
    <span class="info">
      {{ songInfoString }}
    </span>
  </div>
</template>

<script>
import fetchJSON from '@/functions/fetchJSON.js';
export default {
  props: ['songName', 'songArtists', 'songAlbum', 'songId'],
  computed: {
    songArtistString: function() {
      const artists = [];
      for (const obj of this.songArtists) {
        artists.push(obj.name);
      }
      return artists.join('/');
    },

    songInfoString: function() {
      if (this.songAlbum) {
        return this.songArtistString + ' - ' + this.songAlbum;
      } else {
        return this.songArtistString;
      }
    }
  },
  methods: {
    play() {
      fetchJSON('/check/music?id=' + this.songId)
        .then((result) => {
          console.log(result);
          if (result.success) {
            console.log(this.songId);
            this.$store.commit('addToPlay', {
              id: this.songId,
              name: this.songName,
              artist: this.songArtistString
            });
            this.$router.push('/playing');
          } else {
            alert('这首歌暂无版权');
          }
        });
    }
  }
};
</script>

<style scoped>
.song-entry {
  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  display: grid;
  grid-template-rows: [start name-start] 1.2fr [name-end info-start] 1fr [info-end end];
  grid-template-columns: [start] 1fr [end];
  justify-items: start;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.name {
  grid-row: name-start / name-end;
  font-size: 1rem;
  color: black;
}

.info {
  grid-row: info-start / info-end;
  font-size: 0.8rem;
  color: #666;
}
</style>

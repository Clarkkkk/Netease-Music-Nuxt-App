<template>
  <div class="song-entry">
    <span class="song-entry-name">
      {{ songName }}
    </span>
    <span class="song-entry-info">
      {{ songInfoString }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['songName', 'songArtists', 'songAlbum'],
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
  }
};
</script>

<style>
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

.song-entry-name {
  grid-row: name-start / name-end;
  font-size: 1rem;
  color: black;
}

.song-entry-info {
  grid-row: info-start / info-end;
  font-size: 0.8rem;
  color: #666;
}
</style>

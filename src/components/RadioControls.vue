<template>
  <div id="play-controls">
    <app-icon
      icon="like-slash"
      class="dislike"
      @click.native="dislike"
    />
    <app-like-icon class="like"/>
    <div
      class="play"
      @click="playOrPause"
    >
      <app-icon :icon="playing ? 'pause' : 'play'" />
    </div>
    <app-icon
      icon="next-song"
      class="next"
      @click.native="nextSong"
    />
    <app-icon
      icon="comment"
      class="comment"
    />
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import AppLikeIcon from '@/components/AppLikeIcon.vue';
export default {
  computed: mapState('playStatus', ['playing']),
  components: {
    AppLikeIcon
  },
  methods: {
    ...mapMutations('radioPlay', ['nextSong']),
    ...mapMutations('playStatus', ['playOrPause'])
  }
};
</script>

<style scoped>
#play-controls {
  grid-row: controls;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:
    [start] 1fr [dislike-start] minmax(4rem, 1fr) [dislike-end like-start] minmax(4rem, 1fr)
    [like-end play-start] minmax(4rem, 1fr) [play-end next-start]
    minmax(4rem, 1fr) [next-end comment-start] minmax(4rem, 1fr) [comment-end] 1fr [end];
  grid-template-rows: [start] 100% [end];
  place-items: center;
}

/* controls */
.dislike {
  grid-column: dislike;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.like {
  grid-column: like;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}

.play {
  grid-column: play;
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  cursor: pointer;
}

.next {
  grid-column: next;
  width: 2.3rem;
  height: 2.3rem;
  font-size: 2.3rem;
  cursor: pointer;
}

.comment {
  grid-column: comment;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
}
/* controls */

</style>

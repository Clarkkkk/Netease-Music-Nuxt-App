<template>
  <div id="profile-song-lists">
    <div class="title">{{ titleString }}</div>
    <app-loading-icon v-if="loading"/>
    <div
      v-for="list in lists"
      :key="list.id"
      class="list"
      @tap="tap(list.id)"
    >
      <app-image
        :src="list.coverImgUrl"
        width="50"
      />
      <span class="list-name">{{ list.name }}</span>
      <span class="list-info">{{ list.trackCount + '首'}}</span>
    </div>
  </div>
</template>

<script>
import AppLoadingIcon from '@/components/AppLoadingIcon.vue';
import AppImage from '@/components/AppImage.vue';
export default {
  props: ['lists', 'type', 'loading'],
  components: {
    AppLoadingIcon,
    AppImage
  },

  computed: {
    titleString: function() {
      if (this.type === 'createdLists') {
        return '创建歌单';
      } else {
        return '收藏歌单';
      }
    }
  },

  methods: {
    tap(id) {
      this.$router.push({
        name: 'account-songlist',
        params: {listId: id}
      });
    }
  }
};
</script>

<style scoped>
#profile-song-lists {
  grid-row: lists;
  display: grid;
  grid-template-rows: [title-start] 1rem [title-end];
  grid-auto-rows: 4rem;
  align-items: center;
}

.title {
  grid-row: title;
  color: #888;
  font-size: 0.7rem;
}

.list {
  height: 4rem;
  display: grid;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  grid-template-rows:
    [start name-start] 1.2fr [name-end info-start]
    1fr [info-end end];
  grid-template-columns:
    [start pic-start] 3rem [pic-end text-start]
    1fr [text-end];
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.list > img {
  grid-row: start / end;
  grid-column: pic;
  height: 90%;
  width: 90%;
  border-radius: 0.2rem;
}

.list-name {
  grid-row: name;
  grid-column: text;
  font-size: 0.9rem;
  line-height: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-info {
  grid-row: info;
  grid-column: text;
  font-size: 0.7rem;
  line-height: 0.7rem;
}
</style>

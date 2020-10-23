<template>
  <div id="profile-song-lists">
    <div class="title">{{ titleString }}</div>
    <div
      v-for="list in lists"
      :key="list.id"
      class="list"
      @tap="tap(list.id)"
    >
      <img :src="list.coverImgUrl">
      <span class="list-name">{{ list.name }}</span>
      <span class="list-info">{{ list.trackCount + '首'}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['lists', 'type'],
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
  },

  beforeRouteLeave(to, from, next) {
    console.log(to);
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },

  beforeRouteUpdate(to, from, next) {
    console.log(to);
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
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

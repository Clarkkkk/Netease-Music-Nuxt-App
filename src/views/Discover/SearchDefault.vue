<template>
  <div id="discover-search-default">
    <app-search-bar
      class="header"
      v-model="searchText"
      focus="true"
      @keydown.enter="search"
    >
      <template v-slot:right>
        <input
          type="button"
          class="cancel"
          value="取消"
          @click="searchCancel"
        >
      </template>
    </app-search-bar>

    <div class="hot-title" v-show="!typing">
      热搜榜
    </div>
    <div class="hot" v-show="!typing">
      <div
        class="hot-item"
        v-show="!typing"
        v-for="item in searchHotData"
        :key="item.score"
        @click="search(item.searchWord)"
      >
        {{ item.searchWord }}
      </div>
    </div>

    <div
      class="text"
      v-show="typing"
    >
      搜索「{{ searchText }}」
    </div>
    <div class="advice" v-show="typing">
      <div
        class="advice-item"
        v-show="typing"
        v-for="item in searchAdviceData"
        :key="item.keyword"
        @click="search(item.keyword)"
      >
        <app-icon icon="search" class="advice-item-icon"/>
        {{ item.keyword }}
      </div>
    </div>
  </div>
</template>

<script>
import debounce from '@/functions/debounce.js';
import fetchJSON from '@/functions/fetchJSON.js';
import AppSearchBar from '@/components/AppSearchBar.vue';
export default {
  name: 'discover-search-default',
  data: function() {
    return {
      searchText: '',
      searchAdviceData: [],
      searchHotData: [],
      typing: false
    };
  },

  components: {
    AppSearchBar
  },

  created: function() {
    fetchJSON('/search/hot/detail')
      .then((data) => {
        this.searchHotData = data.data;
      });
  },

  watch: {
    searchText: function(newVal) {
      if (newVal) {
        this.typing = true;
      } else {
        this.typing = false;
      }
      if (newVal.trim()) {
        this.searchAdvice(newVal);
      }
    }
  },

  methods: {
    searchCancel() {
      this.$router.push('/');
      console.log(this.$route);
    },

    searchAdvice(text) {
      debounce(() => {
        fetchJSON('/search/suggest', {
          keywords: text,
          type: 'mobile'
        }).then((data) => {
          this.searchAdviceData = data.result.allMatch;
        });
      });
    },

    search(text) {
      console.log(text);
      if (typeof text === 'string') {
        this.searchText = text;
      }
      this.$router.push('/search/result/' + this.searchText);
      console.log('search:' + this.searchText);
    }
  }
};
</script>

<style scoped>
#discover-search-default {
  display: grid;
  grid-template-rows:
    [start app-header-start] 3rem [app-header-end title-start]
    3rem [title-end list-start] 1fr [list-end end];
  align-items: center;
  justify-items: center;
}

/* header */
.header {
  grid-row: app-header-start / app-header-end;
  display: grid;
  grid-template-columns:
    [start search-start] 1fr [search-end right-start] 4rem [right-end end];
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}

.cancel {
  grid-column: right-start / right-end;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}
/* header */

/* hot list */
.hot-title {
  grid-row: title-start / title-end;
  padding: 0 1rem;
  justify-self: start;
  align-self: end;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.1rem;
  user-select: none;
}

.hot {
  grid-row: list-start / list-end;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
}

.hot-item {
  margin: 0.3rem;
  padding: 0.3rem 0.7rem;
  font-size: 1rem;
  line-height: 1.2rem;
  height: 1.2rem;
  border: 1px var(--app-color) solid;
  border-radius: 1.2rem;
  cursor: pointer;
}
/* hot list */

/* search advice */
.text {
  grid-row: title-start / title-end;
  height: 100%;
  width: 100%;
  justify-self: start;
  align-self: center;
  padding: 0 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.1rem;
  color: var(--app-color);
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: grid;
  align-items: center;
}

.advice {
  grid-row: list-start / list-end;
  width: 100%;
  justify-self: start;
  display: grid;
  grid-template-rows: 3rem;
  grid-auto-rows: 3rem;
  align-items: center;
  justify-items: start;
}

.advice-item {
  height: 100%;
  width: 100%;
  user-select: none;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  display: grid;
  grid-template-columns: 3rem;
  grid-auto-flow: column;
  justify-items: start;
  align-items: center;
}

.advice-item-icon {
  justify-self: center;
}
/* search advice */
</style>

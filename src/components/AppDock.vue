<template>
  <div id="app-dock" v-if="show">
    <div
      :class="['category', {'active': active==='discover'}]"
      @click="click('discover')"
    >
      <app-icon v-if="active==='discover'" icon="compass-fill"/>
      <app-icon v-else icon="compass"/>
      <span>发现</span>
    </div>
    <div
      :class="['category', {'active': active==='account'}]"
      @click="click('account')"
    >
      <app-icon v-if="active==='account'" icon="person-fill"/>
      <app-icon v-else icon="person"/>
      <span>我的</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: '',
      show: true
    };
  },

  created() {
    if (this.$route.path.includes('account')) {
      this.active = 'account';
    } else {
      this.active = 'discover';
    }
  },

  watch: {
    '$route': function(route) {
      if (route.path.includes('account')) {
        this.active = 'account';
      } else {
        this.active = 'discover';
      }
      if (route.path.includes('play') || route.path.includes('radio')) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },

  methods: {
    click(category) {
      if (category === this.active) {
        return;
      }
      switch (category) {
        case 'discover': {
          this.$router.push({
            name: 'discover',
            params: {
              dock: true
            }
          });
          break;
        }
        case 'account': {
          if (this.$store.state.auth.login) {
            this.$router.push({
              name: 'account',
              params: {
                dock: true
              }
            });
          } else {
            this.$router.push({
              name: 'login',
              params: {
                dock: true
              }
            });
          }
          break;
        }
      }
    }
  }
};
</script>

<style scoped>
#app-dock {
  position: fixed;
  z-index: 11000;
  bottom: 0;
  padding-bottom: env(safe-area-inset-bottom);
  height: 2.5rem;
  width: 100%;
  background-color: #eee;
  border-top: 1px solid #ddd;
  display: grid;
  grid-auto-flow: column;
  justify-content: space-around;
}

.category {
  height: 100%;
  width: 4rem;
  display: grid;
  grid-template-rows: 1.5fr 1fr;
  place-items: center;
  cursor: pointer;
}

.category.active {
  color: var(--app-color);
}

.category > span{
  font-size: 0.7rem;
  user-select: none;
}

.category > svg {
  font-size: 1.1rem;
}
</style>

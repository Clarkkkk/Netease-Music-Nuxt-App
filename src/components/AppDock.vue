<template>
  <div id="app-dock">
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
      <span>账号</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: ''
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
    }
  },

  methods: {
    click(category) {
      if (category === this.active) {
        return;
      }
      switch (category) {
        case 'discover': {
          this.$router.push('/');
          break;
        }
        case 'account': {
          if (this.$store.state.login) {
            this.$router.push('/account');
          } else {
            this.$router.push('/account/login');
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
  z-index: 10000;
  bottom: 0;
  height: 2.5rem;
  width: 100%;
  background-color: #eee;
  border-top: 1px solid #ddd;
  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);
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

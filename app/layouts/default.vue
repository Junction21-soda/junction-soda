<template>
  <v-app class="app">
    <v-main class="app__main">
      <div class="overlay overlay--left" />
      <div class="overlay overlay--right" />
      <v-container fluid class="app__container pa-0">
        <nuxt />
        <div class="app__bottom">
          <div class="app__bottom__navigation">
            <div
              v-for="(nav, index) in navs"
              :key="index"
              class="app__bottom__navigation__item"
              @click="onClickNav(nav.to)"
            >
              <img v-if="currentRouteName === nav.icon" :src="require(`@/assets/icons/${nav.icon}-selected.svg`)" alt="icon">
              <img v-else :src="require(`@/assets/icons/${nav.icon}.svg`)" alt="icon">
              <p class="app__bottom__navigation__item__label">
                {{ nav.label }}
              </p>
            </div>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      navs: [
        {
          label: 'Home',
          to: '/home',
          icon: 'home'
        },
        {
          label: 'Chat',
          to: '/chat',
          icon: 'chat'
        },
        {
          label: 'My',
          to: '/my',
          icon: 'my'
        },
      ]
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    onClickNav(dest) {
      this.$router.push(dest)
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans', sans-serif;
}
/* .app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white !important;
  overflow: hidden;
} */
.app__main {
  background-color: grey;
}
.app__container {
  position: relative;
  background-color: white;
  max-width: 400px;
  height: 100%;
  overflow-y: scroll;
}

.v-dialog__content {
  z-index: 0 !important;
}
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 100% !important;
}

.overlay {
  z-index: 500;
  position: fixed;
  width: calc((100vw - 400px) / 2);
  height: 100vh;
  background-color: #25AE60;
  &--left {
    left: 0;
  } 
  &--right {
    right: 0;
  }
}

.app__bottom {
  position: fixed;
  display: flex;
  margin-bottom: 18px;
  bottom: 0;
  max-width: 400px;
  width: 100%;
  /* left: 50%; */
  /* transform: translateX(-50%); */
  padding: 0 12px;
  background-color: transparent;
  border: none;
  box-shadow: none !important;
  &__navigation {
    height: auto;
    width: 100%;
    padding: 10px 16px;
    border-radius: 36px;
    box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16);
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__item {
      width: 52px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__label {
        margin-top: 6px;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0.3px;
      }
    }
  }
}

*::-webkit-scrollbar {
  display: none;
}

.v-application p {
  margin-bottom: 0;
}

.slide-leave-active,
.slide-enter-active {
  transition: 0.5s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
}
</style>

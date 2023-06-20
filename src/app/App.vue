<template>
  <div id="app">
    <v-app>
      <Header />
      <div class="page-layout">
        <div class="columns">
          <div class="column is-offset-1 is-10">
            <v-main>
              <v-container fluid>
                <router-view />
              </v-container>
            </v-main>
          </div>
        </div>
      </div>
      <Footer />
    </v-app>
  </div>
</template>

<script>
import { Header, Footer } from './shared/components';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  beforeCreate() {
    this.$router.push(window.location.pathname+window.location.search);
  },
};
</script>

<style>
body {
  font-family: "Fira Sans Condensed", "Roboto", Arial, sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fbfbfb;
  overflow: hidden;
}

.page-layout {
  margin: 10px 50px 50px;
  height: 100%;
}

@media (max-width: 960px) {
  .page-layout {
    margin: 0px 10px 10px;
  }
}
</style>

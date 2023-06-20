<template>
  <div>
    <v-content>
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <router-link to="/">
            <div class="header__Logo">
              <div class="header__Logo-element">
                <img src="../../../../assets/logo.png" alt="" />
              </div>
            </div>
          </router-link>
        </div>
      </nav>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
  data() {
    return {
    };
  },
};
</script>

<style>
.navbar {
  background-color: #9bd660;
  border-bottom: solid 1px #e4e4e4;
}

.navbar-menu a {
  color: #585858 !important;
}

.navbar-menu a:hover {
  color: #2196f3 !important;
}

.header__Logo-element img {
  max-height: 3.75rem;
}

.header__Logo {
  margin-left: 20px;
  padding: 5px;
}

.header__Logo-element {
  display: inline-block;
  line-height: 22px;
  vertical-align: middle;
}

.header__Logo-element-text {
  margin-left: 5px;
}

.header__Logo-text {
  display: block;
  text-align: left;
  font-weight: 400;
  padding: 0;
  margin: 0;
  text-decoration: none;
  text-underline: none;
  color: #4a4a4a;
}

.header__Logo-text-bold {
  font-size: 30px;
  font-weight: 700;
  font-family: "Roboto", sans-serif;
}

.header__Logo-text-thin {
  color: #292929;
}

@media (max-width: 600px) {
  .header__Logo-element img {
    max-height: 2.75rem;
  }

  .header__Logo-text-thin {
    font-size: 14px !important;
  }

  .header__Logo-text-bold {
    font-size: 24px !important;
  }

  .navbar-brand {
    margin-top: 5px;
  }
}
</style>

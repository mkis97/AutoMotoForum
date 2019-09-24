<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon id="menuicon" class="grey--text" @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">deutsche</span>
        <span>automobile</span>
        <span class="text-lowercase font-weight-light">forum</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" @click="goOut">
        <span>sign out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="indigo" v-if="(['signin'].indexOf($route.name) && ['signup'].indexOf($route.name))===-1">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon class="white--text">face</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              <span
                class="white--text text-uppercase title font-weight-light font-italic"
              >{{current}}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{link.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <Popup/>
    </v-navigation-drawer>
  </nav>
</template>



<script>
import Popup from "./Popup";
import { store } from "@/store";

export default {
  components: { Popup },
  store: store,
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/dashboard" },
        { icon: "folder", text: "My Posts", route: "/posts" }
      ]
    };
  },
  computed: {
    current() {
      return this.$store.state.username;
    }
  },
  methods: {
    goOut() {
      this.$store.state.username = "";
      this.$router.push("signin");
    }
  }
};
</script>



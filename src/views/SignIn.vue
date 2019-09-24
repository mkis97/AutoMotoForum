<template>
  <div>
    <div class="mt-3" id="signInForm">
      <form class="ma-4" v-on:keyup.enter="sign">
        <v-text-field v-model="name" label="Username"></v-text-field>
        <v-text-field type="password" v-model="password" label="Password"></v-text-field>
        <v-btn @click="sign" class="success">SIGN IN</v-btn>
        <v-btn @click="clear">clear</v-btn>
      </form>
    </div>
  </div>
</template>



<script>
import { store } from "@/store";
import getAllFromFirebase from "@/getAllFromFirebase";

export default {
  store: store,
  data: () => ({
    name: "",
    password: "",
    users: []
  }),

  computed: {},

  methods: {
    clear() {
      this.name = "";
      this.password = "";
    },
    sign() {
      if (this.name != "" && this.password != "") {
        this.users.forEach(user => {
          if (this.name === user.username && this.password === user.password) {
            this.$router.push("dashboard");
            this.$store.state.username = this.name;
          }
        });
      }
      else{
        alert("Please enter all data")
      }
    }
  },
  async created() {
    let res = await getAllFromFirebase("users");
    const changes = res.docChanges();
    changes.forEach(change => {
      if (change.type == "added") {
        this.users.push({
          ...change.doc.data(),
          id: change.doc.id
        });
      }
    });
  }
};
</script>


<style>
#signInForm {
  border-left: 2.5px solid rgba(0, 0, 255, 0.7);
  background-color: white;
  padding-top: 2.5px;
  padding-bottom: 2.5px;
}
</style>
<template>
  <div class="projects">
    <h1 class="subheading grey--text">Posts</h1>

    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="post in myPosts" :key="post.id">
          <div slot="header">{{post.title}}</div>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div>{{post.content}}</div>
              <v-btn small flat class="error" @click="deletePost(post)">Delete</v-btn>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from '@/fb';
import { store } from "@/store";
import getAllFromFirebase from "@/getAllFromFirebase";

export default {
  store: store,
  data() {
    return {
      posts: []
    };
  },
  methods:{
    deletePost(post){
      db.collection("posts").doc(post.id).delete();
    }
  },
  computed: {
    myPosts() {
      return this.posts.filter(posts => {
        return posts.user === this.$store.state.username;
      });
    }
  },
  async created() {
    let res = await getAllFromFirebase("posts");
    const changes = res.docChanges();
    changes.forEach(change => {
      if (change.type === "added") {
        this.posts.push({
          ...change.doc.data(),
          id: change.doc.id
        });
      }
    });
  }
};
</script>

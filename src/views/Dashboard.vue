<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-btn flat small color="grey" @click="sortByUser('user')">
          <v-icon left small>contacts</v-icon>
          <span class="caption text-lowercase">By user</span>
        </v-btn>
        <v-btn flat small color="grey" @click="sortByStatus('status')">
          <v-icon left small>clock</v-icon>
          <span class="caption text-lowercase">By status</span>
        </v-btn>
      </v-layout>

      <v-card flat v-for="post in posts" :key="post.id">
        <v-layout row wrap :class="`pa-3 project ${post.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Post title</div>
            <div>{{post.title}}</div>
          </v-flex>
          <v-flex xs8 sm6 md4>
            <div class="caption grey--text">User</div>
            <div>{{post.user}}</div>
          </v-flex>
          <v-flex xs4 sm6 md2>
            <div class="left">
              <v-chip
                small
                @click="changeStatus(post)"
                :class="`${post.status} white--text caption my-2`"
              >{{post.status}}</v-chip>
            </div>
          </v-flex>
          <v-flex class="my-3">
            <div class="caption grey--text">Content</div>
            <div>{{post.content}}</div>
          </v-flex>
          <v-flex>
            <v-divider class="mt-5"></v-divider>
            <v-img v-bind:src="post.link" aspect-ratio=1.7778 class="mx-3 my-3"></v-img>
          </v-flex>
        </v-layout>
        <v-divider class="my-2"></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import db from "@/fb";
import { store } from "@/store";
import getAllFromFirebase from "@/getAllFromFirebase";

export default {
  data() {
    return {
      posts: []
    };
  },
  methods: {
    sortByStatus(prop) {
      this.posts.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    sortByUser(prop) {
      this.posts.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    changeStatus(post) {
      if (post.status === "waiting") {
        post.status = "liked";
        let postRefLiked = db.collection("posts").doc(post.id);
        postRefLiked.update({
          status: "liked"
        });
      } else {
        post.status = "waiting";
        let postRefWaiting = db.collection("posts").doc(post.id);
        postRefWaiting.update({
          status: "waiting"
        });
      }
    }
  },
  computed: {
    myPosts() {
      return this.posts.filter(posts => {
        return posts.status === "waiting";
      });
    },
    current() {
      return this.$store.state.username;
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

<style>
.project.liked {
  border-left: 4px solid greenyellow;
}
.project.waiting {
  border-left: 4px solid tomato;
}
.v-chip.liked {
  background: greenyellow;
}
.v-chip.waiting {
  background: tomato;
}
</style>

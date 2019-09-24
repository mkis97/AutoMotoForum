<template>
  <v-dialog max-width="600px">
    <v-btn slot="activator" class="success">ADD NEW POST</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a new post</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field label="Title" v-model="title" prepend-icon="folder"></v-text-field>
          <v-textarea label="Content" v-model="content" prepend-icon="edit"></v-textarea>
          <input type="file" @change="onFileChange">
          <v-btn flat class="success mx-0 mt-3" @click="add" :loading="loading">Add post</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
import axios from "axios";
import db from "@/fb";
import { store } from "@/store";
import CLOUD from "@/cloudinary";

export default {
  store: store,
  data() {
    return {
      title: "",
      content: "",
      loading: false,
      image: ""
    };
  },
  methods: {
    add() {
      if (this.title != "" && this.content != "") {
        this.loading = true;
        const post = {
          title: this.title,
          content: this.content,
          status: "waiting",
          user: this.$store.state.username
        };
        db.collection("posts")
          .add(post)
          .then(() => {
            this.loading = false;
            this.title = "";
            this.content = "";
          });
      } else {
        alert("All fields should be entered");
      }
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);

      console.log(files[0]);

      var formData = new FormData();
      formData.append("file", files[0]);
      formData.append("upload_preset", CLOUD.CLOUDINARY_UPLOAD_PRESET);
      try {
        let result = await axios({
          url: CLOUD.CLOUDINARY_URL,
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencode"
          },
          data: formData
        });
      } catch (err) {
        console.error(err.response);
      }
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

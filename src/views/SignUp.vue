<template>
  <div>
    <div class="mt-3">
      <div class="validationDiv">
        <form class="ma-4" v-on:keyup.enter="addUser">
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="20"
            label="Username"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="confirmed"
            :error-messages="confirmedErrors"
            label="Confirm password"
            required
            @input="$v.confirmed.$touch()"
            @blur="$v.confirmed.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Do you agree?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>

          <v-btn @click="addUser" class="success">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
      </div>
    </div>
    <div class="my-3">
      <span class="grey--text">
        Already have an account?
        <v-btn to="/signin" class="success">SIGN IN</v-btn>
      </span>
    </div>
  </div>
</template>



<script>
import db from "@/fb";
import { store } from "@/store";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    email: { required, email },
    select: { required },
    password: { required, minLength: minLength(8) },
    confirmed: { required },
    checkbox: {
      checked(val) {
        return val;
      }
    }
  },
  store: store,
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmed: "",
    select: null,
    checkbox: false
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.select.$dirty) return errors;
      !this.$v.select.required && errors.push("Item is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      !this.$v.password.minLength &&
        errors.push("Password must be at least 8 characters long");
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    confirmedErrors() {
      const errors = [];
      if (!this.$v.confirmed.$dirty) return errors;
      !this.$v.confirmed.required &&
        errors.push("Confirmed password is required");
      !(this.password === this.confirmed) && errors.push("Not same");
      return errors;
    }
  },

  methods: {
    addUser() {
      if (
        this.name != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirmed != "" &&
        this.checkbox == true
      ) {
        const newUser = {
          username: this.name,
          password: this.confirmed
        };
        db.collection("users")
          .add(newUser)
          .then(() => {
            this.$router.push("dashboard");
            this.$store.state.username = this.name;
          });
      }
      else{
        alert("Please enter all data")
      }
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
      this.confirmed = "";
      this.checkbox = false;
    }
  }
};
</script>


<style>
.validationDiv {
  border-left: 2.5px solid rgba(0, 0, 255, 0.7);
  background-color: white;
  padding-top: 2.5px;
  padding-bottom: 2.5px;
}
</style>


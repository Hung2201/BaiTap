<template>
  <div>
    <h1>Welcome to the Greeting Page</h1>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "GreeTing",
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async fetchGreeting() {
      try {
        const response = await axios.get(`http://localhost:8080/greeting`, {
          params: { name: this.$route.query.name || "" },
        });
        this.message = response.data;
      } catch (error) {
        console.error("Error calling API:", error);
      }
    },
  },
  watch: {
    $route: "fetchGreeting",
  },
  mounted() {
    this.fetchGreeting();
  },
};
</script>
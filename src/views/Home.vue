<template>
  <div class="home">
    <h1>Nice</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      schema: {
        name: {
          type: "string"
        }
      },
      formData: {}
    };
  }
};
</script>

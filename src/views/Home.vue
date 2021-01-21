<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <HelloWorld msg="Welcome to Your Vue.js App" />
    <CollapseItem title="hello">
      <h4>nih</h4>
    </CollapseItem>

    <schema-from :schema="schema" v-model="formData" />
  </div>
</template>

<script>
import SchemaFrom from "../../packages/schema-form/src/SchemaForm";
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CollapseItem from "@/components/CollapseItem.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    SchemaFrom,
    CollapseItem
  },
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

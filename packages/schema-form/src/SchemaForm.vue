<template>
  <el-form :model="formData" :rules="rules" v-bind="formProps">
    <el-row>
      <schema-field
        v-for="(item, index) in computedFields"
        :key="index"
        :schema="item"
        :value="formData[item.property]"
        @input="onInput"
      ></schema-field>
    </el-row>
  </el-form>
</template>
<script>
import { deepClone } from "./utils";
import SchemaField from "./SchemaField";
import { registerWidget } from "./register";

export default {
  name: "SchemaForm",
  components: {
    SchemaField
  },
  provide() {
    return {
      root: this
    };
  },
  props: {
    schema: {
      type: Object,
      required: true,
      default() {
        return {};
      }
    },
    value: {
      type: Object,
      required: true
    },
    widgets: {
      type: Object,
      default() {
        return {};
      }
    },
    rules: Array,
    formProps: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      formData: {}
    };
  },
  computed: {
    computedFields() {
      return Object.keys(this.schema).map(k => {
        return {
          property: k,
          ...this.schema[k]
        };
      });
    }
  },
  watch: {
    value: {
      handler() {
        this.setCurrentValue();
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setCurrentValue() {
      if (!(this.formData && this.value === this.formData)) {
        if (this.value) {
          this.formData = deepClone(this.value);
        } else {
          this.formData = {};
        }
      }
    },
    onInput(key, value) {
      this.$set(this.formData, key, value);
      const cloneValue = deepClone(this.formData);
      this.$emit("input", cloneValue);
      this.$emit("change", cloneValue);
    }
  },
  created() {
    Object.keys(this.widgets).forEach(key => {
      registerWidget(key, this.widgets[key]);
    });
  }
};
</script>

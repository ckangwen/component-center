<template>
  <el-col :span="schema.span || 24">
    <el-form-item v-bind="formItemProps">
      <component
        :is="componentName"
        :class="schema.class"
        :style="schema.style"
        :value="currentValue"
        v-bind="inputProps"
        @input="onInput"
      />
    </el-form-item>
  </el-col>
</template>
<script>
import { componentMap } from "./widgets";
function equals(x, y) {
  const f1 = x instanceof Object;
  const f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y;
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false;
  }
  for (const p in x) {
    const a = x[p] instanceof Object;
    const b = y[p] instanceof Object;
    if (a && b) {
      equals(x[p], y[p]);
    } else if (x[p] != y[p]) {
      return false;
    }
  }
  return true;
}
function arrayEqual(arr1, arr2) {
  if (arr1 === arr2) return true;
  if (arr1.length != arr2.length) return false;
  for (let i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
export default {
  name: "SchemaField",
  inject: ["root"],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: [Object, String, Number, Array, Boolean]
  },
  data() {
    return {
      currentValue: "",
      componentName: "el-input"
    };
  },
  computed: {
    formItemProps() {
      return {
        required: this.schema.required,
        label: this.schema.title || this.schema.property,
        prop: this.schema.property,
        size: this.schema.size
      };
    },
    inputProps() {
      const props = Object.assign({}, this.schema["ui-props"], {
        placeholder: this.schema.placeholder,
        schema: this.schema
      });
      return props;
    }
  },
  watch: {
    value(cur) {
      this.currentValue = cur;
    },
    currentValue(cur, prev) {
      if (typeof cur === "object") {
        if (!equals(cur, prev)) {
          this.$emit("input", this.schema.property, cur);
        }
      } else if (Array.isArray(cur)) {
        if (!arrayEqual(cur, prev)) {
          this.$emit("input", this.schema.property, cur);
        }
      } else {
        this.$emit("input", this.schema.property, cur);
      }
    }
  },
  methods: {
    onInput(value) {
      if (this.schema.type === "number" && typeof value === "string") {
        this.currentValue = value.replace(/[^\d]/g, "");
      } else {
        this.currentValue = value;
      }

      // this.$emit('input', this.schema.property, value)
      // this.$emit('change', this.schema.property, value)
    },
    getComponentName() {
      const type = componentMap.get(this.schema.type);
      const widget = this.schema["ui-widget"];
      let component = "";
      if (componentMap.has(widget)) {
        component = componentMap.get(widget);
      } else if (this.root.widgets[widget]) {
        component = this.root.widgets[widget];
      } else if (widget) {
        throw new Error(`尚未注册${widget}组件`);
      }

      if (!type) {
        throw new Error(`尚未注册${this.schema.type}类型的组件`);
      }

      return component || type;
    }
  },
  created() {
    let currentValue = this.value != null ? this.value : this.schema.default;
    if (this.schema.type === "array" && !currentValue) {
      currentValue = [];
    }
    this.currentValue = currentValue;
    this.componentName = this.getComponentName();
  }
};
</script>

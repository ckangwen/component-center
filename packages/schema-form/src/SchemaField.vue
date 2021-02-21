<template>
  <div>
    <el-col v-if="layout" :span="schema.span || 24">
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
    <el-form-item v-bind="formItemProps" v-else>
      <component
        :is="componentName"
        :class="schema.class"
        :style="schema.style"
        :value="currentValue"
        v-bind="inputProps"
        @input="onInput"
      />
    </el-form-item>
  </div>
</template>
<script>
import { componentMap } from "./widgets";
export default {
  name: "SchemaField",
  inject: ["root"],
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: [Object, String, Number, Array, Boolean],
    layout: Boolean
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
        size: this.schema.size,
        ...(this.schema["item-attrs"] || {})
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
    value: {
      handler(val) {
        this.currentValue = val
      },
      deep: true
    },
  },
  methods: {
    onInput(value) {
      if (this.schema.type === "number" && typeof value === "string") {
        this.currentValue = value.replace(/[^\d]/g, "");
      } else {
        this.currentValue = value;
      }
      this.$emit('input', this.schema.property, value)
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

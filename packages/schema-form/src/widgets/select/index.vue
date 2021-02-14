<template>
  <el-select :value="value" @input="onInput" v-bind="props">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.label"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'inner-select',
  props: {
    schema: Object,
    value: [Number, String, Array, Object, Boolean]
  },
  data () {
    return {
      options: [],
      props: {}
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    }
  },
  created () {
    this.options = (this.schema.enums || []).map(item => {
      if (typeof item === 'string' || typeof item === 'number') {
        return {
          label: item,
          value: item
        }
      }
      return item
    })
    this.props = this.schema['ui-props'] || {}
    if (this.schema.type === 'array') {
      this.props = Object.assign({}, this.props, {
        multiple: true
      })
    }
  }
}
</script>

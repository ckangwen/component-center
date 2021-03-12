<template>
  <div class="container">
    <schema-form v-model="formData" :schema="schema" />
  </div>
</template>
<script>
import SchemaForm from '@/components/schema-form'
const schema = {
  name: {
    type: 'string',
    title: 'String',
    placeholder: 'string类型的表单',
    class: 'type-string',
    default: 'DEFAULT'
  },
  boolean: {
    title: 'Boolean',
    type: 'boolean'
  },
  age: {
    type: 'number',
    title: 'Number',
    default: 0
  },
  select: {
    type: 'array',
    title: 'Select(Array)',
    'ui-widget': 'select',
    enums: ['foo', 'bar', 'zoo']
  },
  select2: {
    type: 'string',
    title: 'Select(String)',
    'ui-widget': 'select',
    enums: ['甲', '乙', '丙']
  },
  array: {
    type: 'array',
    title: 'Array(default)',
    enums: ['选项A', '选项B']
  },
  array2: {
    type: 'array',
    'ui-widget': 'checkbox-button',
    title: 'Array(Button)',
    enums: ['选项A', '选项B']
  },
  radio: {
    type: 'number',
    'ui-widget': 'radio',
    title: 'Number(Radio)',
    enums: [100, 999]
  }
}
export default {
  components: {
    SchemaForm
  },
  data() {
    return {
      schema,
      formData: {}
    }
  }
}
</script>

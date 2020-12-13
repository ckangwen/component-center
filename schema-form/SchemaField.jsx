/*
interface ISchema {
  property: string;
  title?: VNode | string;
  extra?: VNode | string;
  default?: unknown;
  readonly?: boolean;
  required?: boolean;
  type?: string;
  size?: string;
  span: string | number;
  enum?: unknown[];
  // nested json schema spec
  properties?: {
    [key: string]: ISchema;
  };
  items?: ISchema[];
  // 表单组件的props
  'ui-props': Record<string, any>;
}
*/
import { componentMap } from './widgets'
export default {
  name: 'SchemaField',
  props: {
    schema: {
      type: Object,
      required: true
    },
    value: [Object, String, Number, Array, Boolean]
  },
  data () {
    return {
      currentValue: ''
    }
  },
  watch: {
    currentValue (cur) {
      if (this.value !== cur) {
        this.$emit('input', this.schema.property, cur)
        this.$emit('change', this.schema.property, cur)
      }
    },
    value (cur) {
      if (this.value !== cur) {
        this.currentValue = cur
      }
    }
  },
  methods: {
    onInput (value) {
      if (this.currentValue !== value) {
        this.currentValue = value || this.schema.default
      }
    },
    getComponentName () {
      const type = componentMap[this.schema.type]
      if (!type) {
        throw new Error(`尚未注册${this.schema.type}类型的组件`)
      }
      return type
    }
  },
  render () {
    console.log('[ReRender]schema-field')
    const formItemProps = {
      required: this.schema.required,
      label: this.schema.title,
      prop: this.schema.property,
      size: this.schema.size
    }
    const extra = this.schema.extra || ''

    let inputProps = Object.assign({}, this.schema['ui-props'])
    inputProps.value = this.value || this.schema.default
    const CompnentName = this.getComponentName()
    const InputNode = <CompnentName props={inputProps} onInput={this.onInput} />

    const noWrap = !this.schema.title

    let content = noWrap ? InputNode : (
      <el-form-item {...formItemProps}>
        {<span slot="label">{formItemProps.label}</span>}
        { InputNode }
        { extra }
      </el-form-item>
    )

    if (this.schema.span) {
      content = (
        <el-col span={this.schema.span}>{content}</el-col>
      )
    }

    return content
  }
}

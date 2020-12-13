import { clone } from './utils'
import SchemaField from './SchemaField'

export default {
  name: 'SchemaForm',
  components: {
    SchemaField
  },
  props: {
    schema: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    value: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    computedFields () {
      return Object.keys(this.schema).map(k => {
        return {
          property: k,
          ...this.schema[k]
        }
      })
    }
  },
  watch: {
    formData: {
      handler (cur) {
        const cloneValue = clone(cur)
        this.$emit('input', cloneValue)
        this.$emit('change', cloneValue)
      }
    }
    // value: {
    //   handler (cur) {
    //     this.setCurrentValue()
    //   }
    // }
  },
  methods: {
    setCurrentValue () {
      if (!(this.formData && this.value === this.formData)) {
        console.log(2333)
        if (this.value) {
          this.formData = clone(this.value)
        } else {
          this.formData = {}
        }
      }
    },
    onFormInput () {
      //
    },
    onInput (key, value) {
      this.formData[key] = value
      console.log(this.formData)
    }
  },
  created () {
    Object.keys(this.schema).forEach(k => {
      this.$set(this.formData, k, '')
    })
    // this.setCurrentValue()
  },
  render () {
    return (
      <el-form model={this.formData} onInput={this.onFormInput}>
        <el-row>
          {
            this.computedFields.map(item => {
              return (
                <schema-field
                  key={item.property}
                  schema={item}
                  value={this.formData[item.property]}
                  onInput={this.onInput}
                ></schema-field>)
            })
          }
        </el-row>
      </el-form>
    )
  }
}

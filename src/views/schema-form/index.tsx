import { Vue, Component } from "vue-property-decorator";
import SchemaForm from "@packages/schema-form/src/SchemaForm.jsx";

@Component({
  name: "SchemaFormPage",
  components: {
    SchemaForm
  }
})
export default class SchemaFormPage extends Vue {
  inputSchema = {
    name: {
      type: "string",
      placeholder: "string类型的表单",
      class: "type-string",
      default: "DEFAULT"
    },
    age: {
      type: "number",
      class: "type-number",
      default: 0
    },
    select: {
      type: "array",
      "ui-widget": "select",
      enums: ["111", "test", "name"]
    }
  };
  inputValue = {
    name: "",
    age: ""
  };

  render() {
    return (
      <el-container>
        <el-card header="测试string类型">
          <schema-form
            schema={this.inputSchema}
            vModel={this.inputValue}
          ></schema-form>
          <el-divider></el-divider>

          <p class="text type-string">{this.inputValue.name}</p>
          <p class="text type-number">{this.inputValue.age}</p>
        </el-card>
      </el-container>
    );
  }
}

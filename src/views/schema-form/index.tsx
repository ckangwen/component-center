import { Vue, Component } from "vue-property-decorator";
import SchemaForm from "@packages/schema-form";
import StyleComp from "@/components/style/index.vue";
import ObjectArray from "@/components/ObjectArray.vue";

const CellSettings = {
  title: {
    title: "title",
    type: "string"
  },
  icon: {
    title: "icon",
    type: "string",
    default: "star-o"
  },
  "is-link": {
    title: "is-link",
    type: "boolean",
    default: true
  }
};

const CellGroupSettings = {
  cellSettings: {
    title: "cell settings",
    type: "ObjectArray",
    properties: CellSettings,
    default: []
  }
};

@Component({
  name: "SchemaFormPage",
  components: {
    SchemaForm,
    ObjectArray
  }
})
export default class SchemaFormPage extends Vue {
  inputSchema = {
    objectArrat: CellGroupSettings.cellSettings,
    name: {
      type: "string",
      title: "String",
      placeholder: "string类型的表单",
      class: "type-string",
      default: "DEFAULT"
    },
    boolean: {
      title: "boolean",
      type: "boolean"
    },
    age: {
      type: "number",
      title: "Number",
      class: "type-number",
      default: 0
    },
    select: {
      type: "array",
      title: "Array",
      "ui-widget": "select",
      enums: ["111", "test", "name"]
    },
    select2: {
      type: "string",
      title: "String Select",
      "ui-widget": "select",
      enums: ["111", "test", "name"]
    },
    array: {
      type: "array",
      title: "Array",
      enums: ["AA", "BB"]
    },
    array2: {
      type: "array",
      "ui-widget": "checkbox-button",
      title: "Array",
      enums: ["AA", "BB"]
    },
    radio: {
      type: "number",
      "ui-widget": "radio",
      title: "Number",
      enums: [222, 444]
    },
    "radio-button": {
      type: "number",
      "ui-widget": "radio-button",
      title: "Number",
      enums: [9999, 5555]
    }
  };
  inputValue = {
    name: "NAME",
    age: "",
    select: ["111"],
    objectArrat: [] as any[]
  };
  get text() {
    return JSON.stringify(this.inputValue, null, 2);
  }

  updateObjectArray() {
    this.inputValue.objectArrat = [
      {
        title: 'TITLE',
        icon: 'ICON',
        "is-link": true
      }
    ]
  }
  widgets = {
    style: StyleComp,
    ObjectArray
  };

  render() {
    return (
      <div>
        <el-card header="测试string类型">
          <schema-form
            schema={this.inputSchema}
            vModel={this.inputValue}
            widgets={this.widgets}
          ></schema-form>
          <el-divider></el-divider>

          <p class="text type-string">{this.text}</p>
        </el-card>

        <el-button
          onClick={() => {
            this.inputValue.select.push("name");
          }}
        >
          update
        </el-button>
        <el-button
          onClick={this.updateObjectArray}
        >
          更新数组
        </el-button>
      </div>
    );
  }
}

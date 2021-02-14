import Vue from "vue";

export declare class Component extends Vue {
  static install(vue: typeof Vue): void;
}

type SchemaType = {
  title?: string;
  property: string;
  required: boolean;
  size?: "medium " | "small" | "mini";
  "ui-props": Record<string, any>;
  "ui-widget": any;
  default: any;
};

export class SchemaForm extends Component {
  schema: SchemaType;
  value: Record<string, any>;
  widget: Record<string, any>;
  rules: Record<string, any>;
}

export class SchemaField extends Component {
  schema: SchemaType;
  value: Record<string, any>;
}

export default SchemaForm;

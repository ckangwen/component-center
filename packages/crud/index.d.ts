import Vue from "vue";

export declare class Component extends Vue {
  static install(vue: typeof Vue): void;
}

export default class Crud extends Component {
  data: Record<string, any>[];
  columns: Record<string, any>[];
  removeConfirmOptions?: Record<string, any>;
  tableProps?: Record<string, any>;
  selection?: boolean | Record<string, any>;
  expand?: boolean | Record<string, any>;
  loading?: boolean;
  loadingOptions?: Record<string, any>;
  expandOptions?: Record<string, any>;
  extraColumnProps?: Record<string, any>;
  index?: Function | boolean | number;
  theadContent?: Function;
  extraHeadContent?: Function;
  cellContent?: Function;
  showExtraColumn?: boolean;
  pagination?: boolean | Record<string, any>;
  rules?: Record<string, any>;
  dialogOptions?: Record<string, any>;
  showDelete?: boolean;
  showUpdate?: boolean;
  deleteContent?: Function;
  updateContent?: Function;
  beforeRowRemove?: Function;
  beforeRowAdd?: Function;
  beforeRowUpdate?: Function;
  dialogFormItemRender?: Function;
}

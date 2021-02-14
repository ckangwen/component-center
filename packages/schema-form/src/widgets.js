import Select from "./widgets/select/index";
import Checkbox from "./widgets/checkbox/checkbox.vue";
import CheckboxButton from "./widgets/checkbox/button.vue";
import Radio from "./widgets/radio/radio.vue";
import RadioButton from "./widgets/radio/button.vue";

const baseMap = {
  string: "el-input",
  boolean: "el-switch",
  number: "el-input",
  array: Checkbox,
  "checkbox-button": CheckboxButton,
  radio: Radio,
  "radio-button": RadioButton,
  select: Select,
  enum: Select,
  any: "el-input"
};

export const componentMap = new Map();

Object.keys(baseMap).forEach(key => {
  componentMap.set(key, baseMap[key]);
});

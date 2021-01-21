<template>
  <div class="comp-container">
    <el-button @click="loading = !loading">Loading</el-button>

    <crud
      :data="data"
      :columns="columns"
      :loading="loading"
      index
      :theadContent="theadContent"
      :extraHeadContent="extraHeadContent"
      :cellContent="cellContent"
      showExtraColumn
    >
    </crud>
  </div>
</template>
<script>
import Crud from "@packages/crud/src/crud.vue";
export default {
  components: {
    Crud
  },
  data() {
    return {
      columns: [
        {
          label: "日期",
          prop: "date",
          width: "180"
        },
        {
          label: "姓名",
          prop: "name",
          width: "180"
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      data: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      loading: false
    };
  },
  methods: {
    theadContent(h, { label }) {
      return h("span", { class: "custom-thead" }, [label]);
    },
    extraHeadContent(h) {
      return h("span", ["Extra"]);
    },
    cellContent(h, { row, column }) {
      return h("span", { class: "custom-cell" }, [row[column.property]]);
    }
  }
};
</script>

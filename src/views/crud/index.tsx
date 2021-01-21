import { Vue, Component } from "vue-property-decorator";
import Crud from "@packages/crud/src/crud.vue";

@Component({
  name: "CrudPage",
  components: {
    Crud
  }
})
export default class CrudPage extends Vue {
  columns = [
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
  ];
  data = [
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
  ];
  loading = false;
  render() {
    return (
      <el-container>
        <el-card style="width: 100%">
          <el-button
            onClick={() => {
              this.loading = !this.loading;
            }}
          >
            loading
          </el-button>
          <crud
            data={this.data}
            columns={this.columns}
            loading={this.loading}
          />
        </el-card>
      </el-container>
    );
  }
}

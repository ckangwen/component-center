import { createLocalVue, mount } from "@vue/test-utils";
import Crud from "../../packages/crud/src/crud.vue";
import ElementUI from "element-ui";
import { CreateElement } from "vue/types/umd";
const localVue = createLocalVue();
localVue.use(ElementUI);

const toArray = function<T extends unknown>(obj: any): T[] {
  return [].slice.call(obj);
};
const wait = function(ms = 50) {
  return new Promise(resolve => setTimeout(() => resolve(""), ms));
};

const createTable = ({
  props = "",
  columns = [],
  columnData = [],
  data = {},
  methods = {}
}: {
  columns: any[];
  columnData: any[];
  props?: string;
  data?: Record<string, any>;
  methods?: Record<string, any>;
}) => {
  const comp = {
    components: { Crud },
    template: `
      <crud :columns="columns" :data="data" ${props}></crud>
    `,
    data() {
      return {
        columns,
        data: columnData,
        ...data
      };
    },
    methods
  };
  const wrapper = mount(comp, {
    localVue
  });
  return wrapper;
};

describe("Crud", () => {
  const columns = [
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
  const data = [
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
  describe("基础使用", () => {
    const wrapper = createTable({
      columns,
      columnData: data
    });
    it("表头数据", () => {
      expect(wrapper.exists()).toBe(true);
      const theades = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll("thead th")
      );
      expect(theades.map(node => node.textContent).filter(t => !!t)).toEqual([
        "日期",
        "姓名",
        "地址"
      ]);
    });

    it("行数据", () => {
      expect(
        wrapper.vm.$el.querySelectorAll(".el-table__body-wrapper tbody tr")
      ).toHaveLength(data.length);

      const cells = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll("td .cell")
      ).map(node => node.textContent);

      const cellData = data.reduce(
        (acc: string[], cur: Record<string, string>) => {
          const val = Object.values(cur);
          acc = acc.concat([], val);
          return acc;
        },
        []
      );

      expect(cells).toEqual(cellData);
    });
  });

  describe("表格相关的prop", () => {
    it("selection 展示复选框", () => {
      const wrapper = createTable({
        columns,
        columnData: data,
        props: "selection"
      });

      const firstTHead = wrapper.vm.$el.querySelector("thead th:first-child");

      firstTHead?.classList.contains("el-table-column--selection");
    });

    it("index 展示索引", async () => {
      const wrapper = createTable({
        columns,
        columnData: data,
        props: ':index="1"'
      });

      await wait(1000);

      const indexs = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll(
          ".el-table__body-wrapper  tbody > tr > td:nth-child(1) .cell"
        )
      );

      expect(indexs).toHaveLength(4);

      expect(indexs.map(node => node.textContent)).toEqual([
        "1",
        "2",
        "3",
        "4"
      ]);
    });

    it("showExtraColumn 展示额外的列", async () => {
      const wrapper = createTable({
        columns,
        columnData: data,
        props: "showExtraColumn"
      });
      await wait(1000);
      const theades = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll("thead th")
      );
      expect(theades.map(node => node.textContent).filter(t => !!t)).toEqual([
        "日期",
        "姓名",
        "地址",
        "操作"
      ]);
    });

    it("theadContent 自定义表头元素渲染", async () => {
      const theadContent = (h: CreateElement, { label }: any) => {
        return h("span", { class: "custom-thead" }, [label]);
      };
      const wrapper = createTable({
        columns,
        columnData: data,
        props: ':theadContent="theadContent"',
        methods: {
          theadContent
        }
      });
      await wait(1000);
      const theades = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll("thead th")
      );
      expect(theades.map(node => node.textContent).filter(t => !!t)).toEqual([
        "日期",
        "姓名",
        "地址"
      ]);

      expect(
        theades.every(node => {
          const span = node.querySelector(".cell span");
          return span?.classList.contains("custom-thead");
        })
      ).toBe(true);
    });

    it("extraHeadContent 自定义操作列表头元素渲染", async () => {
      const extraHeadContent = (h: CreateElement) => {
        return h("span", "Extra");
      };
      const wrapper = createTable({
        columns,
        columnData: data,
        props: 'showExtraColumn :extraHeadContent="extraHeadContent"',
        methods: {
          extraHeadContent
        }
      });
      await wait(1000);
      const extraHeader = wrapper.vm.$el.querySelector(
        "thead th:last-child .cell"
      ) as HTMLElement;
      expect(extraHeader?.textContent).toBe("Extra");
    });

    it("cellContent 自定义单元格元素渲染", async () => {
      const cellContent = (h: CreateElement, { row, column }: any) => {
        return h("span", { class: "custom-cell" }, [row[column.property]]);
      };
      const wrapper = createTable({
        columns,
        columnData: data,
        props: ':cellContent="cellContent"',
        methods: {
          cellContent
        }
      });
      await wait(1000);
      const cells = toArray<HTMLElement>(
        wrapper.vm.$el.querySelectorAll("td .cell span")
      ).every(node => node.classList.contains("custom-cell"));

      expect(cells).toBe(true);
    });
  });
});

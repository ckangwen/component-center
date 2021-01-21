<template>
  <div class="collapse-item" :class="{ 'is-disabled': disabled }">
    <div role="tab">
      <div
        class="collapse-item__header"
        @click="handleHeaderClick"
        role="button"
      >
        <i
          class="collapse-item__arrow el-icon-arrow-right"
          :style="{
            transform: collapsed ? 'rotate(90deg)' : null
          }"
        ></i>
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <el-collapse-transition>
      <div class="collapse-item__wrap" v-show="!collapsed">
        <div class="collapse-item__content">
          <slot></slot>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import ElCollapseTransition from "element-ui/lib/transitions/collapse-transition";

export default {
  name: "CollapseItem",
  components: { ElCollapseTransition },
  props: {
    title: String,
    name: {
      type: [String, Number],
      default() {
        return this._uid;
      }
    },
    disabled: Boolean
  },
  data() {
    return {
      contentWrapStyle: {
        height: "auto",
        display: "block"
      },
      contentHeight: 0,
      focusing: false,
      isClick: false,
      collapsed: false
    };
  },

  methods: {
    handleHeaderClick() {
      if (this.disabled) return;
      this.collapsed = !this.collapsed;
    }
  }
};
</script>
<style>
.collapse-item__header {
  display: flex;
  align-items: center;
  height: 48px;
  line-height: 48px;
  background-color: #fff;
  color: #303133;
  cursor: pointer;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  font-weight: 500;
  transition: border-bottom-color 0.3s;
  outline: none;
}
.collapse-item__wrap {
  will-change: height;
  background-color: #fff;
  overflow: hidden;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.collapse-item__content {
  padding-bottom: 25px;
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769;
}
</style>

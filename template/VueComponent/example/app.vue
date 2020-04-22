<template>
  <div class="app">
    <button @click="toggleExpand">toggleExpand</button>
    <button @click="setSelected">setSelected</button>
    <draggable-tree
      @drop="onDrop"
      :expanded-keys="expandKeys"
      :default-expand-all="false"
      v-model="list"
      rowKey="menuId"
      :selected-key="selectedKey"
      :props="{ title: 'title', children: 'children' }"
      :allow-drop="allowDrop"
      :render-content="renderContent"
      @select="onSelect"
      @expand="onExpand"
    >
      <!--            <span slot="renderContent" slot-scope="{node}">testrenderContent</span>-->
    </draggable-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedKey: "1",
      expandKeys: ["1"],
      list: [
        {
          menuId: "1",
          title: "1管理",
          children: [
            {
              menuId: "1-1",
              title: "1-1管理"
            },
            {
              menuId: "1-2",
              title: "1-12管理"
            },
            {
              menuId: "1-13",
              title: "1-13管理"
            }
          ]
        },
        {
          menuId: "2",
          title: "2管理",
          children: [
            {
              menuId: "2-1",
              title: "2-1管理"
            },
            {
              menuId: "2-2",
              title: "2-12管理"
            },
            {
              menuId: "2-13",
              title: "2-13管理"
            }
          ]
        }
        //        {
        //          menuId: "3",
        //          title: "3管理"
        //        },
        //        {
        //          title: "4管理"
        //        },
        //        {
        //          title: "5管理"
        //        }
      ]
    };
  },
  created() {},
  methods: {
    toggleExpand() {
      this.expandKeys = [];
    },
    toggleSelected() {
      this.selectedKey = String(++this.selectedKey);
    },
    setSelected() {
      this.selectedKey = "2";
    },
    renderContent({ node, parentNode }) {
      console.log("in render", node, parentNode);
      const { isShow } = this;
      return (
        <span style="color: green">
          {node.title}
          <button onClick={() => this.addChildren(node)}>addchildren</button>
          <button onClick={e => this.addnext(node, parentNode)}>addnext</button>
        </span>
      );
    },
    allowDrop(dragNode, overNode, type) {
      console.log(dragNode, overNode, type);
      // if (dropNode.key === "mpadmin_M_04_02_02") {
      //   return type !== "mid";
      // }
      return true;
    },
    onDrop(data) {
      //      console.log(data);
    },
    addChildren(node) {
      // console.log(node);
      if (!node.children) {
        this.$set(node, "children", []);
      }
      node.children.push({
        menuId: "test-1",
        title: "test"
      });
    },
    addnext(node, parent) {
      console.log(node, parent);
      if (parent) {
        let idx = parent.children.indexOf(node);
        parent.children.splice(idx, 0, {
          title: "test"
        });
        //        parent.push({
        //          title: "test"
        //        });
      } else {
        let idx = this.list.indexOf(node);
        this.list.splice(idx + 1, 0, {
          title: "test"
        });
        //        this.list.push({ title: "test" });
      }
    },
    onSelect(node) {
      console.log("select", node);
      this.selectedKey = node.menuId;
    },
    onExpand(keys) {
      this.expandKeys = keys;
    }
  }
};
</script>

<style scoped></style>

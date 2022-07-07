import { defineComponent, useSlots, computed, openBlock, createElementBlock, createElementVNode, normalizeStyle, unref, renderSlot, toDisplayString, createBlock, resolveDynamicComponent } from "vue";
const toLine = (value) => {
  return value.replace(/(A-Z)/g, "-$1").toLocaleLowerCase();
};
var index_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".trend[data-v-43d17d26]{display:flex;align-items:center}.trend .text[data-v-43d17d26]{font-size:12px;margin-right:4px}.trend .icon svg[data-v-43d17d26]{width:.8rem;height:.8rem}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "trend" };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { class: "icon" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    type: {
      type: String,
      default: "up"
    },
    text: {
      type: String,
      default: ""
    },
    upIcon: {
      type: String,
      default: "ArrowUp"
    },
    downIcon: {
      type: String,
      default: "ArrowDown"
    },
    upIconColor: {
      type: String,
      default: "#f5222d"
    },
    downIconColor: {
      type: String,
      default: "#52c41a"
    },
    upTextColor: {
      type: String,
      default: "#000"
    },
    downTextColor: {
      type: String,
      default: "#000"
    },
    reverseColor: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const textColor = computed(() => {
      return props.type === "up" ? props.upTextColor : props.downTextColor;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", {
          class: "text",
          style: normalizeStyle({ color: unref(textColor) })
        }, [
          unref(slots).default ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(__props.text), 1))
        ], 4),
        createElementVNode("div", _hoisted_3, [
          __props.type === "up" ? (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.upIcon)}`), {
            key: 0,
            style: normalizeStyle({ color: !__props.reverseColor ? __props.upIconColor : "#52c41a" })
          }, null, 8, ["style"])) : (openBlock(), createBlock(resolveDynamicComponent(`el-icon-${unref(toLine)(__props.downIcon)}`), {
            key: 1,
            style: normalizeStyle({ color: !__props.reverseColor ? __props.downIconColor : "#f5222d" })
          }, null, 8, ["style"]))
        ])
      ]);
    };
  }
});
var trend = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43d17d26"]]);
var index = {
  install(app) {
    app.component("m-trend", trend);
  }
};
export { index as default };

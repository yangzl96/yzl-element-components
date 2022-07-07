import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, createElementVNode, createVNode, unref, isRef } from "vue";
const _hoisted_1 = { style: { "display": "flex" } };
const _hoisted_2 = { style: { "margin-right": "20px" } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    startPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u5F00\u59CB\u65F6\u95F4"
    },
    endPlaceholder: {
      type: String,
      default: "\u8BF7\u9009\u62E9\u7ED3\u675F\u65F6\u95F4"
    },
    disableToday: {
      type: Boolean,
      default: true
    }
  },
  emits: ["startChange", "endChange"],
  setup(__props, { emit: emits }) {
    const props = __props;
    let startDate = ref(null);
    let endDate = ref(null);
    let endDateDisabled = ref(true);
    const startDisabledDate = (time) => {
      if (props.disableToday)
        return time.getTime() < Date.now() - 1e3 * 60 * 60 * 24;
    };
    const endDisabledDate = (time) => {
      if (startDate.value)
        return time.getTime() < startDate.value.getTime() + 1e3 * 60 * 60 * 24;
    };
    watch(startDate, (val) => {
      if (!val) {
        endDateDisabled.value = true;
        endDate.value = null;
      } else {
        endDateDisabled.value = false;
        emits("startChange", val);
      }
    });
    watch(endDate, (val) => {
      if (val) {
        emits("endChange", {
          startDate: startDate.value,
          endDate: val
        });
      }
    });
    watch(endDate, (val) => {
    });
    return (_ctx, _cache) => {
      const _component_el_date_picker = resolveComponent("el-date-picker");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_date_picker, {
            placeholder: __props.startPlaceholder,
            disabledDate: startDisabledDate,
            modelValue: unref(startDate),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(startDate) ? startDate.value = $event : startDate = $event),
            type: "date"
          }, null, 8, ["placeholder", "modelValue"])
        ]),
        createElementVNode("div", null, [
          createVNode(_component_el_date_picker, {
            placeholder: __props.endPlaceholder,
            modelValue: unref(endDate),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(endDate) ? endDate.value = $event : endDate = $event),
            type: "date",
            disabled: unref(endDateDisabled),
            disabledDate: endDisabledDate
          }, null, 8, ["placeholder", "modelValue", "disabled"])
        ])
      ]);
    };
  }
});
var index = {
  install(app) {
    app.component("m-choose-date", _sfc_main);
  }
};
export { index as default };

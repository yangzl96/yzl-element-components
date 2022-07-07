import { defineComponent, ref, watch, resolveComponent, openBlock, createElementBlock, normalizeClass, createVNode, mergeProps, withCtx, renderSlot } from "vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    onChange: {
      type: Function
    },
    onBeforeUpload: {
      type: Function
    },
    onPreview: {
      type: Function
    },
    onRemove: {
      type: Function
    },
    beforeRemove: {
      type: Function
    },
    onExceed: {
      type: Function
    },
    onSuccess: {
      type: Function
    }
  },
  emits: ["update:visible"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const form = ref();
    const dialogVisible = ref(props.visible);
    watch(() => props.visible, (val) => {
      dialogVisible.value = val;
    });
    watch(() => dialogVisible.value, (val) => {
      emits("update:visible", val);
    });
    return (_ctx, _cache) => {
      const _component_m_form = resolveComponent("m-form");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({ "m-choose-icon-dialog-body-height": __props.isScroll })
      }, [
        createVNode(_component_el_dialog, mergeProps({
          modelValue: dialogVisible.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => dialogVisible.value = $event)
        }, _ctx.$attrs), {
          default: withCtx(() => [
            createVNode(_component_m_form, {
              onOnChange: __props.onChange,
              onBeforeUpload: __props.onBeforeUpload,
              onOnPreview: __props.onPreview,
              onOnRemove: __props.onRemove,
              onBeforeRemove: __props.beforeRemove,
              onOnSuccess: __props.onSuccess,
              onOnExceed: __props.onExceed,
              ref_key: "form",
              ref: form,
              options: __props.options,
              "label-width": "100px"
            }, {
              uploadArea: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadArea")
              ]),
              uploadTip: withCtx(() => [
                renderSlot(_ctx.$slots, "uploadTip")
              ]),
              _: 3
            }, 8, ["onOnChange", "onBeforeUpload", "onOnPreview", "onOnRemove", "onBeforeRemove", "onOnSuccess", "onOnExceed", "options"])
          ]),
          footer: withCtx(() => [
            renderSlot(_ctx.$slots, "footer", { form: form.value })
          ]),
          _: 3
        }, 16, ["modelValue"])
      ], 2);
    };
  }
});
var index = {
  install(app) {
    app.component("m-modal-form", _sfc_main);
  }
};
export { index as default };

function getElemHeight (el) {
  const elStyle = getComputedStyle(el);
  const elDisplay = elStyle.display;
  const elPosition = elStyle.position;
  const elVisibility = elStyle.visibility;

  if (elDisplay !== 'none') return el.offsetHeight

  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  el.style.display = 'block';

  const elHeight = el.offsetHeight;

  el.style.display = elDisplay;
  el.style.position = elPosition;
  el.style.visibility = elVisibility;

  return elHeight
}

//

const script = {
  name: 'v-collapse',
  data() {
    return {
      items: [],
      index: -1
    }
  },
  props: {
    panels: Array,
    independent: Boolean
  },
  methods: {
    calculateElementsHeight() {
      this.$el.querySelectorAll('.c-body').forEach((elem, i) => {
        const height = getElemHeight(elem);
        this.items[i].height = height;
        this.items[i].elem = elem;
        elem.style.height = this.items[i].show_ ? `${height}px` : '0px';
      });
    },
    toggle(i) {
      const item = this.items[i];

      if (this.independent) {
        item.show_ ? this.close(i) : this.open(i);
      } else {
        if (item.show_) return this.close(i)

        this.items.forEach(($item, i) => {
          $item.show_ && this.close(i);
        });
        this.open(i);
      }
    },
    open(i) {
      if (i < 0) return

      const item = this.items[i];
      item.show_ = true;
      item.open_ = true;
      setTimeout(() => {
        item.elem.style.height = `${item.height}px`;
      }, 0);
    },
    close(i) {
      if (i < 0) return

      const item = this.items[i];
      item.elem.style.height = '0px';
      item.open_ = false;
      setTimeout(() => {
        item.show_ = false;
      }, 500);
    }
  },
  created() {
    if (!this.panels) return this.items = []

    this.items = this.panels.map(panel => {
      const $panel = Object.assign({}, panel);
      $panel.show_ = panel.show || false;
      $panel.open_ = panel.show || false;
      delete $panel.show;
      return $panel
    });
  },
  mounted() {
    this.calculateElementsHeight();
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-collapse"},_vm._l((_vm.items),function(item,i){return _c('div',{staticClass:"c-item",class:{open: item.open_}},[_c('div',{staticClass:"c-head",on:{"click":function($event){return _vm.toggle(i)}}},[_c('v-icon',{attrs:{"icon":"down-wide","size":"14"}}),_vm._v(" "),_c('span',[_vm._v(_vm._s(item.title))])],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(item.show_),expression:"item.show_"}],staticClass:"c-body"},[_vm._t(item.slot)],2)])}),0)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Collapse = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const script$1 = {
  name: 'editor-svg'
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticStyle:{"display":"none"},attrs:{"xmlns":"http://www.w3.org/2000/icon"}},[_c('symbol',{attrs:{"id":"icon-fa-bold","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68.5.5t67.5.5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-italic","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M384 1662l17-85q6-2 81.5-21.5t111.5-37.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-underline","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-eraser","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-image","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1596 380q28 28 48 76t20 88v1152q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h896q40 0 88 20t76 48zm-444-244v376h376q-10-29-22-41l-313-313q-12-12-41-22zm384 1528v-1024h-416q-40 0-68-28t-28-68v-416h-768v1536h1280zm-128-448v320h-1024v-192l192-192 128 128 384-384zm-832-192q-80 0-136-56t-56-136 56-136 136-56 136 56 56 136-56 136-136 56z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-picture","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-undo","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 1120q0 166-127 451-3 7-10.5 24t-13.5 30-13 22q-12 17-28 17-15 0-23.5-10t-8.5-25q0-9 2.5-26.5t2.5-23.5q5-68 5-123 0-101-17.5-181t-48.5-138.5-80-101-105.5-69.5-133-42.5-154-21.5-175.5-6h-224v256q0 26-19 45t-45 19-45-19l-512-512q-19-19-19-45t19-45l512-512q19-19 45-19t45 19 19 45v256h224q713 0 875 403 53 134 53 333z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-redo","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 640q0 26-19 45l-512 512q-19 19-45 19t-45-19-19-45v-256h-224q-98 0-175.5 6t-154 21.5-133 42.5-105.5 69.5-80 101-48.5 138.5-17.5 181q0 55 5 123 0 6 2.5 23.5t2.5 26.5q0 15-8.5 25t-23.5 10q-16 0-28-17-7-9-13-22t-13.5-30-10.5-24q-127-285-127-451 0-199 53-333 162-403 875-403h224v-256q0-26 19-45t45-19 45 19l512 512q19 19 19 45z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-link","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-cut","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M960 896q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm300 64l507 398q28 20 25 56-5 35-35 51l-128 64q-13 7-29 7-17 0-31-8l-690-387-110 66q-8 4-12 5 14 49 10 97-7 77-56 147.5t-132 123.5q-132 84-277 84-136 0-222-78-90-84-79-207 7-76 56-147t131-124q132-84 278-84 83 0 151 31 9-13 22-22l122-73-122-73q-13-9-22-22-68 31-151 31-146 0-278-84-82-53-131-124t-56-147q-5-59 15.5-113t63.5-93q85-79 222-79 145 0 277 84 83 52 132 123t56 148q4 48-10 97 4 1 12 5l110 66 690-387q14-8 31-8 16 0 29 7l128 64q30 16 35 51 3 36-25 56zm-681-260q46-42 21-108t-106-117q-92-59-192-59-74 0-113 36-46 42-21 108t106 117q92 59 192 59 74 0 113-36zm-85 745q81-51 106-117t-21-108q-39-36-113-36-100 0-192 59-81 51-106 117t21 108q39 36 113 36 100 0 192-59zm178-613l96 58v-11q0-36 33-56l14-8-79-47-26 26q-3 3-10 11t-12 12q-2 2-4 3.5t-3 2.5zm224 224l96 32 736-576-128-64-768 431v113l-160 96 9 8q2 2 7 6 4 4 11 12t11 12l26 26zm704 416l128-64-520-408-177 138q-2 3-13 7z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-align-left","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-align-right","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-align-center","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-896q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h896q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-640q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h640q26 0 45 19t19 45z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-align-justify","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm0-384v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-font","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M789 559l-170 450q33 0 136.5 2t160.5 2q19 0 57-2-87-253-184-452zm-725 1105l2-79q23-7 56-12.5t57-10.5 49.5-14.5 44.5-29 31-50.5l237-616 280-724h128q8 14 11 21l205 480q33 78 106 257.5t114 274.5q15 34 58 144.5t72 168.5q20 45 35 57 19 15 88 29.5t84 20.5q6 38 6 57 0 4-.5 13t-.5 13q-63 0-190-8t-191-8q-76 0-215 7t-178 8q0-43 4-78l131-28q1 0 12.5-2.5t15.5-3.5 14.5-4.5 15-6.5 11-8 9-11 2.5-14q0-16-31-96.5t-72-177.5-42-100l-450-2q-26 58-76.5 195.5t-50.5 162.5q0 22 14 37.5t43.5 24.5 48.5 13.5 57 8.5 41 4q1 19 1 58 0 9-2 27-58 0-174.5-10t-174.5-10q-8 0-26.5 4t-21.5 4q-80 14-188 14z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-unlink","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M503 1271l-256 256q-10 9-23 9-12 0-23-9-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23zm169 41v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm-224-224q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm1264 128q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-334-335q-21-21-42-56l239-18 273 274q27 27 68 27.5t68-26.5l147-146q28-28 28-67 0-40-28-68l-274-275 18-239q35 21 56 42l336 336q84 86 84 204zm-617-724l-239 18-273-274q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l274 274-18 240q-35-21-56-42l-336-336q-84-86-84-204 0-120 85-203l147-146q83-83 203-83 121 0 204 85l334 335q21 21 42 56zm633 84q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23 9-23 23-9h320q14 0 23 9t9 23zm-544-544v320q0 14-9 23t-23 9-23-9-9-23v-320q0-14 9-23t23-9 23 9 9 23zm407 151l-256 256q-11 9-23 9t-23-9q-9-10-9-23t9-23l256-256q10-9 23-9t23 9q9 10 9 23t-9 23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-print","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M448 1536h896v-256h-896v256zm0-640h896v-384h-160q-40 0-68-28t-28-68v-160h-640v640zm1152 64q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128 0v416q0 13-9.5 22.5t-22.5 9.5h-224v160q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-224q-13 0-22.5-9.5t-9.5-22.5v-416q0-79 56.5-135.5t135.5-56.5h64v-544q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v256h64q79 0 135.5 56.5t56.5 135.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-list-ul","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-list-ol","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-122t.5-121v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-indent","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M352 832q0 14-9 23l-288 288q-9 9-23 9-13 0-22.5-9.5t-9.5-22.5v-576q0-13 9.5-22.5t22.5-9.5q14 0 23 9l288 288q9 9 9 23zm1440 480v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-outdent","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M384 544v576q0 13-9.5 22.5t-22.5 9.5q-14 0-23-9l-288-288q-9-9-9-23t9-23l288-288q9-9 23-9 13 0 22.5 9.5t9.5 22.5zm1408 768v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-copy","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1696 384q40 0 68 28t28 68v1216q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-288h-544q-40 0-68-28t-28-68v-672q0-40 20-88t48-76l408-408q28-28 76-48t88-20h416q40 0 68 28t28 68v328q68-40 128-40h416zm-544 213l-299 299h299v-299zm-640-384l-299 299h299v-299zm196 647l316-316v-416h-384v416q0 40-28 68t-68 28h-416v640h512v-256q0-40 20-88t48-76zm956 804v-1152h-384v416q0 40-28 68t-68 28h-416v640h896z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-paste","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M768 1664h896v-640h-416q-40 0-68-28t-28-68v-416h-384v1152zm256-1440v-64q0-13-9.5-22.5t-22.5-9.5h-704q-13 0-22.5 9.5t-9.5 22.5v64q0 13 9.5 22.5t22.5 9.5h704q13 0 22.5-9.5t9.5-22.5zm256 672h299l-299-299v299zm512 128v672q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-544q-40 0-68-28t-28-68v-1344q0-40 28-68t68-28h1088q40 0 68 28t28 68v328q21 13 36 28l408 408q28 28 48 76t20 88z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-code","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-angle-double-down","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1395 864q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23zm0-384q0 13-10 23l-466 466q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l393 393 393-393q10-10 23-10t23 10l50 50q10 10 10 23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-angle-double-up","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1395 1312q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23zm0-384q0 13-10 23l-50 50q-10 10-23 10t-23-10l-393-393-393 393q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l466 466q10 10 10 23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-info-circle","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1152 1376v-160q0-14-9-23t-23-9h-96v-512q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v160q0 14 9 23t23 9h96v320h-96q-14 0-23 9t-9 23v160q0 14 9 23t23 9h448q14 0 23-9t9-23zm-128-896v-160q0-14-9-23t-23-9h-192q-14 0-23 9t-9 23v160q0 14 9 23t23 9h192q14 0 23-9t9-23zm640 416q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-arrows-alt","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1411 541l-355 355 355 355 144-144q29-31 70-14 39 17 39 59v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l144-144-355-355-355 355 144 144q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l144 144 355-355-355-355-144 144q-19 19-45 19-12 0-24-5-40-17-40-59v-448q0-26 19-45t45-19h448q42 0 59 40 17 39-14 69l-144 144 355 355 355-355-144-144q-31-30-14-69 17-40 59-40h448q26 0 45 19t19 45v448q0 42-39 59-13 5-25 5-26 0-45-19z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-quote-left","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M832 960v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136v-704q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136zm896 0v384q0 80-56 136t-136 56h-384q-80 0-136-56t-56-136v-704q0-104 40.5-198.5t109.5-163.5 163.5-109.5 198.5-40.5h64q26 0 45 19t19 45v128q0 26-19 45t-45 19h-64q-106 0-181 75t-75 181v32q0 40 28 68t68 28h224q80 0 136 56t56 136z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-table","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-upload","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-code","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M681 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-header","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1682 1664q-44 0-132.5-3.5t-133.5-3.5q-44 0-132 3.5t-132 3.5q-24 0-37-20.5t-13-45.5q0-31 17-46t39-17 51-7 45-15q33-21 33-140l-1-391q0-21-1-31-13-4-50-4h-675q-38 0-51 4-1 10-1 31l-1 371q0 142 37 164 16 10 48 13t57 3.5 45 15 20 45.5q0 26-12.5 48t-36.5 22q-47 0-139.5-3.5t-138.5-3.5q-43 0-128 3.5t-127 3.5q-23 0-35.5-21t-12.5-45q0-30 15.5-45t36-17.5 47.5-7.5 42-15q33-23 33-143l-1-57v-813q0-3 .5-26t0-36.5-1.5-38.5-3.5-42-6.5-36.5-11-31.5-16-18q-15-10-45-12t-53-2-41-14-18-45q0-26 12-48t36-22q46 0 138.5 3.5t138.5 3.5q42 0 126.5-3.5t126.5-3.5q25 0 37.5 22t12.5 48q0 30-17 43.5t-38.5 14.5-49.5 4-43 13q-35 21-35 160l1 320q0 21 1 32 13 3 39 3h699q25 0 38-3 1-11 1-32l1-320q0-139-35-160-18-11-58.5-12.5t-66-13-25.5-49.5q0-26 12.5-48t37.5-22q44 0 132 3.5t132 3.5q43 0 129-3.5t129-3.5q25 0 37.5 22t12.5 48q0 30-17.5 44t-40 14.5-51.5 3-44 12.5q-35 23-35 161l1 943q0 119 34 140 16 10 46 13.5t53.5 4.5 41.5 15.5 18 44.5q0 26-12 48t-36 22z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fa-strikethrough","viewBox":"0 0 1792 1792"}},[_c('path',{attrs:{"fill":"currentColor","d":"M1760 896q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1728q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h1728zm-1277-64q-28-35-51-80-48-98-48-188 0-181 134-309 133-127 393-127 50 0 167 19 66 12 177 48 10 38 21 118 14 123 14 183 0 18-5 45l-12 3-84-6-14-2q-50-149-103-205-88-91-210-91-114 0-182 59-67 58-67 146 0 73 66 140t279 129q69 20 173 66 58 28 95 52h-743zm507 256h411q7 39 7 92 0 111-41 212-23 56-71 104-37 35-109 81-80 48-153 66-80 21-203 21-114 0-195-23l-140-40q-57-16-72-28-8-8-8-22v-13q0-108-2-156-1-30 0-68l2-37v-44l102-2q15 34 30 71t22.5 56 12.5 27q35 57 80 94 43 36 105 57 59 22 132 22 64 0 139-27 77-26 122-86 47-61 47-129 0-84-81-157-34-29-137-71z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-fullscreen","viewBox":"0 0 1024 1024"}},[_c('path',{attrs:{"fill":"currentColor","d":"M600.224 378.496L818.752 160H704a32 32 0 0 1 0-64h192a31.904 31.904 0 0 1 32 32v192a32 32 0 0 1-64 0V205.248l-218.496 218.528a160.864 160.864 0 0 0-45.28-45.28z m45.28 221.76L864 818.72V704a32 32 0 0 1 64 0v192a31.904 31.904 0 0 1-32 32h-192a32 32 0 0 1 0-64h114.752l-218.528-218.496a160.864 160.864 0 0 0 45.28-45.28z m-221.76 45.248L205.28 864H320a32 32 0 0 1 0 64H128a31.904 31.904 0 0 1-32-32v-192a32 32 0 0 1 64 0v114.752l218.496-218.528a160.864 160.864 0 0 0 45.28 45.28z m-45.248-221.76L160 205.28V320a32 32 0 0 1-64 0V128a31.904 31.904 0 0 1 32-32h192a32 32 0 0 1 0 64H205.248l218.528 218.496a160.864 160.864 0 0 0-45.28 45.28z"}})]),_vm._v(" "),_c('symbol',{attrs:{"id":"icon-exit-fullscreen","viewBox":"0 0 1024 1024"}},[_c('path',{attrs:{"fill":"currentColor","d":"M685.248 640l211.424 211.424-45.248 45.248L640 685.248V800a32 32 0 0 1-64 0v-192a31.904 31.904 0 0 1 32-32h192a32 32 0 0 1 0 64h-114.752z m-346.496 0l-211.424 211.424 45.248 45.248L384 685.248V800a32 32 0 0 0 64 0v-192a31.904 31.904 0 0 0-32-32H224a32 32 0 0 0 0 64h114.752z m0-256L127.328 172.576 172.576 127.36 384 338.752V224a32 32 0 0 1 64 0v192a31.904 31.904 0 0 1-32 32H224a32 32 0 0 1 0-64h114.752z m346.496 0l211.424-211.424-45.248-45.248L640 338.752V224a32 32 0 0 0-64 0v192a31.904 31.904 0 0 0 32 32h192a32 32 0 0 0 0-64h-114.752z"}})])])};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const EditorSvg = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//

const script$2 = {
  name: 'v-icon',
  props: {
    icon: String,
    size: String
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{class:("icon icon-" + _vm.icon),attrs:{"width":_vm.size || 20,"height":_vm.size || 20},on:{"click":function($event){return _vm.$emit('click')}}},[_c('use',{attrs:{"xlink:href":("#icon-" + _vm.icon)}})])};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Icon = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$3 = {
  name: 'v-button',
  props: {
    type: String,
    size: String,
    disabled: Boolean,
    icon: String,
    loading: Boolean,
    submit: Boolean
  },
  components: {
    [Icon.name]: Icon
  },
  computed: {
    customClass() {
      let classes = `v-btn-${this.type || 'primary'}`;
      this.size && (classes += ` v-btn-${this.size}`);
      return classes
    }
  },
  methods: {
    click() {
      if (this.loading) return
      this.$emit('click');
    }
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"v-btn",class:_vm.customClass,attrs:{"type":_vm.submit ? 'submit' : 'button',"disabled":_vm.disabled},on:{"click":_vm.click}},[(!!_vm.icon && !_vm.loading)?_c('v-icon',{attrs:{"icon":_vm.icon}}):_vm._e(),_vm._v(" "),(_vm.loading)?_c('v-icon',{class:{loading: _vm.loading},attrs:{"icon":"refresh"}}):_vm._e(),_vm._v(" "),_vm._t("default")],2)};
var __vue_staticRenderFns__$3 = [];

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Button = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$4 = {
  name: 'v-popup',
  data() {
    return {
      pos: { x: 0, y: 0 },
      startX: 0,
      startY: 0,
      flag: false,
      loading: false
    }
  },
  props: {
    title: String,
    value: Boolean,
    confirm: Function,
    fixed: Boolean,
    okText: String,
    cancelText: String,
    noFooter: Boolean
  },
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon
  },
  computed: {
    transform() {
      return {
        transform: `translateX(${this.pos.x}px) translateY(${this.pos.y}px)`
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
    dragStart(ev) {
      this.startX = ev.pageX - this.pos.x;
      this.startY = ev.pageY - this.pos.y;
      this.flag = true;
    },
    dragging(ev) {
      if (!this.flag) return

      this.pos.x = ev.pageX - this.startX;
      this.pos.y = ev.pageY - this.startY;
    },
    dragEnd() {
      this.flag = false;
    },
    async handleConfirm() {
      if (!this.confirm) {
        this.close();
        return
      }

      if (this.loading) return

      this.loading = true;
      if (await this.confirm()) {
        this.close();
      }
      this.loading = false;
    }
  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.value)?_c('div',{staticClass:"v-popup overlay",class:{fixed: _vm.fixed},on:{"mousemove":_vm.dragging,"mouseup":_vm.dragEnd}},[_c('div',{staticClass:"v-window",style:(_vm.transform)},[_c('div',{staticClass:"title-bar",on:{"mousedown":_vm.dragStart}},[_c('div',{staticClass:"title-name"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('v-button',{attrs:{"type":"text"},on:{"click":_vm.close}},[_c('v-icon',{attrs:{"icon":"close","size":"18"}})],1)],1),_vm._v(" "),_c('div',{staticClass:"win-content"},[_vm._t("default")],2),_vm._v(" "),(!_vm.noFooter)?_c('div',{staticClass:"win-footer"},[_c('div',{staticClass:"right"},[_vm._t("footer",[_c('v-button',{attrs:{"type":"ghost"},on:{"click":_vm.close}},[_vm._v(_vm._s(_vm.cancelText || '取消'))]),_vm._v(" "),_c('v-button',{attrs:{"loading":_vm.loading},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.okText || '确认'))])])],2)]):_vm._e()])]):_vm._e()};
var __vue_staticRenderFns__$4 = [];

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Popup = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$5 = {
  name: 'v-html-editor',
  data() {
    return {
      toggleCmds: ['bold', 'italic', 'underline', 'strikeThrough'],
      headList: ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'],
      currentBlock: 'div',
      sourceMode: false,
      sourceCode: '',
      contentHTML: '',
      bShowOverlay: false,
      domEditor: null,
      domSource: null
    }
  },
  props: {
    html: String
  },
  components: {
    [EditorSvg.name]: EditorSvg,
    [Button.name]: Button,
    [Popup.name]: Popup
  },
  watch: {
    bShowOverlay(val) {
      document.body.classList.toggle('overhidden', val);
    },
    html(val) {
      editorContent.innerHTML = val;
    }
  },
  methods: {
    formatDoc(cmd, value) {
      if (this.toggleCmds.includes(cmd)) {
        this.$refs[cmd].$el.classList.toggle('active');
      }
      document.execCommand(cmd, false, value);
      editorContent.focus();
    },
    removeFormat() {
      setTimeout(() => {
        document.execCommand('removeFormat', false, null);

        let elems = this.domEditor.querySelectorAll('*');
        [].forEach.call(elems, elem => {
          elem.removeAttribute('style');
          elem.removeAttribute('class');
        });

        editorContent.focus();
      }, 0);
    },
    insertLink() {
      const link = prompt('输入链接地址', 'http://');
      if (link) {
        this.formatDoc('createLink', link);
      }
    },
    insertImage() {
      var src = prompt('图片地址', '');
      if (src) {
        this.formatDoc('insertImage', src);
      }
    },
    checkStatus() {
      this.currentBlock = document.queryCommandValue('formatBlock');
      this.toggleCmds.forEach(cmd => {
        this.$refs[cmd].$el.classList.toggle('active', document.queryCommandState(cmd));
      });
    },
    toggleSource() {
      this.sourceMode = !this.sourceMode;
      if (this.sourceMode) {
        this.sourceCode = html_beautify(editorContent.innerHTML);
      }
    },
    preview() {
      this.bShowOverlay = true;
      this.contentHTML = editorContent.innerHTML;
    }
  },
  mounted() {
    this.html && (editorContent.innerHTML = this.html);
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-html-editor"},[_c('editor-svg'),_vm._v(" "),(_vm.bShowOverlay)?_c('v-popup',{attrs:{"title":"预览结果"},model:{value:(_vm.bShowOverlay),callback:function ($$v) {_vm.bShowOverlay=$$v;},expression:"bShowOverlay"}},[_c('div',{staticClass:"content",attrs:{"slot":"content"},domProps:{"innerHTML":_vm._s(_vm.contentHTML)},slot:"content"})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"e-toolbar"},[_c('v-button',{attrs:{"type":"text","title":"撤销","icon":"fa-undo"},on:{"click":function($event){return _vm.formatDoc('undo')}}}),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"重做","icon":"fa-redo"},on:{"click":function($event){return _vm.formatDoc('redo')}}}),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"清除格式","icon":"fa-eraser"},on:{"click":_vm.removeFormat}}),_vm._v(" "),_c('v-button',{ref:"bold",attrs:{"type":"text","title":"加粗","icon":"fa-bold"},on:{"click":function($event){return _vm.formatDoc('bold')}}}),_vm._v(" "),_c('v-button',{ref:"italic",attrs:{"type":"text","title":"斜体","icon":"fa-italic"},on:{"click":function($event){return _vm.formatDoc('italic')}}}),_vm._v(" "),_c('v-button',{ref:"underline",attrs:{"type":"text","title":"下划线","icon":"fa-underline"},on:{"click":function($event){return _vm.formatDoc('underline')}}}),_vm._v(" "),_c('v-button',{ref:"strikeThrough",attrs:{"type":"text","title":"删除线"},on:{"click":function($event){return _vm.formatDoc('strikeThrough')}}},[_c('del',[_vm._v("abc")])]),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"缩退","icon":"fa-outdent"},on:{"click":function($event){return _vm.formatDoc('outdent')}}}),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"缩进","icon":"fa-indent"},on:{"click":function($event){return _vm.formatDoc('indent')}}}),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"超链接","icon":"fa-link"},on:{"click":_vm.insertLink}}),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"分隔线"},on:{"click":function($event){return _vm.formatDoc('insertHorizontalRule')}}},[_vm._v("—")]),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"图片","icon":"fa-picture"},on:{"click":_vm.insertImage}}),_vm._v(" "),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentBlock),expression:"currentBlock"}],staticClass:"select",on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.currentBlock=$event.target.multiple ? $$selectedVal : $$selectedVal[0];},function($event){return _vm.formatDoc('formatBlock',$event.target.value)}]}},_vm._l((_vm.headList),function(head){return _c('option',{domProps:{"value":head}},[_vm._v(_vm._s(head))])}),0),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"源码"},on:{"click":_vm.toggleSource}},[_vm._v("HTML")]),_vm._v(" "),_c('v-button',{attrs:{"type":"text","title":"预览"},on:{"click":_vm.preview}},[_vm._v("预览")]),_vm._v(" "),_c('ul')],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.sourceMode),expression:"!sourceMode"}],staticClass:"e-content",attrs:{"id":"editorContent","contenteditable":""},on:{"click":_vm.checkStatus,"paste":_vm.removeFormat,"keyup":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }return _vm.checkStatus($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }return _vm.checkStatus($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"left",37,$event.key,["Left","ArrowLeft"])){ return null; }if('button' in $event && $event.button !== 0){ return null; }return _vm.checkStatus($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"right",39,$event.key,["Right","ArrowRight"])){ return null; }if('button' in $event && $event.button !== 2){ return null; }return _vm.checkStatus($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.checkStatus($event)}]}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.sourceMode),expression:"sourceMode"}],staticClass:"e-source"},[_c('pre',[_c('code',[_vm._v(_vm._s(_vm.sourceCode))])])])],1)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const HtmlEditor = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//

const script$6 = {
  name: 'v-img-reflex',
  props: {
    src: String,
    alt: String
  },
  mounted() {
    this.$el.querySelector('.reflex-wrap .reflex').style.backgroundImage = `url(${this.src})`;
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-img-reflex"},[_c('div',{staticClass:"img-wrap"},[_c('img',{attrs:{"src":_vm.src,"alt":_vm.alt}})]),_vm._v(" "),_vm._m(0)])};
var __vue_staticRenderFns__$6 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"reflex-wrap"},[_c('div',{staticClass:"reflex"}),_vm._v(" "),_c('div',{staticClass:"reflex-gradient"})])}];

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const ImgReflex = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$7 = {
  name: 'v-select',
  data() {
    return {
      selfClicked: false,
      selected: this.multiple ? [] : {},
      items: JSON.parse(JSON.stringify(this.source)),
      filterText: '',
      bShowCandidates: false,
      innerUpdate: false,
      pos: '',
      open: ''
    }
  },
  components: {
    [Icon.name]: Icon
  },
  computed: {
    filteredItems() {
      if (this.filterText === '') return this.items
      return this.items.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()))
    }
  },
  props: {
    value: [String, Number, Array, Object],
    source: Array,
    disabled: Boolean,
    multiple: Boolean,
    searchable: Boolean,
    placeholder: String,
    searchPlaceholder: String,
    max: Number,
    emitItem: Boolean,
    clearable: Boolean
  },
  watch: {
    source(val) {
      //Watch source for requesting data from server asynchronously
      this.items = JSON.parse(JSON.stringify(val));
      this.updateSelected(this.value);
    },
    value: {
      handler: 'updateSelected',
      immediate: true
    }
  },
  methods: {
    updateSelected(val) {
      if (this.innerUpdate) {
        this.innerUpdate = false;
        return
      }

      let match;
      if (Array.isArray(val)) {
        match = [];
        this.items.forEach(item => {
          item.selected = false;
          if (val.includes(item.value)) {
            item.selected = true;
            match.push({
              name: item.name,
              value: item.value
            });
          }

          if (item.children) {
            item.children.forEach(child => {
              child.selected = false;
              if (val.includes(child.value)) {
                child.selected = true;
                match.push({
                  name: child.name,
                  value: child.value
                });
              }
            });
          }
        });
      } else {
        match = {};
        this.items.forEach(item => {
          item.selected = false;
          if (item.value === val) {
            item.selected = true;
            match = { name: item.name, value: item.value };
          }

          if (item.children) {
            item.children.forEach(child => {
              child.selected = false;
              if (child.value === val) {
                child.selected = true;
                match = { name: child.name, value: child.value };
              }
            });
          }
        });
      }
      this.selected = JSON.parse(JSON.stringify(match));
    },
    showCandidates() {
      this.selfClicked = true;
      if (this.disabled) return
      if (this.bShowCandidates) return
      this.bShowCandidates = true;

      let items = 0;
      this.filteredItems.forEach(item => {
        items += item.children ? (item.children.length + 1) : 1;
      });
      const candidatesHeight = Math.min((this.searchable ? (items + 1) : items) * 32, 320);
      const bottomSpace = window.innerHeight - this.$el.getBoundingClientRect().bottom;
      this.pos = bottomSpace < candidatesHeight ? 'top' : 'bottom';

      setTimeout(() => this.open = 'open', 40);
    },
    hideCandidates() {
      this.open = '';
      setTimeout(() => {
        this.pos = '';
        this.bShowCandidates = false;
      }, 400);
    },
    toggle(item) {
      if (this.multiple) {
        item.selected = !item.selected;

        if (item.selected) {
          if (this.max && this.selected.length >= this.max) {
            this.warn(`最多只能选择${this.max}个`);
            item.selected = false;
          } else {
            this.selected.push(item);
          }
        } else {
          this.selected = this.selected.filter(val => {
            return val.value !== item.value
          });
        }
        this.innerUpdate = true;
        this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value));
      } else {
        this.items.forEach(current => {
          current.selected = false;

          if (current.children) {
            current.children.forEach(child => child.selected = false);
          }
        });
        item.selected = true;
        this.selected = item;
        this.hideCandidates();
        this.innerUpdate = true;
        this.$emit('input', this.emitItem ? this.selected : this.selected.value);
      }
    },
    clearSelected() {
      this.selected = {};
      this.$emit('input', this.emitItem ? this.selected : this.selected.value);
    },
    remove(select, index) {
      this.selected.splice(index, 1);

      this.items.forEach(item => {
        if (item.value === select.value) {
          item.selected = false;
        } else if (item.children) {
          item.children.forEach(child => {
            if (child.value === select.value) {
              child.selected = false;
            }
          });
        }
      });

      this.innerUpdate = true;
      this.$emit('input', this.emitItem ? this.selected : this.selected.map(s => s.value));
    }
  },
  mounted() {
    window.addEventListener('click', () => {
      // 当点击组件之外的区域（包括其他Select组件）时，隐藏下拉列表；点击组件自身时不做任何处理
      if (!this.selfClicked) this.hideCandidates();
      this.selfClicked = false;
    });
  }
};

/* script */
const __vue_script__$7 = script$7;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-select",on:{"click":_vm.showCandidates}},[_c('div',{staticClass:"selected layout-lr",attrs:{"disabled":_vm.disabled}},[(_vm.disabled)?_c('div',{staticClass:"layer-disabled"}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"l"},[(_vm.multiple)?[_vm._l((_vm.selected),function(s,i){return _c('span',{staticClass:"s-tag"},[_c('span',{staticClass:"tag-name"},[_vm._v(_vm._s(s.name))]),_vm._v(" "),_c('v-icon',{attrs:{"icon":"close"},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.remove(s,i)}}})],1)}),_vm._v(" "),(!_vm.selected.length)?_c('span',{staticClass:"placeholder"},[_vm._v(_vm._s(_vm.placeholder || '请选择'))]):_vm._e()]:[_c('input',{staticClass:"input",attrs:{"placeholder":_vm.placeholder || '请选择',"readonly":""},domProps:{"value":_vm.selected.name}}),_vm._v(" "),(_vm.clearable && _vm.selected.name)?_c('v-icon',{staticClass:"icon-clear",attrs:{"icon":"close","size":"16"},nativeOn:{"click":function($event){$event.stopPropagation();return _vm.clearSelected($event)}}}):_vm._e()]],2),_vm._v(" "),_c('div',{staticClass:"r"},[_c('v-icon',{class:{reverse: !_vm.open},attrs:{"icon":"down-wide"}})],1)]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.bShowCandidates),expression:"bShowCandidates"}],class:("candidates " + _vm.pos + " " + _vm.open)},[(_vm.searchable)?_c('div',{staticClass:"item-search"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.filterText),expression:"filterText"}],staticClass:"input",attrs:{"placeholder":_vm.searchPlaceholder || '搜索'},domProps:{"value":(_vm.filterText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.filterText=$event.target.value;}}})]):_vm._e(),_vm._v(" "),_c('ul',{staticClass:"list"},_vm._l((_vm.filteredItems),function(i){return _c('li',{attrs:{"title":i.name},on:{"click":function($event){$event.stopPropagation();return _vm.toggle(i)}}},[_c('div',{staticClass:"i-title",class:{focus: i.selected}},[_c('span',{staticClass:"t-name"},[_vm._v(_vm._s(i.name))]),(i.selected)?_c('v-icon',{attrs:{"icon":"check"}}):_vm._e()],1),_vm._v(" "),(i.children && i.children.length)?_c('ul',{staticClass:"sub-list"},_vm._l((i.children),function(child){return _c('li',{attrs:{"title":child.name},on:{"click":function($event){$event.stopPropagation();return _vm.toggle(child)}}},[_c('div',{staticClass:"i-title",class:{focus: child.selected}},[_c('span',{staticClass:"t-name"},[_vm._v(_vm._s(child.name))]),(child.selected)?_c('v-icon',{attrs:{"icon":"check"}}):_vm._e()],1)])}),0):_vm._e()])}),0)])])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  const __vue_inject_styles__$7 = undefined;
  /* scoped */
  const __vue_scope_id__$7 = undefined;
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Select = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    undefined,
    undefined,
    undefined
  );

//

const data = [
  {
    name: "北京市",
    cities: ["西城区", "东城区", "崇文区", "宣武区", "朝阳区", "海淀区", "丰台区", "石景山区", "门头沟区", "房山区", "通州区", "顺义区", "大兴区", "昌平区", "平谷区", "怀柔区", "密云县", "延庆县"]
  },
  {
    name: "天津市",
    cities: ["和平区", "河东区", "河西区", "南开区", "河北区", "红桥区", "塘沽区", "汉沽区", "大港区", "东丽区", "西青区", "北辰区", "津南区", "武清区", "宝坻区", "静海县", "宁河县", "蓟县", "开发区"]
  },
  { name: "河北省", cities: ["石家庄市", "秦皇岛市", "廊坊市", "保定市", "邯郸市", "唐山市", "邢台市", "衡水市", "张家口市", "承德市", "沧州市"] },
  { name: "山西省", cities: ["太原市", "大同市", "长治市", "晋中市", "阳泉市", "朔州市", "运城市", "临汾市", "晋城市", "忻州市", "吕梁市"] },
  { name: "内蒙古", cities: ["呼和浩特市", "鄂尔多斯市", "乌海市", "赤峰市", "通辽市", "呼伦贝尔市", "巴彦淖尔市", "乌兰察布市", "锡林郭勒盟", "兴安盟", "阿拉善盟", "包头市"] },
  { name: "辽宁省", cities: ["大连市", "沈阳市", "鞍山市", "抚顺市", "营口市", "锦州市", "丹东市", "朝阳市", "辽阳市", "阜新市", "铁岭市", "盘锦市", "本溪市", "葫芦岛市"] },
  { name: "吉林省", cities: ["长春市", "吉林市", "四平市", "辽源市", "通化市", "延吉", "白城市", "白山市", "松原市", "延边州"] },
  { name: "黑龙江", cities: ["哈尔滨市", "齐齐哈尔市", "鸡西市", "双鸭山市", "大庆市", "伊春市", "牡丹江市", "鹤岗市", "佳木斯市", "七台河市", "绥化市", "黑河市", "大兴安岭地区"] },
  {
    name: "上海市",
    cities: ["黄浦区", "杨浦区", "徐汇区", "静安区", "卢湾区", "普陀区", "闸北区", "虹口区", "长宁区", "宝山区", "闵行区", "嘉定区", "浦东新区", "金山区", "松江区", "青浦区", "崇明县", "奉贤区", "南汇区"]
  },
  { name: "江苏省", cities: ["南京市", "苏州市", "无锡市", "常州市", "扬州市", "徐州市", "南通市", "镇江市", "泰州市", "淮安市", "连云港市", "宿迁市", "盐城市"] },
  { name: "浙江省", cities: ["杭州市", "金华市", "宁波市", "温州市", "嘉兴市", "绍兴市", "丽水市", "湖州市", "台州市", "舟山市", "衢州市"] },
  { name: "安徽省", cities: ["合肥市", "马鞍山市", "蚌埠市", "黄山市", "芜湖市", "淮南市", "淮北市", "铜陵市", "阜阳市", "宣城市", "安庆市", "滁州市", "宿州市", "巢湖市", "六安市", "亳州市", "池州市"] },
  { name: "福建省", cities: ["福州市", "厦门市", "泉州市", "漳州市", "南平市", "龙岩市", "莆田市", "三明市", "宁德市"] },
  { name: "江西省", cities: ["南昌市", "景德镇市", "抚州市", "上饶市", "萍乡市", "九江市", "吉安市", "宜春市", "鹰潭市", "新余市", "赣州市"] },
  { name: "山东省", cities: ["青岛市", "济南市", "淄博市", "烟台市", "泰安市", "临沂市", "日照市", "莱芜市", "德州市", "威海市", "东营市", "荷泽市", "济宁市", "潍坊市", "枣庄市", "聊城市", "滨州市"] },
  {
    name: "河南省",
    cities: ["郑州市", "洛阳市", "开封市", "平顶山市", "濮阳市", "安阳市", "鹤壁市", "许昌市", "漯河市", "南阳市", "信阳市", "周口市", "新乡市", "焦作市", "三门峡市", "商丘市", "驻马店市"]
  },
  { name: "湖北省", cities: ["武汉市", "襄樊市", "孝感市", "十堰市", "荆州市", "黄石市", "宜昌市", "黄冈市", "恩施州", "鄂州市", "荆门市", "随州市", "咸宁市"] },
  { name: "湖南省", cities: ["长沙市", "湘潭市", "岳阳市", "株洲市", "怀化市", "永州市", "益阳市", "张家界市", "常德市", "衡阳市", "湘西州", "邵阳市", "娄底市", "郴州市"] },
  {
    name: "广东省",
    cities: ["广州市", "深圳市", "东莞市", "佛山市", "珠海市", "汕头市", "韶关市", "江门市", "梅州市", "揭阳市", "中山市", "河源市", "惠州市", "茂名市", "湛江市", "阳江市", "潮州市", "云浮市", "汕尾市", "肇庆市", "大岭山镇", "常平镇", "清远市"]
  },
  { name: "广西", cities: ["南宁市", "桂林市", "柳州市", "梧州市", "北海市", "防城港市", "钦州市", "来宾市", "贵港市", "玉林市", "贺州市", "百色市", "河池市", "崇左市"] },
  { name: "海南省", cities: ["海口市", "三亚市"] },
  {
    name: "重庆市",
    cities: ["渝中区", "大渡口区", "江北区", "沙坪坝区", "九龙坡区", "南岸区", "北碚区", "万盛区", "双桥区", "渝北区", "巴南区", "万州区", "涪陵区", "黔江区", "长寿区", "綦江县", "潼南县", "铜梁县", "大足县", "荣昌县", "璧山县", "梁平县", "城口县", "丰都县", "垫江县", "武隆县", "忠县", "开县", "云阳县", "奉节县", "巫山县", "巫溪县", "石柱县", "秀山县", "酉阳县", "彭水县", "江津市", "合川市", "永川市", "南川市"]
  },
  {
    name: "四川省",
    cities: ["成都市", "泸州市", "达州市", "南充市", "乐山市", "绵阳市", "广元市", "德阳市", "内江市", "遂宁市", "宜宾市", "眉山市", "雅安市", "巴中市", "自贡市", "攀枝花市", "资阳市", "广安市", "阿坝州", "甘孜州", "凉山州"]
  },
  { name: "贵州省", cities: ["贵阳市", "六盘水市", "遵义市", "安顺市", "铜仁地区", "黔西南州", "毕节地区", "黔东南州", "黔南州"] },
  { name: "云南省", cities: ["昆明市", "曲靖市", "保山市", "丽江市", "昭通市", "玉溪市", "临沧市", "思茅市", "文山州", "红河州", "楚雄市", "西双版纳州", "大理州", "德宏州", "怒江州", "迪庆州"] },
  { name: "西藏", cities: ["拉萨市", "林芝地区", "日喀则地区", "昌都地区", "山南地区", "那曲地区", "阿里地区"] },
  { name: "陕西省", cities: ["西安市", "咸阳市", "延安市", "汉中市", "榆林市", "宝鸡市", "铜川市", "渭南市", "安康市", "商洛市"] },
  { name: "甘肃省", cities: ["兰州市", "金昌市", "嘉峪关市", "天水市", "武威市", "张掖市", "平凉市", "酒泉市", "庆阳市", "定西市", "陇南市", "临夏州", "甘南州"] },
  { name: "青海省", cities: ["黄南州", "海南州", "西宁市", "海东地区", "海西州", "海北州", "果洛州", "玉树州"] },
  { name: "宁夏", cities: ["银川市", "石嘴山市", "吴忠市", "固原市", "中卫市"] },
  { name: "新疆", cities: ["乌鲁木齐市", "哈密地区", "喀什地区", "和田地区", "巴音郭楞州", "昌吉州", "伊犁州", "塔城地区", "阿勒泰地区", "克拉玛依市", "博尔塔拉州", "阿克苏地区", "克孜勒苏柯尔克孜州"] },
  { name: "香港", cities: ["九龙", "新界", "香港岛"] },
  { name: "澳门", cities: ["澳门半岛", "澳门离岛市"] },
  {
    name: "台湾省",
    cities: ["台北市", "台北县市", "台东县", "台中市", "台中县市", "高雄市", "高雄县市", "新竹市", "新竹县", "宜兰县", "桃园县", "云林县", "彰化县", "台南市", "台南县市", "连江县市", "嘉义市", "基隆市", "花莲县", "嘉义县", "金门县", "苗栗县", "南投县", "澎湖县", "屏东县"]
  }
];
const script$8 = {
  name: 'v-select-city',
  data () {
    const provinces = [
      { name: '省/直辖市', value: -1 }
    ], indexes = {};
    data.forEach((item, i) => {
      indexes[item.name] = i;
      provinces.push({ name: item.name, value: item.name });
    });

    const value = this.value || [-1, '先选择省'];
    return {
      provinces,
      province: value[0],
      city: value[1],
      indexes
    }
  },
  computed: {
    cities() {
      return Number(this.province) === -1
        ? [{ name: '先选择省', value: '先选择省' }]
        : data[this.indexes[this.province]].cities.map(city => ({ name: city, value: city }))
    }
  },
  props: {
    value: Array
  },
  components: {
    [Select.name]: Select
  },
  watch: {
    currentProvince(val) {
      this.province = val;
    },
    currentCity (val) {
      setTimeout(() => this.city = val, 60);
    },
    province (val) {
      this.city = this.cities[0].value;
      this.$emit('input', [val, this.city]);
    },
    city (val) {
      this.$emit('input', [this.province, val]);
    }
  }
};

/* script */
const __vue_script__$8 = script$8;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-select-city"},[_c('v-select',{attrs:{"source":_vm.provinces},model:{value:(_vm.province),callback:function ($$v) {_vm.province=$$v;},expression:"province"}}),_vm._v(" "),_c('v-select',{attrs:{"source":_vm.cities},model:{value:(_vm.city),callback:function ($$v) {_vm.city=$$v;},expression:"city"}})],1)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  const __vue_inject_styles__$8 = undefined;
  /* scoped */
  const __vue_scope_id__$8 = undefined;
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const SelectCity = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$9 = {
  name: 'v-step',
  props: {
    cur: {
      type: Number,
      'default': 0
    },
    steps: Array
  },
  components: {
    [Icon.name]: Icon
  }
};

/* script */
const __vue_script__$9 = script$9;

/* template */
var __vue_render__$9 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-step"},_vm._l((_vm.steps),function(step,i){return _c('div',{staticClass:"step-item"},[_c('div',{staticClass:"i-content",class:{finished: i < _vm.cur, processing: i === _vm.cur, wait: i > _vm.cur}},[(step.icon)?_c('v-icon',{attrs:{"icon":step.icon,"size":"16"}}):_c('span',{staticClass:"default-icon"},[(i < _vm.cur)?_c('v-icon',{attrs:{"icon":"check"}}):[_vm._v(_vm._s(i+1))]],2),_vm._v("\n      "+_vm._s(step.title))],1),_vm._v(" "),(i < _vm.steps.length-1)?_c('div',{staticClass:"i-line",class:{success: i < _vm.cur}}):_vm._e()])}),0)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  const __vue_inject_styles__$9 = undefined;
  /* scoped */
  const __vue_scope_id__$9 = undefined;
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Step = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    undefined,
    undefined,
    undefined
  );

//

const script$a = {
  name: 'v-tag',
  data() {
    return {
      tag: '',
      isShowCandidates: false
    }
  },
  props: {
    value: {
      type: Array,
      'default': () => []
    },
    tags: Array,
    max: {
      type: Number,
      'default': 5
    }
  },
  components: {
    [Icon.name]: Icon
  },
  methods: {
    addCustom(ev) {
      ev.preventDefault();
      if (this.add({ name: this.tag, custom: true }, this.tags.findIndex(t => t.name === this.tag))) this.tag = '';
    },
    add(tag, index) {
      if (this.value.length >= this.max) {
        this.warn(`最多只能添加${this.max}个标签`);
        return
      }

      if (this.value.findIndex(t => t.name === tag.name) >= 0) {
        this.warn('该标签已存在');
        return
      }

      this.value.push(tag);
      index >= 0 && this.tags.splice(index, 1);
      return true
    },
    remove(tag, index) {
      this.value.splice(index, 1);
      if (tag.custom) return

      if (this.tags.findIndex(t => t.name === tag.name) < 0) this.tags.push(tag);
    }
  },
  mounted() {
    window.addEventListener('click', () => this.isShowCandidates = false);
  }
};

/* script */
const __vue_script__$a = script$a;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"v-tag",on:{"click":function($event){$event.stopPropagation();}}},[_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.tag),expression:"tag",modifiers:{"trim":true}}],staticClass:"input",domProps:{"value":(_vm.tag)},on:{"focus":function($event){_vm.isShowCandidates = true;},"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.addCustom($event)},"input":function($event){if($event.target.composing){ return; }_vm.tag=$event.target.value.trim();},"blur":function($event){return _vm.$forceUpdate()}}}),_vm._v(" "),_c('div',{staticClass:"t-selected tag-list"},_vm._l((_vm.value),function(t,i){return _c('a',{staticClass:"tag tag-black",on:{"click":function($event){return _vm.remove(t, i)}}},[_vm._v(_vm._s(t.name))])}),0),_vm._v(" "),(_vm.tags.length)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isShowCandidates),expression:"isShowCandidates"}],staticClass:"t-candidates tag-list"},[_vm._l((_vm.tags),function(t,i){return _c('a',{staticClass:"tag tag-white",on:{"click":function($event){return _vm.add(t, i)}}},[_vm._v(_vm._s(t.name))])}),_vm._v(" "),_c('v-icon',{attrs:{"icon":"close"},nativeOn:{"click":function($event){_vm.isShowCandidates = false;}}})],2):_vm._e()])};
var __vue_staticRenderFns__$a = [];

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const Tag = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

const install = function (Vue) {
  if (!Vue || install.installed) return

  const Components = [
    Collapse,
    HtmlEditor,
    ImgReflex,
    SelectCity, Step,
    Tag
  ];

  Components.forEach(c => Vue.component(c.name, c));
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const extension = { install };

export default extension;
export { Collapse, HtmlEditor, ImgReflex, SelectCity, Step, Tag };

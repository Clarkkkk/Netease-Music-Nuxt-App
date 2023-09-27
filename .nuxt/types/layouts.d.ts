import { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = string
declare module "../../node_modules/.pnpm/nuxt@3.7.3_@types+node@20.7.0_eslint@8.42.0_rollup@2.79.1_sass@1.62.1_typescript@5.1.6_vue-tsc@1.8.11/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
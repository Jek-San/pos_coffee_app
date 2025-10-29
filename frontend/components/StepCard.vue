<!-- components/StepCard.vue -->
<template>
  <div
    class="group relative overflow-hidden bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/90 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20 hover:border-slate-600/50"
  >
    <!-- Step Number Badge -->
    <div
      class="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
    >
      {{ step }}
    </div>

    <div class="flex items-start justify-between ml-12">
      <div class="flex items-start space-x-4 flex-1">
        <!-- Icon -->
        <div
          class="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center group-hover:bg-slate-700/70 transition-colors duration-300"
        >
          <component :is="iconComponent" class="w-6 h-6 text-slate-300" />
        </div>

        <!-- Content -->
        <div class="flex-1">
          <div class="flex items-center space-x-3 mb-2">
            <h3
              class="text-lg font-semibold text-white group-hover:text-slate-50 transition-colors duration-300"
            >
              {{ title }}
            </h3>
            <div
              v-if="done"
              class="flex items-center space-x-1 text-emerald-400"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="text-sm font-medium">Complete</span>
            </div>
          </div>
          <p class="text-slate-400 text-sm leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- Action Button -->
      <div class="flex-shrink-0 ml-4">
        <NuxtLink
          :to="to"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r transition-all duration-200 rounded-lg shadow-md hover:shadow-lg group-hover:scale-105"
          :class="[
            done
              ? 'from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800'
              : 'from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
          ]"
          :target="external ? '_blank' : undefined"
        >
          {{ buttonText }}
          <svg
            v-if="external"
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
          <svg
            v-else
            class="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Hover Effect Gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    ></div>
  </div>
</template>

<script setup>
// import { computed } from "vue"
import { Palette, LayoutGrid, Menu, Eye, Info } from "lucide-vue-next"

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  to: String,
  done: Boolean,
  external: Boolean,
  icon: String,
})

const buttonText = computed(() => {
  if (props.external) return "Preview"
  return props.done ? "Update" : "Start"
})

const iconComponent = computed(() => {
  const icons = {
    palette: Palette,
    grid: LayoutGrid,
    menu: Menu,
    eye: Eye,
  }
  return icons[props.icon] || Info
})
</script>

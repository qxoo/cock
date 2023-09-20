<template>
  <div v-if="show404" class="not-found">
    <h1>Oshibka404: Stranitsa not found(</h1>
  </div>
  <div class="wrapper">
    <div class="wrapper_nav">
      <drinkButton
        v-for="(items, idx) in drinkStore.drinks"
        :key="idx"
        @click="setSelectedDrink(idx)"
        :class="{ selected: idx === ifSelected }"
        style="cursor: default;"
        >{{ items.strDrink }}</drinkButton
      >
    </div>
    <drinkContent
    v-if="!show404"
      class="wrapper_content"
      :drink="drinkStore?.drinks[ifSelected]?.strDrink"
      :category="drinkStore?.drinks[ifSelected]?.strCategory"
      :alcoholic="drinkStore?.drinks[ifSelected]?.strAlcoholic"
      :glass="drinkStore?.drinks[ifSelected]?.strGlass"
      :instructions="drinkStore?.drinks[ifSelected]?.strInstructions"
      :drink-img="drinkStore?.drinks[ifSelected]?.strDrinkThumb"
      :ingredients="getIngredientList(ifSelected)"
      :measures="getMeasureList(ifSelected)"
    ></drinkContent>
  </div>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from '@/stores/store'
import drinkButton from './components/drinkButton.vue'
import drinkContent from './components/drinkContent.vue'

const drinkStore = useStore()
onMounted(async () => {
  await drinkStore.getAllDrinks()
})
const show404 = ref(false)
const ifSelected = ref(0)
const setSelectedDrink = (id: any) => {
  ifSelected.value = id
}
const getIngredientList = (idx: any) => {
  const ingredients = ref([])
  const currentItem = drinkStore?.drinks[idx]
  if (currentItem) {
    Object.keys(currentItem).forEach((key) => {
      if (key.includes('strIngredient')) {
        if (currentItem[key]) ingredients?.value?.push(currentItem[key])
      }
    })
  }
  return ingredients.value
}
const getMeasureList = (idx: any) => {
  const measures = ref([])
  const currentItem = drinkStore?.drinks[idx]
  if (currentItem) {
    Object.keys(currentItem).forEach((key) => {
      if (key.includes('strMeasure')) {
        if (currentItem[key]) measures?.value?.push(currentItem[key])
      }
    })
  }

  return measures.value
}
console.log(window.location.pathname)
watch(
  () => window.location.pathname,
  () => {
    if (window.location.pathname === '/') {
      show404.value = false
      console.log(show404.value)
    } else {
      show404.value = true
      console.log(show404.value)

    }
  },
  {
    immediate: true
  }
)

defineComponent({
  name: 'App'
})
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: large;
  overflow: hidden;
}
.wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  height: 100vh;
  overflow: hidden;
  &_nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 20%;
    padding: 3%;
    border-right: 1px solid black;
    height: 100vh;
    font-size: 14px;
  }
  &_content {
    width: 100%;
    padding: 3%;
    max-width: 80%;
  }
}
.selected {
  padding: 3px 10px;
  border: 1px solid lightgray;
  background-color: rgba(225, 225, 225, 0.659);
}
.not-found {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background: whitesmoke;
}
</style>

<template>
  <div class="root">
    <div class="root_drink">
      <h2>{{ props.drink }}</h2>
      <img
        v-if="props.drinkImg"
        loading="lazy"
        :src="props.drinkImg"
        alt="404 Not Found"
        class="root_drink_Thumb"
      />
      <div v-if="props.drink" class="root_drink_text">
        <p>Category: {{ props.category }}</p>
        <p>Type: {{ props.alcoholic }}</p>
        <p>Glass: {{ props.glass }}</p>
        <p>Instructions: {{ props.instructions }}</p>
      </div>
    </div>
    <div v-if="props.ingredients" class="root_ingredients">
      List of ingredients:
      <div v-for="(measures, idx) in props.measures" :key="idx">
        {{ measures }} {{ props.ingredients[idx] }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  drink: string
  category: string
  alcoholic: string
  glass: string
  instructions: string
  drinkImg: string
  measures: []
  ingredients: []
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.root {
  &_drink {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &_Thumb {
      width: 300px;
      height: 300px;
      aspect-ratio: 1;
      object-fit: cover;
      border: 1px solid gray;
    }
    &_text {
      width: calc(100% - 310px);
    }
  }
}
@media screen and (min-width: 800px) {
  .root {
    &_drink {
      &_Thumb {
        position: absolute;
        right: 3%;
      }
    }
  }
}
@media screen and (max-width: 799px) {
  .root {
    &_drink {
      &_text {
        font-size: small;
        width: 100%;
      }
      &_Thumb {
        width: 200px;
        height: 200px;
      }
    }
    &_ingredients {
      font-size: small;
    }
  }
}
</style>

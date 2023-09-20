import axios from 'axios'
import { defineStore } from 'pinia'
interface cocktailItem {
	idDrink: string
  strDrinkthumb: string
  strDrink: string
  strCategory: string
  strAlcoholic: string
  strGlass: string
  strInstructions: string
  strMeasures: []
  strIngredients: []
}
interface cocktailStore {
  drinks: cocktailItem[]
  isLoading: boolean
  // targetCocktail: {
  // 	value?: cocktailItem
  // 	index?: number
  // }
}

export const useStore = defineStore('store', {
  state: (): cocktailStore => {
    return {
      isLoading: true,
      drinks: []
      // targetCocktail: {
      // 	value: undefined,
      // 	index: undefined
      // }
    }
  },
  actions: {
    async getAllDrinks(): Promise<cocktailItem[] | undefined> {
      this.isLoading = true
      try {
        const response = await Promise.all([
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007'),
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11000'),
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222'),
          axios.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17203')
        ])
        this.drinks = response
          .map((item) => item.data.drinks)
          .reduce((acc, val) => {
            acc = [...acc, ...val]
            return acc
          }, [])
        this.isLoading = false	
		  console.log(this.drinks)
        return this.drinks
      } catch (error) {
        console.error('Ошибка при получении данных:', error)
        return []
      }
    }
  }
})
// - Всю необходимую информацию запрашиваем по GET-запросу: https://www.thecocktaildb.com/api/json/v1/1/search.php?s=<cocktail_code>
// - Доступные cocktail_code: margarita=11007, mojito=11000, a1=17222, kir=17203

<template>
	<div>
		<slot />
	</div>
</template>

<script setup lang="ts">
interface Props {
	selected: boolean
}
	const props = defineProps<Props>()
</script>

<style scoped>
</style>
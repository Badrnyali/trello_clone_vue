<script setup lang="ts">
const props = defineProps<{
    label: string;
    color?: string;
    bgColor?: string;
}>()

defineEmits(['btn-click'])
</script>
<template>
<button :style="{backgroundColor: bgColor, color: color}" @click.prevent="$emit('btn-click')">{{ label }}</button>
</template>

<style scoped>
button{
    padding: 5px 15px;
    background-color: var(--light-blue);
    border-radius: 15px;
    transition: all .3s ease;    
}
button:hover{
    padding: 5px 15px;
    background-color: var(--very-light-blue);
}
</style>


<template>
    <div class="item">{{index + 1}} {{ text }}</div>
</template>

<script>
    export default {
        props: {
            index: Number,
            text: "temp"
        }
    }
</script>

<style>
    .item {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        border-bottom: 1px solid #eee;
    }
</style>

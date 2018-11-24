<template>
    <div class="i">#{{index}} {{text}}</div>
</template>

<script>
    export default {
        props: {
            index: Number
        }
    }
</script>

<style>
    .i {
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        border-bottom: 1px solid #eee;
    }
</style>

<script setup lang="ts">

</script>
<template>
    <div class="page">
        <header class="header">
            <slot name="header"></slot>
        </header>
        <main class="center">
            <div class="sideBar">
                <slot name="sideBar"></slot>
            </div>
            <div class="main">
                <slot></slot>
            </div>
        </main>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>
<style scoped lang="scss">
    .page {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }

    .center {
        flex: 1;
        display: flex;
    }

    .main {
        flex: 1;
    }
</style>
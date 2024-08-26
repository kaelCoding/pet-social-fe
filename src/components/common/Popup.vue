<script setup>
const props = defineProps(["containerMaxWidth"])
const emits = defineEmits(["close"])

const close = () => {
    emits("close")
}
</script>

<template>
    <div class="overlay" @click="close">
        <div class="container-popup" :style="{'max-width': containerMaxWidth}" @click.stop="">
            <div class="header font-title">
                <slot name="header"></slot>
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
            <div class="bottom tab-list-row">
                <slot name="bottom"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #00000080;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container-popup {
    background-color: white;
    padding: 0px 24px 24px 24px;
    min-width: 400px;
    border-radius: 8px;
    overflow-y: auto;
}

.header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;    
}

.body {
    border-top: 1px solid var(--c-border);
    border-bottom: 1px solid var(--c-border);
    padding-bottom: 12px;
    padding-top: 6px;
    margin-bottom: 12px;
    max-height: calc(100vh - 220px);
    overflow-y: auto;
}

.bottom {
    width: 100%;
}
</style>
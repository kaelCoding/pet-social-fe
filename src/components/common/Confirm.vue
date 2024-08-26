<script setup>
import Popup from './Popup.vue';
import { dataPopup, closePopup } from '@/stores/popup';

const cancel = () => {
    if(dataPopup.value.close) {
        dataPopup.value.close()
    }

    closePopup();
}

const confirm = async () => {
    if(dataPopup.value.confirm) {
        await dataPopup.value.confirm()
    }

    closePopup()
}

</script>

<template>
    <div>
        <Popup @close="cancel" v-if="dataPopup.show">
            <template v-slot:header>
                {{ dataPopup.title }}
            </template>

            <template v-slot:body>
                <div class="font-content">{{ dataPopup.content }}</div>
            </template>

            <template v-slot:bottom>
                <div v-if="dataPopup.confirm" style="margin-left: auto;">
                    <button @click="confirm">Confirm</button>
                    <button class="btn--light" @click="cancel">Cancel</button>
                </div>
            </template>
        </Popup>
    </div>
</template>
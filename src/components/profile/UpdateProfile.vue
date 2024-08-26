<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { profile_update_api, profile_get_api } from "@/services/profile"
import { pet_create_api, detail_pet_api, pet_update_api } from '@/services/pet';
import { isCreatedProfile, get_auth_user } from '@/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import Popup from '@/components/common/Popup.vue';

const emits = defineEmits(["close", "updateProfle", "updatePet"]);
const props = defineProps(["type"])
const route = useRoute();
const router = useRouter()
const idPet = computed(() => {
    return route.params.idUser
})

const close = () => {
    emits("close")
}

onBeforeMount(async () => {
    if (props.type == "PROFILE") {
        if (isCreatedProfile.value) {
            try {
                await profile_get_api(get_auth_user.value.profile_id).then(res => {
                    dataProfile.value.name = res.name
                    dataProfile.value.description = res.description
                    dataProfile.value.phone = res.phone
                    dataProfile.value.address = res.address
                    dataProfile.value.birthday = res.birthday
                    dataProfile.value.gender = res.gender
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
    if (props.type == "PET_UPDATE") {
        try {
            await detail_pet_api(idPet.value).then(res => {
                dataProfile.value.name = res.name
                dataProfile.value.description = res.description
                dataProfile.value.specie_type = res.specie_type
                dataProfile.value.birthday = res.birthday
                dataProfile.value.gender = res.gender
            })
        } catch (error) {
            console.log(error)
        }
    }
})

const dataProfile = ref({
    name: "",
    description: "",
    phone: "", 
    address: "", 
    birthday: "",
    gender: true,
    specie_type: "" 
})

const updateProfile = async () => {
    switch (props.type) {
        case "PROFILE":
            try {
                await profile_update_api({
                    name: dataProfile.value.name,
                    description: dataProfile.value.description,
                    phone: dataProfile.value.phone,
                    address: dataProfile.value.address,
                    birthday: new Date(dataProfile.value.birthday),
                    gender: dataProfile.value.gender
                }).then(res => {
                    get_auth_user.value.profile_id = res.id;
                    emits("updateProfile", res)
                })
            } catch (error) {
                console.log(error)
            }
            break;
        case "PET":
        case "PET_UPDATE":
            try {
                const funcPet = UpdateOrCreatePet(props.type)
                await funcPet(idPet.value, {
                    name: dataProfile.value.name,
                    description: dataProfile.value.description,
                    birthday: new Date(dataProfile.value.birthday),
                    gender: dataProfile.value.gender,
                    specie_type: dataProfile.value.specie_type
                }).then(res => {
                    emits("updatePet", res)
                    router.push(`/profile/pet/${res.id}`)
                })
            } catch (error) {
                console.log(error)
            }
            break;
    }
}

const UpdateOrCreatePet = (type) => {
    if (type == "PET") {
        return pet_create_api
    } else {
        return pet_update_api
    }
}

</script>

<template>
    <div>
        <form class="form" @submit.prevent="updateProfile">
            <Popup @close=close>
                <template v-slot:header>
                    <span v-if="type == 'PET'">Create pet</span>
                    <span v-else>Update profile</span>
                </template>
                <template v-slot:body>
                    <label>Name</label>
                    <input type="text" v-model="dataProfile.name" placeholder="Enter name">
                    <div class="error"></div>

                    <label>Description</label>
                    <input type="text" v-model="dataProfile.description" placeholder="Enter description">
                    <div class="error"></div>

                    <div v-if="type == 'PROFILE'">
                        <label>Phone</label>
                        <input type="text" v-model="dataProfile.phone" placeholder="Enter phone">
                        <div class="error"></div>

                        <label>Address</label>
                        <input type="text" v-model="dataProfile.address" placeholder="Enter address">
                        <div class="error"></div>
                    </div>
                    <div v-else>
                        <label>Specietype</label>
                        <input type="text" v-model="dataProfile.specie_type" placeholder="Enter specie type">
                        <div class="error"></div>
                    </div>

                    <label>Birthday</label>
                    <input type="date" v-model="dataProfile.birthday">
                    <div class="error"></div>

                    <div class="gender-ctn">
                        <label>Male</label>
                        <input type="checkbox" v-model="dataProfile.gender">
                    </div>
                </template>
                <template v-slot:bottom>
                    <button type="submit">
                        <span class="font-content">Update</span>
                    </button>
                    <button class="btn--light" type="button" @click="close">
                        <span class="font-content">Cancel</span>
                    </button>
                </template>
            </Popup>
        </form>
    </div>
</template>

<style scoped>
.ctn {
    max-width: 700px;
}

.gender-ctn {
    width: fit-content;
    display: flex;
}
</style>
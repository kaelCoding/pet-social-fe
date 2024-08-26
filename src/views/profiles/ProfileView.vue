<script setup>
import { computed, onBeforeMount, ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router";
import { profile_get_api, profile_follow_api, profile_follow_count_api } from "@/services/profile"
import { get_auth_user } from "@/stores/auth";
import { requireProfileCreated } from "@/modules/profile";
import ListCardUser from "@/components/profile/ListCardUser.vue";
import CardUser from "@/components/profile/CardUser.vue";
import ListPet from "@/components/profile/ListPet.vue"
import ListPost from "@/components/posts/ListPost.vue"
import { detail_pet_api, pet_follow_count_api, pet_follow_api } from "@/services/pet";
import UpdateProfile from "@/components/profile/UpdateProfile.vue";

const props = defineProps(["type"])

const route = useRoute()
const idProfile = computed(() => {
    return route.params.idUser
})

watch(() => idProfile.value, async () => {
    isDoneLoad.value = false;
    try {
        await getProfile();
        await getFollowcount();

        isDoneLoad.value = true
    } catch (error) {
        console.log(error)
    }
})

const profile = ref(null)
const isDoneLoad = ref(false)

onBeforeMount(async () => {
    isDoneLoad.value = false
    try {
        await getProfile();
        await getFollowcount();
        isDoneLoad.value = true
    } catch (error) {
        console.log(error)
    }
})

const getProfile = async () => {
    if (props.type == 'PROFILE') {
        try {
            await profile_get_api(idProfile.value).then(res => {
                profile.value = res
            })
        } catch (error) {
            throw (error)
        }
    } else {
        try {
            await detail_pet_api(idProfile.value).then(res => {
                profile.value = res
            })
        } catch (error) {
            throw (error)
        }
    }
}

const followCount = ref({})

const getFollowcount = async () => {
    if (props.type == 'PROFILE') {
        try {
            await profile_follow_count_api(idProfile.value).then(res => {
                followCount.value = res
                console.log(followCount.value)
            })
        } catch (error) {
            console.log(error)
        }
    } 
    if (props.type == 'PET') {
        try {
            await pet_follow_count_api(idProfile.value).then(res => {
                followCount.value.followers = res
                console.log(followCount.value.followers)
            })
        } catch (error) {
            console.log(error)
        }
    }
}

const isMyProfile = computed(() => {
    if (get_auth_user.value.id == profile.value.user_id) {
        return true;
    }
    return false
})

const isMyPet = computed(() => {
    if (get_auth_user.value.profile_id == profile.value.profile_id) {
        return true;
    }
    return false
})

const follow = async () => {
    if (requireProfileCreated) {
        if (props.type == 'PROFILE') {
            try {
                await profile_follow_api(idProfile.value).then(res => {
                    followCount.value.followers = res
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                await pet_follow_api(idProfile.value).then(res => {
                    followCount.value.followers = res
                })
            } catch (error) {
                console.log(error)
            }
        }

    }
}

const isFollowing = computed(() => {
    if (followCount.value.followers) {
        const indexFollow = followCount.value.followers.findIndex(item => item.follow_id == get_auth_user.value.profile_id)

        if (indexFollow >= 0) {
            return true
        }
        return false
    }
})

const showListUser = ref(false)
const showListUserProfileIds = ref([])

const openListUser = (profile_ids) => {
    showListUserProfileIds.value = profile_ids
    showListUser.value = true
}

const closeListUser = () => {
    showListUserProfileIds.value = []
    showListUser.value = false
}

const openListFollowers = () => {
    const profile_ids = followCount.value.followers.map(item => {
        return item.follow_id
    })
    openListUser(profile_ids)
}

const openListFollowings = () => {
    const profile_ids = followCount.value.followings.map(item => {
        return item.follow_id
    })
    openListUser(profile_ids)
}

const showPopup = ref(false)
const isType = ref(null)

const openPopup = (type_update) => {
    showPopup.value = true
    isType.value = type_update
}

const closePopup = () => {
    showPopup.value = false
}

const updateProfile = (p) => {
    profile.value.name = p.name;
    profile.value.description = p.description;
    profile.value.phone = p.phone;
    profile.value.address = p.address;
    profile.value.birthday = p.birthday;
    profile.value.gender = p.gender;

    closePopup()
}

const updatePet = (p) => {
    profile.value.name = p.name;
    profile.value.description = p.description;
    profile.value.specie_type = p.specie_type
    profile.value.birthday = p.birthday;
    profile.value.gender = p.gender;
    
    closePopup()
}
</script>

<template>
    <div class="main">
        <div class="main-center" v-if="isDoneLoad">
            <div class="profile-top">
                <img class="cover-photo"
                    src="https://i0.wp.com/nftartwithlauren.com/wp-content/uploads/2023/12/laurenmcdonaghpereiraphoto_A_curious_tabby_cat_peeking_out_fr_973233ad-693d-475e-8005-79bedd97699d_2.png?fit=1024%2C574&ssl=1"
                    alt="">
                <div class="profile-top-desc">
                    <img class="profile-photo"
                        src="https://t4.ftcdn.net/jpg/03/49/49/79/360_F_349497933_Ly4im8BDmHLaLzgyKg2f2yZOvJjBtlw5.jpg"
                        alt="">
                    <div class="flex">
                        <span class="profile-name">
                            {{ profile.name }}
                        </span>

                        <div style="margin-left: auto;">
                            <div v-if="isMyProfile">
                                <button @click="openPopup('PROFILE')">Update</button>
                                <button class="tab-text" @click="openPopup('PET')">Create Pet</button>
                            </div>

                            <span class="tab" v-if="isMyPet">
                                <button @click="openPopup('PET_UPDATE')">Update</button>
                            </span>

                            <span v-if="!isMyProfile">
                                <button v-if="!isMyPet" @click="follow">
                                    <span v-if="!isFollowing">Follow</span>
                                    <span v-else>Unfollow</span>
                                </button>
                                <RouterLink class="tab-text" v-if="type == 'PROFILE'" :to="`/chats/${profile.id}`">
                                    <button>Chats</button>
                                </RouterLink>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="profile-main" v-if="profile">
                <div class="profile-left">
                    <div class="card tab-list-col">
                        <span class="font-title">Intro</span>
                        <span class="font-content">{{ profile.description }}</span>
                        <div class="flex">
                            <i class="bi bi-people-fill"></i>
                            <div class="tab-text" v-if="followCount.followers" @click="openListFollowers">
                                <b>{{ followCount.followers.length }}</b>
                                <span> followers</span>
                            </div>
                            <i v-if="followCount.followings" class="bi bi-dot"></i>
                            <div class="font-content" v-if="type == 'PROFILE' && followCount.followings" @click="openListFollowings">
                                <b>{{ followCount.followings.length }} </b>
                                <span> following</span>
                            </div>
                        </div>

                        <div class="tab-list-col" v-if="type == 'PET'">
                            <span class="font-content">
                                <b>Specie: </b> {{ profile.specie_type }}
                            </span>
                            <span class="tab-list-row font-content">
                                <b>Owner: </b>
                                <CardUser :profile_id="profile.profile_id" :hideImg="true" />
                            </span>
                        </div>
                        <div class="tab-list-col" v-else>
                            <span class="font-content">
                                <b>Email: </b> abc@gmail.com
                            </span>
                            <span class="font-content">
                                <b>Website: </b> userpro.com
                            </span>
                            <span class="font-content">
                                <b>Phone: </b> {{ profile.phone }}
                            </span>
                        </div>
                    </div>

                    <div class="card" v-if="type == 'PROFILE' && profile.pets && profile.pets.length > 0">
                        <span class="font-title">Pets</span>
                        <ListPet :pet_ids="profile.pets" />
                    </div>
                </div>
                <div class="profile-detail">
                    <ListPost :post_ids="profile.posts" />
                    <ListCardUser v-if="showListUser" :profile_ids="showListUserProfileIds" @close="closeListUser" />
                </div>
            </div>
            <UpdateProfile
                v-if="showPopup"
                @close="closePopup"
                @updateProfile="updateProfile"
                @updatePet="updatePet"
                :type="isType"
            />
        </div>
    </div>
</template>

<style scoped>
.main {
    overflow-y: auto
}

.main-center {
    max-width: 1200px;
    padding: unset;
}

.profile-top {
    background-color: var(--c-white);
    margin-bottom: 24px;
}

.cover-photo {
    width: 100%;
    height: 400px;
    object-fit: cover;
}

.profile-top-desc {
    display: flex;
    align-items: end;
    padding: 12px;
    margin-top: -86px;
}

.profile-photo {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #ccc;
}

.profile-name {
    font-size: 32px;
    font-weight: 600;
    margin-top: -60px;
}

.profile-main {
    display: flex;
    width: 100%;
    height: 100%;
}

.profile-left {
    width: 25%;
    margin-right: 24px
}

.profile-detail {
    width: calc(100% - 25%);
}

</style>
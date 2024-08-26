<script setup>
import { ref, onBeforeMount } from 'vue';
import { post_create_api, post_update_api } from '@/services/post';
import { files_upload_api } from '@/services/file';
import { useRouter } from 'vue-router';
import { my_pet_api } from "@/services/pet";
import { get_auth_user } from "@/stores/auth";
import Popup from '../common/Popup.vue';
import CardUser from "@/components/profile/CardUser.vue"
import HashtagChose from './HashtagChose.vue';

const props = defineProps(["dataPost"])
const emits = defineEmits(["close", "createPost", "updatePost"]);

const pets = ref([])
onBeforeMount(async () => {
    await my_pet_api().then(res => {
        pets.value = res
    })

    if(props.dataPost) {
        post.value.title = props.dataPost.title
        post.value.content = props.dataPost.content
        post.value.pets = props.dataPost.pets

        for (const file of props.dataPost.files) {
            post.value.files.push({
                link: file.link
            })
        }

        for (const tag of props.dataPost.hashtags) {
            post.value.hashtags.push({
                tag: tag.tag
            })
        }

        for(const petSelected of post.value.pets) {
            const indexPetSelected = pets.value.findIndex(item => item.id == petSelected.id)
            if(indexPetSelected >= 0) {
                pets.value[indexPetSelected]._chose = true
            }
        }
    }
})

const post = ref({
    title: "",
    content: "",
    files: [],
    pets: [],
    hashtags: []
})

const close = () => {
    emits("close")
}

const router = useRouter()

const createPost = async () => {
    post.value.pets = [];
    for (const pet of pets.value) {
        if (pet._chose) {
            post.value.pets.push({
                id: pet.id
            })
        }
    }

    try {
        if(props.dataPost) {
            await post_update_api(props.dataPost.id, {
                title: post.value.title,
                content: post.value.content,
                files: post.value.files,
                pets: post.value.pets,
                hashtags: post.value.hashtags
            }).then(res => {
                emits("updatePost", res)
                router.push("/posts")
            })
        } else {
            await post_create_api(post.value).then(res => {
                emits("createPost", res)
                router.push("/posts")
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const filesInp = ref(null)

const handleUploadFiles = async () => {
    const files = filesInp.value.files

    const formData = new FormData()

    for (const file of files) {
        formData.append("files", file)
    }

    try {
        await files_upload_api(formData).then(res => {
            post.value.files = res.map(item => {
                return {
                    link: item.id
                }
            })
        })
    } catch (error) {
        console.log(error)
    }
}

const removeFile = (index) => {
    post.value.files.splice(index, 1)
}

const handleClickUploadFile = () => {
    filesInp.value.click()
}
</script>

<template>
    <div>
        <form class="form" @submit.prevent="createPost">
            <Popup :containerMaxWidth="'500px'" @close="close">
                <template v-slot:header>
                    <span v-if="dataPost">Update post</span>
                    <span v-else>Create post</span>
                </template>
                <template v-slot:body>
                    <CardUser class="tab" :profile_id="get_auth_user.profile_id" />

                    <label>Title</label>
                    <input class="inp--light" type="text" v-model="post.title" placeholder="Enter title">
                    <div class="error"></div>

                    <label>Content</label>
                    <input class="inp--light" type="text" v-model="post.content" placeholder="Enter content">
                    <div class="error"></div>

                    <HashtagChose :hashtags="post.hashtags"/>

                    <div class="tab-list-col">
                        <input style="display: none;" type="file" ref="filesInp" multiple @input="handleUploadFiles">
                        <button style="width: max-content" type="button" @click="handleClickUploadFile">
                            <span class="font-content">Upload files</span>
                        </button>

                        <div v-if="post.files.length > 0" class="img-ctn tab-list-row">
                            <div class="img-rm-ctn" v-for="(file, index) of post.files" :key="file.link">
                                <i class="bi bi-x-circle-fill" @click="removeFile(index)"></i>
                                <img class="post-img" :src="$loadFile(file.link)">
                            </div>
                        </div>

                        <label class="font-content">Pets</label>
                        <div v-for="pet of pets" :key="pet.id">
                            <div class="tab-list-row" v-if="pet.profile_id == get_auth_user.profile_id">
                                <input style="width: unset;" type="checkbox" v-model="pet._chose">
                                <span class="font-content"> {{ pet.name }} </span>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:bottom>
                    <button type="submit">
                        <span class="font-content">Post</span>
                    </button>
                    <button class="btn--light cancel-btn" type="button" @click="close">
                        <span class="font-content">Cancel</span>
                    </button>
                </template>
            </Popup>
        </form>
    </div>
</template>

<style scoped>
.img-ctn {
    max-width: max-content;
    overflow-x: auto;
    border: 1px solid var(--c-border);
    padding: 6px;
    border-radius: 8px;
}

.img-rm-ctn {
    position: relative;
}

.bi-x-circle-fill {
    position: absolute;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    font-size: 16px;
    right: 0px;
    top: -8px;
    cursor: pointer;
    display: none;
    background-color: var(--c-white-light)
}

.img-rm-ctn:hover .bi-x-circle-fill {
    display: block;
}

.post-img {
    width: 216px;
    height: 216px;
}

.cancel-btn:hover {
    background-color: var(--c-white-light);    
}
</style>
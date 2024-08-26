<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { token } from "@/stores/auth";
import { auth_register_api } from "@/services/auth";

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const err_register = ref("")

const register = async () => {
    console.log(token.value)
    try {
        await auth_register_api(dataRegister.value)

        alert("Register success")

        router.push("/login")
    } catch (error) {
        err_register.value = error
    }
}
</script>

<template>
    <div class="main">
        <div class="main-center ctn">
            <form class="card form" @submit.prevent="register">
                <label>Email</label>
                <input type="email" class="form-control" v-model="dataRegister.email" placeholder="Email address">
                <div class="error"></div>

                <label>Password</label>
                <input type="password" class="form-control" v-model="dataRegister.password" placeholder="Password">
                <div class="error"></div>

                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="dataRegister.confirm_password" placeholder="Confirm Password">
                <div class="error"></div>

                <button type="submit" class="btn btn-primary">Register</button>
            </form>

            <div class="help-block">
                Already have an account ?
                <RouterLink to="/login">Login</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ctn {
    max-width: 700px;
}

.help-block {
    margin-top: 24px;
}
</style>
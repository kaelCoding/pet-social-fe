<script setup>
import { ref } from "vue";
import { save_token_local, get_auth_info } from "@/stores/auth";
import { auth_login_api } from "@/services/auth";
import { useRouter } from "vue-router";
import { g_validation } from "@/modules/validation";
import { setNotiMess } from "@/stores/noti";

const router = useRouter();

const dataLogin = ref({
    email: "",
    password: ""
})

const errEmail = ref("");
const checkEmail = () => {
	errEmail.value = g_validation({
        data: dataLogin.value.email,
		label: "Email",
		type: "EMAIL"
	});
	if(errEmail.value){
		return false;
	}else{
		return true;
	}
}

const errPass = ref("")
const checkPass = () => {
    errPass.value = g_validation({
        data: dataLogin.value.password,
		label: "Password",
		type: "PASSWORD"
	});
	if(errPass.value){
		return false;
	}else{
		return true;
	}
}

const login = async () => {
    if(checkEmail() && checkPass()) {
        try {
            const data = await auth_login_api(dataLogin.value)
            save_token_local(data.token)
            await get_auth_info()

            setNotiMess({
                mess: "Login success",
            })

            router.push("/")
        } catch (error) {
            console.log('on login error ', error)
        }
    }
}

</script>

<template>
    <div class="main">
        <div class="main-center ctn">
            <form class="card form" @submit.prevent="login">
                <label>Email</label>
                <input type="email" v-model="dataLogin.email" placeholder="Email address">
                <div class="error">{{ errEmail }}</div>
            
                <label>Password</label>
                <input type="password" v-model="dataLogin.password" placeholder="Password">
                <div class="error">{{ errPass }}</div>

                <button type="submit" class="btn btn-primary">Login</button>
            </form>

            <div class="help-block">
                Don't have account ?
                <RouterLink to="/register">Register</RouterLink>
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
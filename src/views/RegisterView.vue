<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { token } from "@/stores/auth";
import { auth_register_api } from "@/services/auth";
import { g_validation } from "@/modules/validation";
import { setNotiMess } from "@/stores/noti";

const router = useRouter()

const dataRegister = ref({
    email: "",
    password: "",
    confirm_password: ""
})

const errEmail = ref("");
const checkEmail = () => {
	errEmail.value = g_validation({
        data: dataRegister.value.email,
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
        data: dataRegister.value.password,
		label: "Password",
		type: "PASSWORD"
	});
	if(errPass.value){
		return false;
	}else{
		return true;
	}
}

const errPassConfirm = ref("")
const checkPassConfirm = () => {
    if(dataRegister.value.confirm_password == "") {
        errPassConfirm.value = "Nhập lại mật khẩu"
        return false;
    } else if (dataRegister.value.confirm_password != dataRegister.value.password) {
        errPassConfirm.value = "Mật khẩu không đúng"
        return false;
    } else {
        return true;
    }
}

const register = async () => {
    if(checkEmail() && checkPass() && checkPassConfirm()) {
        try {
            await auth_register_api(dataRegister.value)

            setNotiMess({
                mess: "Register success",
            })

            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<template>
    <div class="main">
        <div class="main-center ctn">
            <form class="card form" @submit.prevent="register">
                <label>Email</label>
                <input type="email" class="form-control" v-model="dataRegister.email" placeholder="Email address">
                <div class="error">{{ errEmail }}</div>

                <label>Password</label>
                <input type="password" class="form-control" v-model="dataRegister.password" placeholder="Password">
                <div class="error">{{ errPass }}</div>

                <label>Confirm Password</label>
                <input type="password" class="form-control" v-model="dataRegister.confirm_password" placeholder="Confirm Password">
                <div class="error">{{ errPassConfirm }}</div>

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
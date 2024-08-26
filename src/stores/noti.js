import { ref } from "vue";

const notiMess = ref({
	show: false,
	mess: "",
	link: "",
	error: false,
	bottom: false
});

const clearNotiMess = () => {
	notiMess.value = {
		show: false,
		mess: "",
		link: "",
		error: false,
		bottom: false
	}
}

const setNotiMess = (mess) => {
	clearNotiMess();
	if (mess.mess != undefined) {
		notiMess.value.mess = mess.mess;
	}
	if (mess.link != undefined) {
		notiMess.value.link = mess.link;
	}
	if (mess.error != undefined) {
		notiMess.value.error = mess.error;
	}
	if (mess.open != undefined) {
		notiMess.value.open = mess.open;
	}
	if (mess.bottom != undefined) {
		notiMess.value.bottom = mess.bottom;
	}
	notiMess.value.show = true;
    
	setTimeout(() => {
		clearNotiMess();
	}, 5000);
}

export {
	notiMess,
	setNotiMess,
	clearNotiMess
}
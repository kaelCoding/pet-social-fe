import { ref } from "vue";

export const dataPopup = ref({
    title: "",
    content: "",
    show: false,
    close: null, // function
    confirm: null // function
})

export const openPopup = (data) => {
    dataPopup.value.title = data.title;
    dataPopup.value.content = data.content;
    dataPopup.value.show = true;
    dataPopup.value.confirm = data.confirm; 
    dataPopup.value.close = data.close;
};

export const closePopup = () => {
    dataPopup.value = {
        title: "",
        content: "",
        show: false,
        close: null,
        confirm: null
    }
}
<script setup>
import { useRouter } from 'vue-router';
import { notiMess, clearNotiMess, setNotiMess } from '@/stores/noti';

const router = useRouter();

const clearNotifi = (event) => {
	if (event != undefined) {
		event.stopPropagation();
	}
	clearNotiMess();
}

const toNotifi = () => {
	if (notiMess.value.link) {
		router.push(notiMess.value.link);
	}
	clearNotiMess();
}
</script>

<template>
	<div v-if="notiMess.show">
		<div
			class="noti-container"
			:class="{ 'noti-container-error': notiMess.error, 'noti-bottom': notiMess.bottom }"
			@click="toNotifi"
		>
			{{ notiMess.mess }}
            <span class="close-noti" @click="clearNotifi($event)">X</span>
		</div>
	</div>
</template>

<style scoped>
.noti-container {
	position: fixed;
	min-width: 260px;
	min-height: 56px;
	right: 24px;
	top: 60px;
	background: #5772f9;
	border-radius: 6px;
	clear: both;
	display: block;
	z-index: 4;

	font-weight: normal;
	font-size: 16px;
	line-height: 24px;

	letter-spacing: 0.02em;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 0px 60px 0px 16px;

	/* border: 1px solid #f5f5f5; */
	box-shadow: 0px 1px 5px var(--c-shadow);
}
.noti-container:hover {
	cursor: pointer;
}
.noti-container-error {
	background: #eb5757;
}

.close-noti {
	position: absolute;
	right: 16px;
}

.noti-bottom {
	top: auto;
	bottom: 60px;
}

@media screen and (max-width: 600px) {
	.noti-container {
		top: 48px;
		right: 12px;
		width: calc(100% - 24px);
	}
}
</style>

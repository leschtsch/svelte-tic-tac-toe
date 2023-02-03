<script lang="ts">
	import { onMount } from 'svelte';
	import { userStore } from './userStore';
	let username: string, password: string;
	let logout = () => {
		userStore.logout();
	};
	let login = () => {
		userStore.login(username, password);
	};
	let register = async () => {
		userStore.register(username, password);
		userStore.login(username, password);
	};

	// onMount(() => {
	// 	let username1 = document.getElementById('username1');
	// 	let password1 = document.getElementById('password1');
	// 	if (username1 && password1) {
	// 	// 	username1.classList.add('user-input');
	// 	// 	password1.classList.add('user-input');
	// 	username1.value = "fsfds";
	// 	}
	// });
</script>

<div>
	{#if $userStore === null}
		<label for="login" />
		<label for="username1">логин:</label>
		<input id="username1" type="text" bind:value={username} />
		<label for="password1">пароль:</label>
		<input id="password1" type="password" bind:value={password} />
		<button on:click={register}>register</button>
		<button on:click={login}>login</button>
	{:else}
	{$userStore.username}:
	<button on:click={logout}>logout</button>
	{/if}
</div>

<style>
	button {
		background-color: #555;
		color: #bbb;
		border: 0;
		border-radius: 2px;
	}
	#username1,
	#password1 {
		background-color: #aaa;
		border: 0;
		border-radius: 3px;

		box-shadow: inset 20px 20px 0px 20px #aaa;
	}
	/* .user-input {
		background-color: #777;
		color: #ddd;
		border: 0;
		border-radius: 2px;
	} */
</style>

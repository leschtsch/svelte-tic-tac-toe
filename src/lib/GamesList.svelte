<script lang="ts">
	import { address } from './address';
	import { gamesListStore } from './gamesListStore';
	import { userStore } from './userStore';
	import { browser } from '$app/environment';
	let size = 3,
		criteria = 3;
	let register = async (player: string, id: string) => {
		if ($userStore == undefined) return;
		console.log('Bearer ' + $userStore.token);
		await fetch(`${address}games/${id}/register`, {
			method: 'POST',
			body: JSON.stringify({ as: player }),
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $userStore.token
			}
		});
		if (browser) window.location.href = '/games/'+id;
	};
	let new_game = () => {
		if ($userStore == undefined) return;
		fetch(`${address}games/`, {
			method: 'POST',
			body: JSON.stringify({ size: size, criteria: criteria }),
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $userStore.token
			}
		});
	};
	let del = async (id:string)=>{
		
		if ($userStore == undefined) return;
		let res = await fetch(`${address}games/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
				Authorization: 'Bearer ' + $userStore.token
			}
		});
		let json = await res.json();
		
	}
</script>

{#if $gamesListStore}
	{#if $userStore}
		<label for="size">size: &nbsp;</label>
		<input type="number" id="size" bind:value={size} />
		<label for="criteria">criteria: &nbsp;</label>
		<input type="number" id="criteria" bind:value={criteria} />
		<button on:click={new_game} id="new-game"> Добавить игру </button>
	{/if}
	<ul>
		{#each Object.keys($gamesListStore) as a}
			<li>
				id: {a} <a href={'/games/' + a}>Войти</a>
				{#if $gamesListStore[a].game.draw}
					<button class="delete" on:click={()=>{del(a)}}>
						удалить
					</button>
				{/if}
				<br />
				{#if $gamesListStore[a].x_player == null && $userStore}
					<button
						on:click={() => {
							register('X', a);
						}}>войти как X</button
					>
				{:else}
					{$gamesListStore[a].x_player}
				{/if}
				&nbsp;&nbsp;&nbsp;vs&nbsp;&nbsp;&nbsp;
				{#if $gamesListStore[a].o_player == null && $userStore}
					<button
						on:click={() => {
							register('O', a);
						}}>войти как O</button
					>
				{:else}
					{$gamesListStore[a].o_player}
				{/if}
				<br />
				<br />
			</li>
		{/each}
	</ul>
{:else}
	Loading...
{/if}

<style>
	#size,
	#criteria {
		background-color: #aaa;
		border: 0;
		border-radius: 3px;

		box-shadow: inset 20px 20px 0px 20px #aaa;
	}
	button {
		background-color: #555;
		color: #bbb;
		border: 0;
		border-radius: 2px;
	}
	a {
		text-decoration: none;
		font-size: small;
		background-color: #555;
		color: #bbb;

		border: 0;
		border-radius: 2px;
		padding: 2px 5px 2px 5px;
	}
	.delete {
		background-color: #800;
		border-radius: 2px;
		border: 0;

		color: #8a8;
	}
</style>

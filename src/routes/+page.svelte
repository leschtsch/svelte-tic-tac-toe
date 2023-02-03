<script lang="ts">
	import { makeGameStore } from '../lib/gameStore';
	import Game from '../lib/Game.svelte';
	import { userStore } from '$lib/userStore';
	const gameStore = makeGameStore(undefined);
	let gameData = $gameStore;

	let size: number = 3,
		criteria: number = 3;
	let onTurn = (e: CustomEvent<{ x: number; y: number }>) => {
		gameStore.turn(e.detail.x, e.detail.y);
	};

	let onReset = (e: MouseEvent) => {
		gameStore.reset(size, criteria);
	};
</script>

<div style="margin-top: 20px;">
	{#if $gameStore}
		<label for="size">size: &nbsp;</label>
		<input type="number" id="size" bind:value={size} />
		<label for="criteria">criteria: &nbsp;</label>
		<input type="number" id="criteria" bind:value={criteria} />
		<button id="reset" on:click={onReset}>reset</button>
		<br />
		<br />
		<Game gameData={$gameStore} on:turn={onTurn} />
	{:else}
		Loading...
	{/if}
</div>

<style>
	#reset {
		background-color: #800;
		border-radius: 2px;
		border: 0;

		color: #8a8;
	}
	#size,
	#criteria {
		background-color: #aaa;
		border: 0;
		border-radius: 3px;

		box-shadow: inset 20px 20px 0px 20px #aaa;
	}
</style>

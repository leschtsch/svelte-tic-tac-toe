<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import type { GameData } from './gameStore';

	export let gameData: GameData;

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	$: scrSize = ((window.innerHeight * 9) / 10) | 0;
	$: cellSize = scrSize / gameData.field.length;
	$: width = scrSize;
	$: height = scrSize;
	$: console.log(scrSize);

	let dispatch = createEventDispatcher<{
		turn: { x: number; y: number };
	}>();
	let clickHandler = (e: MouseEvent) => {
		let rect = canvas.getBoundingClientRect();
		let x = Math.floor((e.clientX - rect.left) / cellSize);
		let y = Math.floor((e.clientY - rect.top) / cellSize);
		dispatch('turn', { x: x, y: y });
	};

	onMount(() => {
		ctx = canvas.getContext('2d')!;
	});
	$: {
		if (ctx) {
			ctx.clearRect(0, 0, width, height);

			ctx.lineWidth = 2;
			for (let i = 0; i < gameData.field.length; i++) {
				for (let j = 0; j < gameData.field.length; j++) {
					switch (gameData.field[i][j]) {
						case 'X':
							ctx.strokeStyle = '#11f';
							ctx.beginPath();
							ctx.moveTo(i * cellSize, j * cellSize);
							ctx.lineTo((i + 1) * cellSize, (j + 1) * cellSize);
							ctx.stroke();
							ctx.beginPath();
							ctx.moveTo(i * cellSize, (j + 1) * cellSize);
							ctx.lineTo((i + 1) * cellSize, j * cellSize);
							ctx.stroke();
							break;
						case 'O':
							ctx.strokeStyle = '#0c0';
							ctx.beginPath();
							ctx.arc((i + 0.5) * cellSize, (j + 0.5) * cellSize, cellSize / 2 - 2, 0, 6.3);
							ctx.closePath();
							ctx.stroke();
							break;
					}
				}
			}
			ctx.lineWidth = 1;
			ctx.strokeStyle = '#fff';
			for (let i = 0; i <= gameData.field.length; i++) {
				ctx.beginPath();
				ctx.moveTo(0, i * cellSize);
				ctx.lineTo(width, i * cellSize);
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(i * cellSize, 0);
				ctx.lineTo(i * cellSize, height);
				ctx.stroke();
			}
		}
	}
</script>

{#if gameData.draw}
	Draw!<br />
{:else if !gameData.winner}
	Current player: {gameData.currentPlayer} <br />
{:else}
	Winner: {gameData.winner}! <br />
{/if}
<div class="game-main">
	<canvas id="game-field" bind:this={canvas} {width} {height} on:click={clickHandler} />
</div>

<style>
	.game-main {
		display: flex;
		justify-content: space-around;
	}
	#game-field {
		height: calc(min(90vw, 90vh));
	}
</style>

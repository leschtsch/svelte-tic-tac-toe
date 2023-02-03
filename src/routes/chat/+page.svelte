<script lang="ts">
	import { onMount } from 'svelte';
	let socket: WebSocket;
	let from: string, text: string;
	let send = () => {
		socket.send(JSON.stringify({ from: from, text: text }));
	};

	let messages: Array<{ from: string; text: string }> = [];
	let get_messages = async () => {
		let res = await fetch('http://194.87.248.194:8080/chat');
		messages = await res.json();
		messages = messages;
	};
	onMount(() => {
		get_messages();
		socket = new WebSocket('ws://194.87.248.194:8080/ws');
		// socket.onopen = (e) => {
		// alert('opened');
		// };
		socket.onmessage = (e) => {
			messages.push(JSON.parse(e.data));
			messages = messages;
		};
		// socket.onclose
	}); 
</script>

{#if socket}
	socket status: {socket.readyState}
{/if}
<ul>
	{#each messages as msg}
		<li>
			{msg.from}: {msg.text}
		</li>
	{/each}
</ul>
<label for="from">from:</label>
<input type="text" name="from" id="from" bind:value={from} />
<label for="text">text:</label>
<input type="text" name="text" id="text" bind:value={text} />
<button on:click={send}>send_m</button>

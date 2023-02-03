<script lang="ts">
	import User from '$lib/User.svelte';
</script>

<div class="main">
	<div class="headbar">
		<span>
			<a href="/" class="navbar-link">Главная</a>
			<a href="/games" class="navbar-link">Список игр</a>
		</span>
		<User />
	</div>
	<div class="content" >
	<slot />
	</div>
</div>

<style>
	:global(body) {
		background-color: #111;

		font-family: Arial;
		font-size: large;
		color: #aaa;
	}
	.main{
		display: flex;
		flex-direction: column;
	}
	.headbar {
		display: flex;
		justify-content: space-between;

		margin-bottom: 20px;
	}
	.navbar-link {
		margin-top: 50px;
		padding: 5px;
		border-radius: 5px;

		background-color: #333;

		color: #999;
		font-size: large;
		text-decoration: none;
	}
</style>

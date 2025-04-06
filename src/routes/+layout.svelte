<script lang="ts">
	import { pwaInfo } from 'virtual:pwa-info'; 

	import { page } from '$app/stores';
	import '../app.css';

	const webManifest = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '')
</script>

<svelte:head> 
 	{@html webManifest} 
</svelte:head>

<div class="min-h-screen bg-base-200">
	<div class="navbar bg-base-100 shadow-lg">
		<div class="flex-1">
			<a href="#/" class="btn btn-ghost text-xl">Stock Options</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a href="#/" class={$page.url.pathname === '/' ? 'active' : ''}>Home</a>
				</li>
				<li>
					<a href="#/predictions" class={$page.url.pathname === '/predictions' ? 'active' : ''}>Predictions</a>
				</li>
			</ul>
		</div>
	</div>

	<main class="container mx-auto p-4">
		<slot />
	</main>
</div>

<script lang="ts">
	import DarkModeToggle from '$lib/DarkModeToggle.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<DarkModeToggle />

{@render children()}

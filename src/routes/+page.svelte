<script lang="ts">
	import JsonInput from '$lib/JsonInput.svelte';
	import KeyboardEditor from '$lib/KeyboardEditor.svelte';

	let keyboard: Keyboard | undefined = $state(undefined);
	let keymap: Keymap | undefined = $state(undefined);
</script>

<h1>keyboard-configurator</h1>

<div class="flex-colun flex">
	<JsonInput bind:data={keyboard} />
	<JsonInput bind:data={keymap} />
</div>

{#if keyboard?.layouts != undefined && Object.keys(keyboard.layouts).length > 0 && Object.values(keyboard.layouts).every((layout) => layout?.layout !== undefined) && keymap?.layers !== undefined && keymap.layers.length > 0}
	<div class="flex-colun flex justify-center">
		<KeyboardEditor bind:keyboard bind:keymap />
	</div>
{:else}
	<p>Invalid data</p>
{/if}

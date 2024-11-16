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

<KeyboardEditor bind:keyboard bind:keymap />

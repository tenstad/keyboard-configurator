<script lang="ts">
	let size = 50;
	let gap = 3;

	let { keyboard = $bindable(), keymap = $bindable() } = $props<{
		keyboard: Keyboard | undefined;
		keymap: Keymap | undefined;
	}>();
</script>

<div class="relative">
	{#if keyboard?.layouts !== undefined}
		{#each Object.values(keyboard.layouts)[0].layout as key, i}
			<div
				class="absolute"
				style:left={`${size * key.x + gap / 2}px`}
				style:top={`${size * key.y + gap / 2}px`}
			>
				<div
					class="rounded-lg border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-800"
					style:width={`${size - gap}px`}
					style:height={`${size - gap}px`}
				>
					{keymap.layers[0][i]}
				</div>
			</div>
		{/each}
	{/if}
</div>

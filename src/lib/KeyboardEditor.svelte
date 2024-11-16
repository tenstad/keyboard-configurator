<script lang="ts">
	let size = 50;
	let gap = 4;

	let { keyboard = $bindable(), keymap = $bindable() } = $props<{
		keyboard: Keyboard;
		keymap: Keymap;
	}>();

	let activeLayout: string = $state(
		Object.keys(keyboard.layouts).includes(keymap.layout)
			? keymap.layout
			: Object.keys(keyboard.layouts)[0]
	);
	let activeLayer: number = $state(0);
</script>

<div>
	<div>
		<div>
			{#each Object.keys(keyboard?.layouts) as layout}
				<button
					class="rounded-lg border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayout = layout)}>{layout}</button
				>
			{/each}
		</div>
		<div>
			{#each Object.keys(keymap?.layers) as _, i}
				<button
					class="rounded-lg border border-gray-200 bg-gray-100 p-2 text-xs font-semibold text-gray-800"
					onclick={() => (activeLayer = i)}>{i}</button
				>
			{/each}
		</div>
	</div>

	<div class="relative">
		{#each keyboard.layouts[activeLayout].layout as key, i}
			<div
				class="absolute rounded-lg"
				style:left={`${size * key.x}px`}
				style:top={`${size * key.y}px`}
				style:width={`${size}px`}
				style:height={`${size - gap}px`}
			>
				<div
					class="absolute flex h-full w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100 text-xs font-semibold text-gray-800"
					style:margin={`${gap / 2}px`}
					style:width={`${size - gap}px`}
					style:height={`${size - gap}px`}
				>
					<span>{keymap.layers[activeLayer][i]}</span>
				</div>
			</div>
		{/each}
	</div>
</div>

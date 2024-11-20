<script lang="ts">
	import Icon from './Icon.svelte';
	import { splitLabel, type Label } from './keys';

	let { labelGroup, labelGroups, isLower, otherExists } = $props<{
		labelGroup: Label[];
		labelGroups: Label[][];
		groupCount: number;
		isLower: boolean;
		otherExists: boolean;
	}>();

	let textLength = labelGroups
		.flat()
		.map((label: Label) => ('text' in label ? label.text.length : 0))
		.reduce((acc: number, x: number) => acc + x);
</script>

<div
	class={(isLower ? 'grid-flow-col' : labelGroup.length > 3 ? 'grid-cols-2' : 'grid-cols-1') +
		' grid items-center justify-items-center'}
>
	{#each labelGroup as label}
		{#if 'icon' in label}
			<Icon
				label={label.icon}
				size={isLower
					? [18, 18, 14, 13][labelGroup.length - 1] // lower
					: otherExists
						? 24 // upper when lower
						: labelGroups.length == 1 // upper only
							? 28 // icon only
							: textLength > 1 // icon group next to text
								? 13 // < multiple letters / v single letter
								: [24, 18, 14, 13][labelGroup.length - 1]}
			/>
		{/if}
		{#if 'text' in label}
			<span
				class="{{
					text: '',
					raw: 'font-mono'
				}[label.type]} {isLower
					? label.text.length == 1 // lower
						? '' // layer number
						: 'text-sm'
					: otherExists
						? 'text-xl' // upper when lower
						: label.text.length == 1 // only upper
							? 'text-2xl'
							: 'text-lg'}"
			>
				{#each splitLabel(label.text) as part}
					{part}<wbr />
				{/each}
			</span>
		{/if}
	{/each}
</div>

<script lang="ts">
	import Icon from './Icon.svelte';
	import { splitLabel, type Label } from './keys';

	let { labelGroup, labelGroups, isUpper, otherExists } = $props<{
		labelGroup: Label[];
		labelGroups: Label[][];
		groupCount: number;
		isUpper: boolean;
		otherExists: boolean;
	}>();

	let textLength = labelGroups
		.flat()
		.map((label: Label) => (label.text !== undefined ? label.text.length : 0))
		.reduce((acc: number, x: number) => acc + x);
</script>

{#each labelGroup as label}
	{#if label.icon !== undefined}
		<Icon
			label={label.icon}
			size={!isUpper
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
	{#if label.text}
		<span
			class="{{
				text: '',
				raw: 'font-mono'
			}[label.type]} {!isUpper
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

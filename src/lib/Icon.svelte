<script lang="ts">
	import {
		ArrowBigUpDash,
		ArrowDown,
		ArrowLeft,
		ArrowRight,
		ArrowUp,
		ChevronDown,
		Command,
		CornerDownLeft,
		Delete,
		Diamond,
		FastForward,
		Option,
		Play,
		PowerOff,
		Rewind,
		SkipBack,
		SkipForward,
		Space,
		SquareMenu,
		Sun,
		SunDim,
		Volume1,
		Volume2,
		VolumeOff
	} from 'lucide-svelte';

	let { label, size } = $props<{
		label: string;
		size: number;
	}>();

	let strokeWidth = size <= 13 ? 1.9 : size <= 15 ? 1.7 : 1.4;
</script>

{#if label == 'LUCIDE_LAYERS_2'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-layers-2"
		><path
			d="m 21.692 12.5 l 0.777 0.702 a 1 1 0 0 1 0 1.74 L 13.029 22.65 a 2 2 0 0 1 -2 0 l -9.496 -7.78 a 1 1 0 0 1 0 -1.74 L 2.3 12.435"
		/><path
			d="M 13 18.74 a 2 2 0 0 1 -2 0 L 1.544 10.906 a 1 1 0 0 1 0 -1.74 L 11 1.26 a 2 2 0 0 1 2 0 l 9.449 7.847 a 1 1 0 0 1 0 1.74 Z"
		/></svg
	>
{:else if label == 'LUCIDE_LAYERS_2_OPEN'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-layers-2"
		><path
			d="m 21.684 12.447 l 0.777 0.702 a 1 1 0 0 1 0 1.74 L 12.991 22.341 a 2 2 0 0 1 -2 0 l -9.47 -7.483 a 1 1 0 0 1 0 -1.74 L 2.3 12.435"
		/><path
			d="m 20.357 7.142 l 2.056 1.975 a 1 1 0 0 1 0 1.74 L 13 18.593 a 2 2 0 0 1 -2 0 l -9.48 -7.759 a 1 1 0 0 1 0 -1.74 L 3.563 7.095"
		/></svg
	>
{:else if label == 'LUCIDE_COMMAND'}
	<Command {size} {strokeWidth} />
{:else if label == 'LUCIDE_CHEVRON_DOWN'}
	<ChevronDown {size} {strokeWidth} />
{:else if label == 'LUCIDE_CHEVRON_UP'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="1.5 2.5 17 17"
		fill="none"
		stroke="currentColor"
		stroke-width={0.7 * strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-chevron-up"><path d="m17 15-7-7-7 7" /></svg
	>
{:else if label == 'LUCIDE_ARROW_BIG_UP'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="3.5 1.5 17 17"
		fill="none"
		stroke="currentColor"
		stroke-width={0.6 * strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-arrow-big-up"><path d="M9 17v-6H5l7-8 7 8h-4v6H9z" /></svg
	>
{:else if label == 'LUCIDE_OPTION'}
	<Option {size} {strokeWidth} />
{:else if label == 'LUCIDE_ALT'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-option"
		><path d="M2 21h6l6 -14h6" /><path d="M16 21h6" /><path d="m18 11 4-4-4-4" /></svg
	>
{:else if label == 'LUCIDE_DIAMOND'}
	<Diamond {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_LEFT'}
	<ArrowLeft {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_RIGHT'}
	<ArrowRight {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_UP'}
	<ArrowUp {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_DOWN'}
	<ArrowDown {size} {strokeWidth} />
{:else if label == 'LUCIDE_DELETE'}
	<Delete {size} {strokeWidth} />
{:else if label == 'LUCIDE_CORNER_DOWN_LEFT'}
	<CornerDownLeft {size} {strokeWidth} />
{:else if label == 'LUCIDE_SPACE'}
	<Space {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_BIG_UP_DASH'}
	<ArrowBigUpDash {size} {strokeWidth} />
{:else if label == 'LUCIDE_SUN_DIM'}
	<SunDim {size} {strokeWidth} />
{:else if label == 'LUCIDE_SUN'}
	<Sun {size} {strokeWidth} />
{:else if label == 'LUCIDE_VOLUME_2'}
	<Volume2 {size} {strokeWidth} />
{:else if label == 'LUCIDE_VOLUME_1'}
	<Volume1 {size} {strokeWidth} />
{:else if label == 'LUCIDE_VOLUME_OFF'}
	<VolumeOff {size} {strokeWidth} />
{:else if label == 'LUCIDE_POWER_OFF'}
	<PowerOff {size} {strokeWidth} />
{:else if label == 'LUCIDE_SKIP_BACK'}
	<SkipBack {size} {strokeWidth} />
{:else if label == 'LUCIDE_SKIP_FORWARD'}
	<SkipForward {size} {strokeWidth} />
{:else if label == 'LUCIDE_FAST_FORWARD'}
	<FastForward {size} {strokeWidth} />
{:else if label == 'LUCIDE_REWIND'}
	<Rewind {size} {strokeWidth} />
{:else if label == 'LUCIDE_PLAY'}
	<Play {size} {strokeWidth} />
{:else if label == 'LUCIDE_SQUARE_MENU'}
	<SquareMenu {size} {strokeWidth} />
{:else if label == 'LUCIDE_ARROW_LEFT_RIGHT_TO_LINE'}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width={strokeWidth}
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-arrow-left-right-to-line"
		><path d="M2 3V11" /><path d="M22 13v8" /><path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path
			d="m16 21 4-4-4-4"
		/><path d="M20 17H4" /></svg
	>
{/if}

<script lang="ts">
	import '../app.css';
	let { children } = $props();

	let darkMode = true;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<div class="absolute right-6 top-6">
	<input checked={darkMode} onclick={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
	<label for="theme-toggle"></label>
</div>

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply inline-block h-12 w-12 cursor-pointer rounded-full duration-300 content-[''];
	}

	#theme-toggle:not(:checked) + label {
		@apply bg-amber-300;
	}

	#theme-toggle:checked + label {
		@apply bg-transparent;
		box-shadow: inset -18px -18px theme('colors.amber.200');
	}
</style>

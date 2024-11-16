<script lang="ts">
    import JsonInput from '$lib/JsonInput.svelte'

    let data: object | undefined = $state(undefined);
</script>


<h1>keyboard-configurator</h1>

<JsonInput bind:data />

<script>
      import { Button } from 'flowbite-svelte';
    /**
	 * @type {boolean}
	 */
     export let disabled;
  </script>

<Button type="submit" class="w-full" color="blue" disabled={disabled}>
    <slot />
</Button>
  

  
<script>
  import Icon from "svelte-awesome";
  import { spinner } from "svelte-awesome/icons";
</script>

<div class="icon">
  <Icon data={spinner} spin />
</div>

<style>
  .icon {
    position: fixed;
    top: 0;
    right: 0;
    color: rgb(0 0 0);
    margin: 1em;
    z-index: 100000;
  }
</style>

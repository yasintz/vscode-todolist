<script>
  import { api } from "../utils/vscode";
  let path = "hello world";
  async function handleClick() {
    const result = await api("files");
    path = result.path;
  }
</script>

<style>
  div {
    color: white;
  }
</style>

<div on:click={handleClick}>Todo List : {path}</div>

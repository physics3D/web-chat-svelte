<script lang="ts">
  export let typing_users: string[];
  export let nickname: string;

  let typing_users_string = "";

  // this does the following
  // typing_users = ["alice", "bob", "christa"]
  // output: alice, bob and christa are typing
  //
  // typing_users = ["alice", "bob"]
  // output: alice and bob are typing
  //
  // typing_users = ["alice"]
  // output: alice is typing
  $: {
    // remove own username
    typing_users = typing_users.filter((username) => username !== nickname);

    if (typing_users.length >= 2) {
      typing_users_string =
        typing_users.slice(0, -1).join(", ") +
        " and " +
        typing_users[typing_users.length - 1] +
        " are typing";
    } else if (typing_users.length >= 1) {
      typing_users_string = typing_users[0] + " is typing";
    } else {
      typing_users_string = "";
    }
  }
</script>

<p>{typing_users_string}</p>

<style></style>

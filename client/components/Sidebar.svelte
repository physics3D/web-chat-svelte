<script lang="ts">
  import { createEventDispatcher } from "svelte";

  let dispatcher = createEventDispatcher();

  enum Page {
    Home,
    Register,
    Login,
    Chat,
    Settings,
  }

  let switchToHome = () => {
    dispatcher("switchPage", Page.Home);
  };

  let switchToRegister = () => {
    dispatcher("switchPage", Page.Register);
  };

  let switchToLogin = () => {
    dispatcher("switchPage", Page.Login);
  };

  let switchToChat = () => {
    dispatcher("switchPage", Page.Chat);
  };

  let switchToSettings = () => {
    dispatcher("switchPage", Page.Settings);
  };
</script>

<nav>
  <ul class="navbar">
    <li class="nav-item">
      <div class="nav-link" on:click={switchToHome}>
        <img src="assets/home.svg" alt="" /><span class="nav-text">Home</span>
      </div>
    </li>
    <li class="nav-item">
      <div class="nav-link" on:click={switchToLogin}>
        <img src="assets/login.svg" alt="" /><span class="nav-text">Login</span>
      </div>
    </li>
    <li class="nav-item">
      <div class="nav-link" on:click={switchToRegister}>
        <img src="assets/register.svg" alt="" /><span class="nav-text"
          >Register</span
        >
      </div>
    </li>
    <li class="nav-item">
      <div class="nav-link" on:click={switchToChat}>
        <img src="assets/chat.svg" alt="" /><span class="nav-text">Chat</span>
      </div>
    </li>
    <li class="nav-item">
      <div class="nav-link" on:click={switchToSettings}>
        <img src="assets/settings.svg" alt="" /><span class="nav-text"
          >Settings</span
        >
      </div>
    </li>
    <li class="nav-item">
      <a
        class="nav-link"
        href="https://github.com/physics3D/web-chat-svelte"
        target="_blank"
      >
        <img src="assets/github.png" alt="" /><span class="nav-text"
          >Github</span
        >
      </a>
    </li>
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    background-color: var(--dark-bg-color);
    width: var(--sidebar-width);
    transition: width 200ms ease;
    height: 100%;
    z-index: 1;
  }

  nav:hover {
    width: 16rem;
  }

  .navbar {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
    transition: background-color 200ms ease;
  }

  .nav-item:last-child {
    margin-top: auto;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-color);
    height: 5rem;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    height: 4rem;
    margin: 0 1rem;
  }

  .nav-text {
    display: none;
    margin-left: 1rem;
  }

  nav:hover .nav-text {
    display: block;
  }

  .nav-item:hover {
    background-color: var(--bg-color);
  }
</style>

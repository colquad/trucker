<script lang="ts">
    import type { PageServerData } from './$types';
	export let data: PageServerData;
	// @ts-ignore
    import { page } from '$app/stores'; // Import $page from SvelteKit stores
	// @ts-ignore
	import { Modal, Content, Trigger}  from "sv-popup"

    // @ts-ignore
    $:user = data.user[0]?data.user[0]:undefined;

</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Login to app" />
</svelte:head>

<h1>Settings</h1>

<div class = "info">
    <p>Name: {user.first_name} {user.last_name}</p>
    <p>Username: {user.username}</p>
    <p>Email: {user.email}</p>
</div>
<div class = "box">
    <section class = "update">
        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="firstname">
                        <h1>Change Your First Name</h1>
                        <form action="?/fname" method="post">
                            <label for="name">Update First Name</label>
                            <input type="name" name="fname" id="fname" placeholder="First Name" required>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change your first name?</button>
                </Trigger>
            </Modal>
        </div>

        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="lastname">
                        <h1>Change Your Last Name</h1>
                        <form action="?/lname" method="post">
                            <label for="name">Update Last Name</label>
                            <input type="name" name="lname" id="lname" placeholder="Last Name" required>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change your last name?</button>
                </Trigger>
            </Modal>
        </div>

        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="username">
                        <h1>Change Your Username</h1>
                        <form action="?/username" method="post">
                            <label for="username">New Username</label>
                            <input type="username" name="new-username" id="new-username" placeholder="New Username" required>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change your username?</button>
                </Trigger>
            </Modal>
        </div>

        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="password">
                        <h1>Change Your Password</h1>
                        <form action="?/password" method="post">
                            <label for="password">Old Password</label>
                            <input type="password" name="old-pass" id="old-pass" placeholder="Old Password" required>
                            <label for="password">New Password</label>
                            <input type="password" name="new-pass" id="new-pass" placeholder="New Password" required>
                            <label for="password">Confirm New Password</label>
                            <input type="password" name="confirm-pass" id="confirm-pass" placeholder="Confirm your Password" required>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change your password?</button>
                </Trigger>
            </Modal>
        </div>

        <div>
            <Modal basic big={false}>
                <Content>
                    <div id ="email">
                        <h1>Change Your E-Mail</h1>
                        <form action="?/email" method="post">
                            <label for="email">New E-Mail</label>
                            <input type="email" name="new-email" id="new-email" placeholder="New E-Mail" required>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>Change your e-mail?</button>
                </Trigger>
            </Modal>
        </div>

        <div>
            <Modal basic small={true}>
                <Content>
                    <div id ="delete">
                        <h1>Account Deletion</h1>
                        <form action="?/delete" method="post">
                            <label for="option">Are you sure?</label>
                            <input type="hidden" name="username" value="{user.username}">
                            <button type="submit">Yes</button>
                        </form>
                    </div>
                </Content>
                <Trigger>
                    <button>DELETE ACCOUNT</button>
                </Trigger>
            </Modal>
        </div>
    </section>
</div>
<style>
    .info {
        z-index: 1;
        background-color: white;
		text-align: center;
		justify-content: center;
		margin-left: 250px;
		margin-right: 250px;
		border-style: groove;
		border-color: black;
		padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
	}
    .box {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding:10px;
        margin: 10px;
    }
    .update {
        text-align: center;
        margin: 20px;
        background-color: white;
        padding:10px;
		border-radius: 25px;
		box-shadow: 0 10px 100px gray;
        display:flex;
    }
    #password {
        max-width: 400px;
        margin: 0 auto;
    }

    button {
		margin-top: 1rem;
        margin-bottom: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
	}
    
    form {
        margin-top: 10%;
        margin-bottom: 10%;
        display: flex;
        flex-direction: column;
    }
    form label {
        margin: 1rem 0;
    }
    form input {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px; 
    }
    form button {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
    }
</style>
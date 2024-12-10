
<script>
	// @ts-ignore
    import { page } from '$app/stores'; // Import $page from SvelteKit stores
	// @ts-ignore
	import { Modal, Content, Trigger}  from "sv-popup"
	import { _errorMessage } from './errorMessageStore';
    
    let error = '';
    _errorMessage.subscribe(value => {
    error = value; // This function runs whenever the value of errorMessage changes
    console.log('Error message:', error); // Log the value of error
  });
    let selectedValue = '';
    const types = [ 'Driver', 'Sponsor']
    

    let UT='';
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to app" />
</svelte:head>

<section>
    <div id ="login">
        <h1>Login</h1>
            <form action="?/login" method="post">
                <label for="email">Email/Username</label>
                <input type="text" name="emailuid" id="emailuid" placeholder="username/email" required>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="password" required>

                {#if error != ''}
                <p style="color: red;">{error}</p>
            {/if}

                <Modal basic>
                    <Content>
                        <div id="Reset Password">
                            <h1>Reset Your Password</h1>
                            <form action="" method="post">
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email" required>
                                <button type="submit">Reset password</button>
                            </form>
                        </div>
                    </Content>
                    <Trigger>
                        <p>Forgot password?</p>
                    </Trigger>
                </Modal>
                <button type="submit">Login</button>
            </form>
    </div>
    <div>
        <Modal basic small ={true}>
            <Content>
                <div id ="register">
                    <h1>Register</h1>
                    <form action="?/register" method="post">
                        <!-- svelte-ignore a11y-label-has-associated-control -->
                        <label>What User Are You?</label>
                        <select name="user-type" bind:value={UT}>
                            <option value="user-type" selected disabled>User Type</option>
                            {#each types as state}
                                <option value={state}>{state}</option>
                            {/each}
                        </select>
                        {#if UT == 'Sponsor'}
                            <label for="sponsor">Sponsorship</label>
                            <input type="sponsor" name="sponsor" id="sponsor" placeholder="Sponsor" required>
                        {/if}
                        <label for="first-name">First Name</label>
                        <input type="first-name" name="first-name" id="first-name" placeholder="First" required>
                        <label for="last-name">Last Name</label>
                        <input type="last-name" name="last-name" id="last-name" placeholder="Last" required>
                        <label for="username">Username</label>
                        <input type="username" name="username" id="username" placeholder="Create a username" required>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" required>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter a password" required>
                        <label for="password">Confirm Password</label>
                        <input type="password" name="password" id="password" placeholder="Confirm your password" required>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </Content>
            <Trigger>
                <p>Don't have an account?</p>
                <button>Register</button>
            </Trigger>
        </Modal>
    </div>
</section>
<style>
    #login {
        max-width: 400px;
        margin: 0 auto;
    }
    #register {
        max-width: 400px;
        
        margin: 0 auto;
    }
    form {
        padding-top:10%;
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
    select {
        border: 1px solid #ccc;
        width: 45%;
    }
</style>
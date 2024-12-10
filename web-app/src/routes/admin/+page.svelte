<script lang="ts">
	import { Modal, Content, Trigger}  from "sv-popup"
    import { DataHandler, Datatable } from '@vincjo/datatables'
    import type { PageServerData } from './$types';
	export let data: PageServerData;

    console.log(data.user);
    const handler = new DataHandler(data.user, { rowsPerPage: 10 })
    const rows = handler.getRows()

    let selectedValue = '';
    const types = [ 'Driver', 'Sponsor']

    let UT='';
</script>
<svelte:head>
	<title>Accounts</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="earnings_table">
        <Datatable {handler}>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>User Type</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>E-Mail</th>
                        <th>Password</th>
                        <th>Sponsor</th>
                        <th>Active?</th>
                        <th>Delete Account</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as row}
                        <tr>
                            <td>{row.user_id}</td>
                            <td>{row.user_type}</td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div id ="firstname">
                                            <h1>Edit First Name</h1>
                                            <form action="?/fname" method="post">
                                                <input type = "hidden" name = "id" value = {row.user_id}>
                                                <input type = "hidden" name = "username" value = {row.username}>
                                                <input type="name" name="fname" id="fname" placeholder="First Name" required>
                                                <button type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>{row.first_name}</u>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div id ="firstname">
                                            <h1>Edit Last Name</h1>
                                            <form action="?/lname" method="post">
                                                <input type = "hidden" name = "id" value = {row.user_id}>
                                                <input type = "hidden" name = "username" value = {row.username}>
                                                <input type="name" name="lname" id="lname" placeholder="Last Name" required>
                                                <button type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>{row.last_name}</u>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div id ="username">
                                            <h1>Edit Username</h1>
                                            <form action="?/username" method="post">
                                                <input type = "hidden" name = "id" value = {row.user_id}>
                                                <input type = "hidden" name = "username" value = {row.username}>
                                                <input type="username" name="new-username" id="new-username" placeholder="Username" required>
                                                <button type="submit">Submit</button>
                                            </form>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>{row.username}</u>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div id ="email">
                                            <h1>Edit E-Mail</h1>
                                            <div class = "popup_content">
                                                <form action="?/email" method="post">
                                                    <input type = "hidden" name = "id" value = {row.user_id}>
                                                    <input type = "hidden" name = "username" value = {row.username}>
                                                    <input type="email" name="new-email" id="new-email" placeholder="New E-Mail" required>
                                                    <button type="submit">Edit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>{row.email}</u>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div id ="password">
                                            <h1>Edit Password</h1>
                                            <div class = "popup_content">
                                                <form action="?/password" method="post">
                                                    <input type = "hidden" name = "id" value = {row.user_id}>
                                                    <input type = "hidden" name = "username" value = {row.username}>
                                                    <input type="password" name="new-pass" id="new-pass" placeholder="New Password" required>
                                                    <button type="submit">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <button>Edit</button>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>{row.sponsor_name??'--'}</td>
                            <td>{row.active_flag}</td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div>
                                            <h1>Are you sure?</h1>
                                            <div class = "popup_content">
                                                <form action="?/delete" method="post">
                                                    <input type = "hidden" name = "id" value = {row.user_id}>
                                                    <input type = "hidden" name = "username" value = {row.username}>
                                                    <button type="submit">Remove</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <button>Delete</button>
                                    </Trigger>
                                </Modal>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
    </Datatable>
</div>
<div>
    <Modal basic small = {true}>
        <Content>
            <div>
                <h1>Register</h1>
                <form action="?/register" method="post">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label>User Type</label>
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
                    <button type="submit">Add</button>
                </form>
            </div>
        </Content>
        <Trigger>
            <button>Add Account</button>
        </Trigger>
    </Modal>
</div>
<div>
    <Modal basic small = {true}>
        <Content>
            <div>
                <h1>Create Sponsor Organization</h1>
                <form action="?/createsponsor" method="post">
                    <!-- svelte-ignore a11y-label-has-associated-control -->
                    <label for="sponsor-name">Sponsor Name</label>
                    <input type="sponsor-name" name="sponsor-name" id="sponsor-name" placeholder="Organization Name" required>
                    <button type="submit">Add</button>
                </form>
            </div>
        </Content>
        <Trigger>
            <button>Add Sponsor Organization</button>
        </Trigger>
    </Modal>
</div>
<style>
    table, th, tr {
        border: 1px solid;
        /* padding: 5px; */
        text-align: center;
    }
    .popup_content {
        align-self: center;
    }
    button {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
    }
    form {
        display: flex;
        flex-direction: column;
    }
    form label {
        align-self: center;
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
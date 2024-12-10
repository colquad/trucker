<script lang="ts">
	import { Modal, Content, Trigger}  from "sv-popup"
    import { DataHandler, Datatable} from '@vincjo/datatables'
    import Th from '../Th.svelte';
    import ThFilter from '../ThFilter.svelte';
    import type { PageServerData } from './$types';
	export let data: PageServerData;
    const handler = new DataHandler(data.points, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>
<svelte:head>
	<title>Points</title>
	<meta name="description" content="About this app" />
</svelte:head>
<div class="earnings_table">
        <Datatable {handler}>
            <table>
                <thead>
                    <tr>
                        <Th id = "Th" {handler} orderBy="user_id">User</Th>
                        <Th id = "Th" {handler} orderBy="sponsor_id">Sponsor</Th>
                        <Th id = "Th"{handler} orderBy="points">Points</Th>
                        <th>Add</th>
                        <th>Remove</th>
                    </tr>
                    <tr>
                        <ThFilter {handler} filterBy="user_id" />
                        <ThFilter {handler} filterBy="Sponsor_Name" />
                        <ThFilter {handler} filterBy="points" />
                        <th>--</th>
                        <th>--</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as row}
                        <tr>
                            <td>{row.first_name+" "+    row.last_name}</td>
                            <td>{row.sponsor_name}</td>
                            <td>{row.points}</td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div>
                                            <h1>Add Points</h1>
                                            <div class = "popup_content">
                                                <form action="?/add" method="post">
                                                    <input type = "hidden" name = "Uid" value = {row.user_id}>
                                                    <input type = "hidden" name = "Sid" value = {row.sponsor_id}>
                                                    <!-- <label for="points"></label> -->
                                                    <input type="number" name="pointadd" id="pointadd" placeholder="Quantity" required min=0 oninput="validity.valid||(value='');"><br>
                                                    <input type="text" name="addreason" id="addreason" placeholder="Reason" required>
                                                    <button type="submit">Add</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>Add</u>
                                    </Trigger>
                                </Modal>
                            </td>
                            <td>
                                <Modal basic small = {true}>
                                    <Content>
                                        <div>
                                            <h1>Remove Points</h1>
                                            <div class = "popup_content">
                                                <form action="?/remove" method="post">
                                                    <input type = "hidden" name = "Uid" value = {row.user_id}>
                                                    <input type = "hidden" name = "Sid" value = {row.sponsor_id}>
                                                    <!-- <label for="points">Quantity Removed</label> -->
                                                    <input type = "number" name="pointremove" id="pointremove" placeholder="Quantity" required min=0 max={row.points} oninput="validity.valid||(value='');"><br>
                                                    <input type="text" name="removereason" id="removereason" placeholder="Reason" required>
                                                    <button type="submit">Remove</button>
                                                </form>
                                            </div>
                                        </div>
                                    </Content>
                                    <Trigger>
                                        <u>Remove</u>
                                    </Trigger>
                                </Modal>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
    </Datatable>
</div>
<style>
    table, td, th {
        border: 1px solid;
        /* padding: 5px; */
        text-align: center;
    }
    .popup_content {
        align-self: center;
    }

    u {
        padding: 0.5rem;
        /* border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee; */
    }

    form, input, button{
        text-align: center;
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
</style>
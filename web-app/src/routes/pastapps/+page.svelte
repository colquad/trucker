<script lang="ts">
    import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { Modal, Content, Trigger}  from "sv-popup"
    import { DataHandler, Datatable } from '@vincjo/datatables'

    console.log(data.app);
    const handler = new DataHandler(data.app, { rowsPerPage: 10 })
    const rows = handler.getRows()
</script>

<svelte:head>
	<title>Applications</title>
	<meta name="description" content="View pending applications as a sponsor" />
</svelte:head>

<h1>Reviewed Applications</h1>

<section>
    <div class="applications_table">
            <Datatable {handler}>
                <table>
                    <thead>
                        <tr>
                            <th>Driver Name</th>
                            <th>User ID</th>
                            <th>Decision</th>
                            <th>Decision Reason</th>
                            <th>Change Decision?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $rows as row}
                            <tr>
                                <td>{row.name}</td>
                                <td>{row.user_id}</td>
                                <td>{row.app_status}</td>
                                <td>{row.decision_reason}</td>
                                <td>
                                    <Modal basic small = {true}>
                                        <Content>
                                            <div class = "popup_content">
                                                <h1>{row.name}</h1>
                                                <p>Sponsor ID: {row.sponsor_id}</p>
                                                <p>Reason: {row.app_reason}</p>
                                                <form action="?/accept" method="post">
                                                    <input type="hidden" name="appID" value="{row.application_id}">
                                                    <input type="hidden" name="driverID" value="{row.user_id}">
                                                    <input type="hidden" name="sponsor" value="{row.sponsor_id}">
                                                    <input type="text" name="acceptreason" id="acceptreason" placeholder="Accept Reason" required>
                                                    <button type="submit">Accept</button>
                                                </form>
                                                <form action="?/reject" method="post">
                                                    <input type="hidden" name="appID" value="{row.application_id}">
                                                    <input type="hidden" name="driverID" value="{row.user_id}">
                                                    <input type="hidden" name="sponsor" value="{row.sponsor_id}">
                                                    <input type="text" name="rejectreason" id="rejectreason" placeholder="Reject Reason" required>
                                                    <button type="submit">Reject</button>
                                                </form>
                                            </div>
                                        </Content>
                                        <Trigger>
                                            <button>Review</button>
                                        </Trigger>
                                    </Modal>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
        </Datatable>
    </div>

    <div class = "past">
        <a href="/applications">View Pending Applications</a>
    </div>
</section>

<style>
     table, th, tr {
        border: 1px solid;
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
        margin-top: 10%;
        margin-bottom: 10%;
        display: flex;
        flex-direction: column;
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
    .past a {
        color: black;
        transition: .2s;
    }
</style>
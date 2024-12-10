<script lang="ts">
    import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { Modal, Content, Trigger }  from "sv-popup"
    import { DataHandler, Datatable, check } from '@vincjo/datatables'
    //import { DateInput } from 'date-picker-svelte'
    import Th from '../Th.svelte';
    import ThFilter from '../ThFilter.svelte';
    
    console.log(data.app);
    const handler = new DataHandler(data.app, { rowsPerPage: 10 })
    const rows = handler.getRows();
    let date = new Date();
    let value = '';
</script>

<svelte:head>
	<title>Logs</title>
	<meta name="description" content="View audit log" />
</svelte:head>

<h1>LOGS</h1>

<section>
    <div class="audit_log">
            <Datatable {handler}>
                <table>
                    <thead>
                        <tr>
                            <Th id = "Th" {handler} orderBy="log_id">Log ID</Th>
                            <Th id = "Th" {handler} orderBy="user_id">User ID</Th>
                            <Th id = "Th" {handler} orderBy="username">Username</Th>
                            <Th id = "Th" {handler} orderBy="action">Action</Th>
                            <Th id = "Th"{handler} orderBy="date">Date</Th>
                        </tr>
                        <tr>
                            <ThFilter {handler} filterBy="log_id" />
                            <ThFilter {handler} filterBy="user_id" />
                            <ThFilter {handler} filterBy="username" />
                            <ThFilter {handler} filterBy="action" />
                            <th>
                                <!-- <DateInput 
                                    bind:value={date}
                                    on:input={() => handler.filter(date, (row) =>new Date(row.date))}
                                /> -->
                                <input type="text" 
                                    bind:value 
                                    on:input={() => handler.filter(value, (row) => new Date(row.date).toLocaleString())}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $rows as row}
                            <tr>
                                <td>{row.log_id}</td>
                                <td>{row.user_id??'--'}</td>
                                <td>{row.username??'--'}</td>
								<td>
                                    <Modal basic small = {true}>
                                        <Content>
                                            <div>
                                                <h1>Log #{row.log_id}</h1>
                                                <div class = "popup_content">
                                                    {#if row.action == 'Login Failure' || row.action == 'Login Success'}
                                                        <p>Username Attempted: {row.user_attempt}</p>
                                                        <p>Password Attempted: {row.pass_attempt}</p>
                                                    {/if}
                                                    {#if row.action == 'First Name Change' || row.action == 'Last Name Change' ||
                                                    row.action == 'Username Change' || row.action == 'Password Change' || row.action == 'Email Change'}
                                                        <p>Changed to: {row.new_value}</p>
                                                    {/if}
                                                    {#if row.action == 'Account Deletion'}
                                                        <p>Account Deleted: {row.username}</p>
                                                    {/if}
                                                    {#if row.action == 'Points Added'}
                                                        <p>Point Change: {row.point_change}</p>
                                                    {/if}
                                                    {#if row.action == 'Points Removed'}
                                                        <p>Point Change: -{row.point_change}</p>
                                                    {/if}
                                                    {#if row.action == 'Application Accepted' || row.action == 'Application Denied'}
                                                        <p>Application ID: {row.app_id}</p>
                                                        <p>Application Sponsor ID: {row.application_sponsor_id}</p>
                                                        <p>Status: {row.app_status}</p>
                                                        <p>Reason: {row.app_reason}</p>
                                                    {/if}
                                                    <!-- <p>Changed to: {row.new_value??'--'}</p>
                                                    <p>Username Attempted: {row.user_attempt??'--'}</p>
                                                    <p>Password Attempted: {row.pass_attempt??'--'}</p>
                                                    <p>Application ID: {row.app_id??'--'}</p>
                                                    <p>Sponsor Applied to: {row.application_sponsor_id??'--'}</p>
                                                    <p>Application Decision: {row.app_status??'--'}</p>
                                                    <p>Decision Reason: {row.app_reason??'--'}</p> -->
                                                </div>
                                            </div>
                                        </Content>
                                        <Trigger>
                                            <u>{row.action}</u>
                                        </Trigger>
                                    </Modal>
                                </td>
								<td>{new Date(row.date).toLocaleString()}</td>
                        {/each}
                    </tbody>
                </table>
        </Datatable>
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

    form button {
        margin-top: 1rem;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: #eeeeee;
    }
</style>
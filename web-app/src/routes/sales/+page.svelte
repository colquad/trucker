<script lang="ts">
    import type { PageServerData } from './$types';
	export let data: PageServerData;
	import { Modal, Content, Trigger }  from "sv-popup"
    import { DataHandler, Datatable } from '@vincjo/datatables'
    import { DateInput } from 'date-picker-svelte'
    import Th from '../Th.svelte';
    import ThFilter from '../ThFilter.svelte';
    const handler = new DataHandler(data.order, { rowsPerPage: 10 })
    const rows = handler.getRows()
    let date = new Date();
    let value = '';
</script>

<svelte:head>
	<title>Sales</title>
	<meta name="description" content="View Sales" />
</svelte:head>

<h1>Sales</h1>

<section>
    <div class="audit_log">
            <Datatable {handler}>
                <table>
                    <thead>
                        <tr>
                            <Th id = "Th" {handler} orderBy="order_id">Order</Th>
                            <Th id = "Th" {handler} orderBy="user_id">User</Th>
                            <Th id = "Th"{handler} orderBy="total_price">Price</Th>
                            <Th id = "Th"{handler} orderBy="date">Date</Th>
                            <Th id = "Th"{handler} orderBy="address">Address</Th>
                        </tr>
                        <tr>
                            <ThFilter {handler} filterBy="order_id"/>
                            <ThFilter {handler} filterBy="user_id"/>
                            <ThFilter {handler} filterBy="total_price"/>
                            <th>
                                <!-- <DateInput 
                                    bind:value={date}
                                    on:input={() => handler.filter(date, (row) => , check.isLike)}
                                /> -->
                                <input type="text" 
                                    bind:value 
                                    on:input={() => handler.filter(value, (row) => new Date(row.date).toLocaleString())}
                                />
                            </th>
                            <ThFilter {handler} filterBy="address"/>
                        </tr>
                    </thead>
                    <tbody>
                        {#each $rows as row}
                            <tr>
                                <td>{row.order_id}</td>
                                <td>{row.user_name}</td>
								<td>{row.total_price}</td>
                                <td>{row.date}</td>
                                <td>{row.address}</td>
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
<script lang="ts">
  // p
  export let currencyOptions: Record<string, string>;
  export let selectedCurrency: string;
  export let onChangeCurrency: (event: Event) => void;
  export let onChangeAmount: (event: Event) => void;
  export let amount: number;

</script>

<div class="card">
  <input class="card__input" type="number" bind:value={amount} on:input={onChangeAmount} />
  <select class="card__select" bind:value={selectedCurrency} on:change={onChangeCurrency}>
    {#each Object.values(currencyOptions) as currency}
      <option value={currency}>{currency}</option>
    {/each}
  </select>
</div>


<style>
  .card{
    width: 100%;
    height: 40%;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    display: flex;
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
    justify-content: space-between;
  }
  .card__input{
    height: 90%;
    width: 80%;
    border-radius: 10px;
    border: none;
    background-color: white;
    color: black;
    font-size: 30px;
    font-weight: 600;

  }
  .card__select{
    height: 90%;
    width: 20%;
    background-color: white;
    color: black;
    font-size: 20px;
    font-weight: 600;
    /* border-radius: 10px; */
    border: none;
  }
</style>
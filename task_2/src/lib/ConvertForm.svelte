<script lang="ts">
  import { onMount } from "svelte";
  import CurrencyCard from "./CurrencyCard.svelte";
  const API = 'https://open.er-api.com/v6/latest/USD';
  let firstCurrency;
  let currencyOptions = {};
  let fromCurrency: string;
  let toCurrency: string;
  let exchangeRate: number;
  let amount = 1;
  let amountInFromCurrency = true;

  let toAmount: number, fromAmount: number;

  $: if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // Like useEffect with empty depandencies
  onMount(async () => {
    fetch(API)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        firstCurrency = Object.keys(data.rates)[0];
        currencyOptions = Object.keys(data.rates);
        fromCurrency = data.base_code;
        toCurrency = firstCurrency;
        exchangeRate = data.rates[firstCurrency];
      })
  });

  // Like useEffect with dependencies array
  $: if (fromCurrency && toCurrency && fromCurrency !== toCurrency) {
    fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
    .then(res => res.json())
    .then(data => {
        exchangeRate = data.rates[toCurrency];
    })
    .catch(error => console.error('Ошибка'));
  } else {
    exchangeRate = 1;
  }

  function handleFromAmountChange(e: Event) {
    amount = parseFloat((e.target as HTMLInputElement).value);
    amountInFromCurrency = true;
  }

  function handleToAmountChange(e: Event) {
    amount = parseFloat((e.target as HTMLInputElement).value);
    amountInFromCurrency = false;
  }

  function onChangeFromCurrency(event: Event) {
    fromCurrency = (event.target as HTMLSelectElement).value;
  }

  function onChangeToCurrency(event: Event) {
    toCurrency = (event.target as HTMLSelectElement).value;
  }

</script>

<div class="convert-form">
  <p class="title">Конвертер валют</p>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="150" height="150" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M160 0C71.634 0 0 71.634 0 160s71.634 160 160 160a10.663 10.663 0 0 0 7.552-3.115l149.333-149.333A10.668 10.668 0 0 0 320 160C319.906 71.673 248.327.094 160 0z" style="" fill="#ffa000" data-original="#ffa000"></path><path d="M330.667 149.333c-100.148 0-181.333 81.186-181.333 181.333S230.519 512 330.667 512 512 430.814 512 330.667c-.118-100.099-81.234-181.216-181.333-181.334z" style="" fill="#ffc107" data-original="#ffc107"></path><path d="M160 469.333c-44.065-2.31-81.304-33.454-91.371-76.416L91.2 404.203c5.272 2.633 11.681.494 14.315-4.779 2.633-5.272.494-11.681-4.779-14.315l-42.667-21.333c-.299-.149-.64-.128-.96-.256a10.842 10.842 0 0 0-4.267-.704 9.716 9.716 0 0 0-1.024 0c-.333.097-.66.211-.981.341a10.664 10.664 0 0 0-6.592 4.715c-.171.277-.448.469-.597.768l-21.333 42.667c-2.634 5.269-.498 11.676 4.771 14.311l.008.004a10.54 10.54 0 0 0 4.907 1.045 10.666 10.666 0 0 0 9.557-5.888l8.277-16.555c14.117 49.638 58.594 84.538 110.165 86.443 5.891 0 10.667-4.776 10.667-10.667s-4.776-10.667-10.667-10.667zM484.779 86.421c-5.269-2.634-11.676-.498-14.311 4.771l-.004.008-8.277 16.555C448.06 58.118 403.573 23.226 352 21.333c-5.891 0-10.667 4.776-10.667 10.667S346.109 42.667 352 42.667c44.044 2.314 81.268 33.436 91.349 76.373l-22.571-11.285c-5.272-2.633-11.681-.494-14.315 4.779-2.633 5.272-.494 11.681 4.779 14.315l42.667 21.333h.448a10.441 10.441 0 0 0 4.309 1.152 10.284 10.284 0 0 0 5.504-1.536l.192-.171a10.512 10.512 0 0 0 3.392-3.669c.128-.213.363-.299.469-.512l21.333-42.667c2.653-5.26.54-11.674-4.719-14.328l-.058-.03z" style="" fill="#455a64" data-original="#455a64" class=""></path><path d="M341.333 320.747v-64c24 3.051 42.667 16.149 42.667 31.317 0 5.891 4.776 10.667 10.667 10.667s10.667-4.776 10.667-10.667c0-27.307-27.413-49.067-64-52.587V224c0-5.891-4.776-10.667-10.667-10.667S320 218.109 320 224v11.413c-36.587 3.627-64 25.28-64 52.587 0 27.307 27.413 49.067 64 52.587v64c-24-3.051-42.667-16.149-42.667-31.317 0-5.891-4.776-10.667-10.667-10.667s-10.667 4.776-10.667 10.667c0 27.307 27.413 49.067 64 52.587v11.477c0 5.891 4.776 10.667 10.667 10.667s10.667-4.776 10.667-10.667V425.92c36.587-3.627 64-25.28 64-52.587s-27.413-49.066-64-52.586zm-64-32.747c0-15.168 18.667-28.267 42.667-31.317v62.656c-24-3.072-42.667-16.171-42.667-31.339zm64 116.651v-62.635c24 3.051 42.667 16.149 42.667 31.317s-18.667 28.267-42.667 31.318z" style="" fill="#fafafa" data-original="#fafafa"></path><path d="M160 256c-41.856 0-74.667-23.467-74.667-53.333v-85.333C85.333 87.467 118.144 64 160 64s74.667 23.467 74.667 53.333c0 5.891-4.776 10.667-10.667 10.667s-10.667-4.776-10.667-10.667c0-17.344-24.427-32-53.333-32s-53.333 14.656-53.333 32v85.333c0 17.344 24.427 32 53.333 32 5.891 0 10.667 4.776 10.667 10.667S165.891 256 160 256z" style="" fill="#eceff1" data-original="#eceff1"></path><path d="M181.333 149.333H74.667c-5.891 0-10.667-4.776-10.667-10.667S68.776 128 74.667 128h106.667c5.891 0 10.667 4.776 10.667 10.667s-4.777 10.666-10.668 10.666zM181.333 192H74.667C68.776 192 64 187.224 64 181.333s4.776-10.667 10.667-10.667h106.667c5.891 0 10.667 4.776 10.667 10.667C192 187.224 187.224 192 181.333 192z" style="" fill="#eceff1" data-original="#eceff1"></path></g></svg>
  <CurrencyCard
    currencyOptions={currencyOptions}
    selectedCurrency={fromCurrency}
    onChangeCurrency={onChangeFromCurrency}
    onChangeAmount={handleFromAmountChange}
    amount={fromAmount}
  />
  <CurrencyCard
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={onChangeToCurrency}
    onChangeAmount={handleToAmountChange}
    amount={toAmount}
  />
</div>


<style>
  .convert-form{
    height: 300px;
    width: 100%;
    margin: auto;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 50px;
    gap: 10px;
  }
  .title{
    font-size: 30px;
    font-weight: 600;
    margin: 0;
    margin-bottom: 20px;
  }
</style>
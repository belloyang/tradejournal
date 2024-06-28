<script>

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const dayOfWeek = daysOfWeek[currentDate.getDay()];
$: today = dayOfWeek + ' ' + formattedDate;
</script>

<div style="text-align: center;">
    <p style="font-size:medium">Today is {today}</p>
    {#if dayOfWeek === 'Friday'}
        <h1>TGIF, Happy Friday!</h1>
    {:else if dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'}
        <h1>Have a nice weekend!</h1>
    {:else}
        <h1>Happy {dayOfWeek}!</h1>
    {/if}
   
</div>
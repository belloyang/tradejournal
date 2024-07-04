<script lang="ts">
    import { onMount } from 'svelte';
  
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let daysInMonth: (number | string)[] = [];
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    function getDaysInMonth(year: number, month: number) {
      return new Date(year, month + 1, 0).getDate();
    }
  
    function generateCalendar(year: number, month: number) {
      const days = getDaysInMonth(year, month);
      const firstDay = new Date(year, month, 1).getDay();
      const calendarDays: ( number | string )[] = [];
      let dayCount = 1;
  
      // Fill in the days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        calendarDays.push('');
      }
  
      // Fill in the days of the month
      while (dayCount <= days) {
        calendarDays.push(dayCount++);
      }
  
      daysInMonth = calendarDays;
    }
  
    function prevMonth() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      generateCalendar(currentYear, currentMonth);
    }
  
    function nextMonth() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      generateCalendar(currentYear, currentMonth);
    }
  
    onMount(() => {
      generateCalendar(currentYear, currentMonth);
    });
  </script>
  
  <style>
    .calendar {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .calendar-header {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 1em;
      background-color: #f0f0f0;
    }
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1em;
      padding: 1em;
    }
    .calendar-day {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2em;
      height: 2em;
      border-radius: 50%;
    }
    .calendar-day:not(:empty) {
      background-color: #e0e0e0;
    }
  </style>
  
  <div class="calendar">
    <div class="calendar-header">
      <button on:click={prevMonth}>&lt;</button>
      <div>{monthNames[currentMonth]} {currentYear}</div>
      <button on:click={nextMonth}>&gt;</button>
    </div>
    <div class="calendar-grid">
      {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
        <div class="calendar-day-header">{day}</div>
      {/each}
      {#each daysInMonth as day}
        <div class="calendar-day">{day}</div>
      {/each}
    </div>
  </div>
  
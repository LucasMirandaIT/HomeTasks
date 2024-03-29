<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/vue3';
import AddEventOnCalendar from '@/components/modals/AddEventOnCalendar.vue';
import BaseModal from '@/components/BaseModal.vue';
import ptBRLocale from '@fullcalendar/core/locales/pt-br';
import { Months } from '@/constants/utils';
import { useEventsStore } from '@/stores/events';
import { useUsersStore } from '@/stores/users';

const eventStore = useEventsStore();
const usersStore = useUsersStore();

const eventsList = computed(() => eventStore.events);

// Calendar options
const calendarOptions = ref({
  initialView: window?.innerWidth < 768 ? 'dayGridDay' : 'dayGridWeek',
  headerToolbar: {
    left: 'prev',
    center: 'title',
    right: 'next',
  },
  events: eventsList.value || [],
  locale: ptBRLocale,
  contentHeight: '60vh',
  plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
  displayEventTime: true,
  slotDuration: '01:00:00',
  selectable: true,
  eventInteractive: true,
  titleFormat: (date: any) => {
    const formattedStart = `${date.start.day} de ${
      Months[date.start.month]
    } de ${date.start.year}`;
    const formattedEnd = `${date.end.day} de ${Months[date.end.month]} de ${
      date.end.year
    }`;

    const dateToShow = window?.innerWidth < 768 ? formattedStart : formattedStart + ' - ' + formattedEnd;
    return dateToShow;
  },
  dateClick: (data: any) => {
    modalOpened.value = true;
    modalData.value = { ...modalData.value, selectedDate: data.date };
  },
  eventClick: (info: any) => {},
  eventContent: (info: any) => {
    return {
      html: `
    <div class="fc-event-title">${info.event.title}</div>
    <div class="fc-event-owner-picture">
    <span>${getOwnerName(info.event.extendedProps.task.owner)}</span>
    <img src="${getOwnerPhoto(info.event.extendedProps.task.owner)}"/>
    </div>
    `,
    };
  },
});

const getOwnerName = (ownerId: string) => {
  return usersStore.users.filter((user) => user._id === ownerId)[0].name;
};
const getOwnerPhoto = (ownerId: string) => {
  return usersStore.users.filter((user) => user._id === ownerId)[0].picture;
};

const modalOpened = ref(false);

const modalData = ref<any>({});

const closeModal = async () => {
  modalOpened.value = false;
};

const firstTask = () => {
  const today = new Date();
  modalOpened.value = true;
  modalData.value = { ...modalData.value, selectedDate: today };
};

watch(() => eventsList.value, () => {
  calendarOptions.value.events = eventsList as any;
});

onMounted(async () => {
  await usersStore.fetchUsers();
  await eventStore.fetchEvents();
});

</script>

<style lang="scss">
.fc .fc-daygrid-event {
  background-color: #aeffae;
  padding: 16px 8px;
}

.fc-event {
  flex-direction: column;
}

.fc-event-time {
  display: none;
}

.fc-event-owner-picture {
  margin-top: 16px;
  align-self: flex-end;

  display: flex;
  align-items: center;
  gap: 8px;
  img {
    border-radius: 50%;
    width: 4vw;
  }
}

.fc-daygrid-day-events {
  .fc-daygrid-event-harness {
    margin-top: 8px !important;
  }
}
</style>

<template>
<template v-if="eventsList.length > 0">
    <FullCalendar :options="calendarOptions" />
</template>
<template v-else>
  <p>
  Você ainda não possui tarefas cadastradas.
  </p>
  <button @click="firstTask()">Cadastre a primeira</button>
</template>

  <BaseModal
    :active="modalOpened"
    @close="closeModal()"
  >
    <AddEventOnCalendar @close="closeModal()" :selectedDate="modalData.selectedDate" />
  </BaseModal>
</template>
~/stores/events
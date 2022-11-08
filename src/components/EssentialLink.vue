<template>
  <q-item
    clickable
    :to="link"
    :disable="title != user.role.name && user.role.name != 'Propietario'"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" color="negative" />
    </q-item-section>

    <q-item-section >
      <q-item-label >{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { useStore } from 'src/store';
import { defineComponent,computed } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const $store = useStore()
    
    const user = computed(()=> $store.getters['propietario/getUsuarioLogeado'])

    return{
      user
    }
  }
});
</script>

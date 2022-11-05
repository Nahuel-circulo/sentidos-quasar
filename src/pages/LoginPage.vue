<template>
  <q-page class="row items-center justify-center">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Usuario"
        hint="Nombre de usuario"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor ingrese nombre de usuario',
        ]"
      />

      <q-input
        v-model="password"
        filled
        label="Contraseña"
        :type="isPwd ? 'password' : 'text'"
        hint="Contraseña"
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Por favor ingrese su contraseña',
        ]"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Ingresar" type="submit" color="primary" />
        <q-btn
          label="Reiniciar"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const accept = ref(false);
    const password = ref("");
    const isPwd = ref(true);

    return {
      name,
      accept,
      password,
      isPwd,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
      },
    };
  },
});
</script>

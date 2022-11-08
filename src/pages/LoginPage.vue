<template>
  <q-page class="column flex-column items-center justify-center">

      <q-img  src="../assets/logo.svg" width="500px"> </q-img>


    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Email"
        hint="Email"
        lazy-rules
        :rules="[
          (val) =>
            emailValidation.test(val) || 'Por favor ingrese un email valido',
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
            (val && val.length >= 8) || 'Por favor ingrese su contraseña',
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
        <q-btn  label="Ingresar" type="submit" color="positive" />
        <q-btn

          label="Reiniciar"
          type="reset"
          color="info"
          flat
          class="q-ml-sm"
        />
      </div>
      <p></p>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "src/store";
import { Personal } from '../store/propietario/state';
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const $router = useRouter()
    const name = ref(null);
    const password = ref("");
    const isPwd = ref(true);
    const $store = useStore();
    const usuarioLogeado = computed(
      () => $store.getters["propietario/getUsuarioLogeado"]
    );
    const errorMessage = computed(
      () => $store.getters["propietario/getErrorMessage"]
    );

    const emailValidation = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

    const onReset = () => {
      name.value = null;
      password.value = "";
    };

    watch(errorMessage, (newValue: string, oldValue: string) => {
      console.log("ejecuta");
      if (newValue != "") {
        $q.notify({
          color: "red-4",
          textColor: "white",
          icon: "error",
          message: "Usuario o contraseña incorrecto",
        });
        onReset();
      }
    });

    watch(usuarioLogeado,(newValue:Personal)=>{
      if (newValue) {
        console.log(newValue.name)
        $router.push(`/${newValue.role.name.toLowerCase()}`)
      }
    })

    return {
      name,
      password,
      isPwd,
      emailValidation,
      usuarioLogeado,
      errorMessage,
      onReset,

      onSubmit() {
        $store.commit("propietario/SET_ERROR_MESSAGE", "");
        $store.dispatch("propietario/login", {
          email: name.value,
          password: password.value,
        });
      },
    };
  },
});
</script>

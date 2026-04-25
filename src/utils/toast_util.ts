import { useToast, TYPE } from "vue-toastification";
import { h } from "vue";
import { VIcon } from "vuetify/components";

const toast = useToast();

export const sendToast = (message: string) => {
  toast(message, {
    type: TYPE.DEFAULT,
    icon: h(VIcon, { icon: "mdi-information" }),
  });
};

export const sendSuccessToast = (message: string) => {
  toast(message, {
    type: TYPE.SUCCESS,
    icon: h(VIcon, { icon: "mdi-check-circle" }),
  });
};

export const sendErrorToast = (message: string) => {
  toast(message, {
    type: TYPE.ERROR,
    icon: h(VIcon, { icon: "mdi-alert-circle" }),
  });
};

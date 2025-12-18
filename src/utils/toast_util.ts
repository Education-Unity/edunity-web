import { useToast, TYPE } from "vue-toastification";
import { h } from "vue";
import { VIcon } from "vuetify/components";

const toast = useToast();

export const sendToast = (message: string) => {
  toast(message, {
    type: TYPE.DEFAULT,
    icon: h(VIcon, { icon: "mdi-information" }),
    toastStyle: {
      backgroundColor: "#e0f7fa",
      color: "#006064",
    },
  });
};

export const sendSuccessToast = (message: string) => {
  toast(message, {
    type: TYPE.SUCCESS,
    icon: h(VIcon, { icon: "mdi-check-circle" }),
    toastStyle: {
      backgroundColor: "#e8f5e9",
      color: "#1b5e20",
    },
  });
};

export const sendErrorToast = (message: string) => {
  toast(message, {
    type: TYPE.ERROR,
    icon: h(VIcon, { icon: "mdi-alert-circle" }),
    toastStyle: {
      backgroundColor: "#ffebee",
      color: "#b71c1c",
    },
  });
};

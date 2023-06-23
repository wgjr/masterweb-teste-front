import "./styles/quasar.sass";
import "@quasar/extras/mdi-v4/mdi-v4.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-symbols-rounded/material-symbols-rounded.css";
import { AddressbarColor, Loading, QSpinnerBall, Notify, Dialog, Meta } from "quasar";


// To be used on app.use(Quasar, { ... })
export default {
    plugins: { AddressbarColor, Loading, Notify, Dialog, Meta },
    config: {
        dark: "off",
        loading: {
            spinner: QSpinnerBall,
            spinnerColor: "primary",
            spinnerSize: 140,
            backgroundColor: "white",
        },
    }
};

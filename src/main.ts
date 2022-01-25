import "normalize.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

library.add(faSpinner);

import { createApp } from "vue";
import Root from "./Root.vue";

createApp(Root).mount("#root");

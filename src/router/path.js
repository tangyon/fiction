import Details from "../views/details.vue"
import Seek from "../views/seek.vue"
import Home from "../views/home.vue"
import Read from "../views/read.vue"
import Changing from "../views/changing.vue"
import Regard from "../views/regard.vue"
export default [

    {
      path: "/seek",
      name: "Seek",
      component: Seek
    },
    {
      path: "/details",
      name: "Details",
      component: Details
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/read",
      name: "Read",
      component: Read
    },
    {
      path: "/changing",
      name: "Changing",
      component: Changing
    },
    {
      path: "/regard",
      name: "Regard",
      component: Regard
    },
  ]
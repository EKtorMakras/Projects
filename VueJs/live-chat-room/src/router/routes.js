import WelcomeView from "@/views/WelcomeView.vue";
import ChatRoomView from "@/views/ChatRoomView.vue";

export default [
    {
        path: "/",
        name: "welcome",
        component: WelcomeView,
    },
    {
        path: "/chatroom",
        name: "chatroom",
        component: ChatRoomView,
    },
];

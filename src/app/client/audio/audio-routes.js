export default [
    {
        path: "/audio",
        name: "Распознавание голоса",
        component: () => import("./views/AudioRecorder"),
    },
];

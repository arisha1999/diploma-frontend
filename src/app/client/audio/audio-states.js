import { AxiosClient } from '@/app/shared/services';

const state = {
    result: {
        text: "Здесь будет расшифровка аудиозаписи",
        isLoading: false,
        isSuccess: false,
    },
    currentAudio: {},
};

const getters = {
    CURRENT_AUDIO: (state) => state.currentAudio,
    RESULT: (state) => state.result.text,
    IS_RESULT_LOADING: (state) => state.result.isLoading,
    IS_RESULT_SUCCESS: (state) => state.result.isSuccess,
};

const mutations = {
    SET_RESULT: (state, result) => {
        state.result.text = result;
    },
    SET_CURRENT_AUDIO: (state, audio) => {
        state.currentAudio = audio;
    },
    SET_RESULT_LOADING: (state, isLoading) => {
        state.result.isLoading = isLoading;
    },
    SET_RESULT_LOADING_SUCCESS: (state, isSuccess) => {
        state.result.isSuccess = isSuccess;
    },
};

const actions = {
    SEND_AUDIO: (context, params) => {
        context.commit("SET_RESULT_LOADING", false);
        let formData = new FormData();
        if (context.state.currentAudio && Object.prototype.hasOwnProperty.call(context.state.currentAudio, "blob") && Object.prototype.hasOwnProperty.call(context.state.currentAudio, "url") && context.state.currentAudio.blob instanceof Blob && context.state.currentAudio.url !== null) {
            formData.append('record', context.state.currentAudio.blob, `${context.state.currentAudio.name}.wav`);
        }
        formData.append('libType', params['libType']);
        formData.append('typeOfDataset', params['typeOfDataset']);
        formData.append('noiseReduction', params['noiseReduction']);
        formData.append('dataType', params['dataType']);
        return new Promise((resolve, reject) => {
            AxiosClient.post("/audio/send",formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((data) => {
                    context.commit("SET_RESULT", data.data);
                    context.commit("SET_RESULT_LOADING_SUCCESS", true);
                    resolve();
                })
                .catch(() => {
                    reject();
                })
                .finally(() => {
                    context.commit("SET_RESULT_LOADING", false);
                });
        });
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
};
<template>
  <div>
    <div class="columns">
      <div class="column">
        <h2 class="title is-3">Выберите параметры модели и способ уменьшения шумов на аудиозаписи</h2>
      </div>
    </div>
    <div>
      <div class="columns">
        <div class="column">
          <v-select
              outlined
              dense
              hide-details
              :items="dataType"
              item-value="value"
              item-text="name"
              label="Тип входных данных"
              v-model="params.dataType"
          ></v-select>
        </div>
        <div class="column">
          <v-select
              outlined
              dense
              hide-details
              :items="libType"
              item-value="value"
              item-text="name"
              label="Тип библиотеки"
              v-model="params.libType"
          ></v-select>
        </div>
        <div class="column">
          <v-select
              outlined
              dense
              hide-details
              clearable
              :items="noiseReduction"
              item-value="value"
              item-text="name"
              label="Способ уменьшения шума"
              v-model="params.noiseReduction"
          ></v-select>
        </div>
        <div class="column">
          <v-select
              outlined
              dense
              hide-details
              :items="typeOfDataset"
              item-value="value"
              item-text="name"
              label="Тип dataset"
              v-model="params.typeOfDataset"
          ></v-select>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <audio-recorder
              upload-url="/api/audio/send"
              :attempts="1"
              :sample-rate="16000"
              :time="2"
              filename="new_audio"
              :after-recording="callback"
              :start-upload="callback"
          />
        </div>
        <div class="column">
          <v-textarea label="Правила тестирования" auto-grow readonly outlined dense hide-details v-model="rules"></v-textarea>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-half">
          <v-btn @click="sendToAnalyze()">Отправить аудиозапись на расшифровку</v-btn>
        </div>
      </div>
      <div class="columns is-centered">
        <div class="column">
          <v-textarea label="Расшифровка текста с аудиозаписи" auto-grow readonly outlined dense hide-details v-model="result"></v-textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioPage",
  data() {
    return {
      params: {},
      libType: [
        {name: 'Keras', value: 'keras'},
        {name: 'Scipy', value: 'scipy'},
      ],
      typeOfDataset: [
        {name: 'С шумом', value: 'with_noise'},
        {name: 'Без шума', value: 'without_noise'},
      ],
      noiseReduction: [
        {name: 'Спектральное вычитание', value: 'fft'},
        {name: 'Ускоренное спектральное вычитание', value: 'rfft'},
        {name: 'Фильтр Винера', value: 'wiener_filter'},
        {name: 'Алгоритм наименьшего среднего квадрата(LMS)', value: 'lms'},
        {name: 'Алгоритм рекурсивных наименьших квадратов(RLS)', value: 'rls'},
        {name: 'Алгоритм нормализованного наименьшего среднего квадрата(NLMS)', value: 'nlms'},
      ],
      dataType: [
        {name: 'Мел-кепстральный анализ', value: 'mfcc'},
        {name: 'Кепстральный анализ', value: 'fcc'},
        {name: 'Частотный анализ', value: 'fft'},
        {name: 'Кратковременный анализ Фурье', value: 'stft'},
      ],
      rules: `
        1. Сначала запишите звук, а потом нажимайте на кнопку расшифровки.
        2. Данные модели расшифровывают только следующие английские слова:
        3. Можно говорить несколько или одно слово на аудиозаписи.
        4. Говорите четко и громко, не быстро, в вашем обычном темпе, делайте небольшие паузы между словами.
      `
    };
  },
  created() {
    this.params = {
      libType: "keras",
      typeOfDataset: "without_noise",
      noiseReduction: "fft",
      dataType: "mfcc"
    };
    this.$store.dispatch("GET_RESULT");
    this.$store.dispatch("GET_CURRENT_AUDIO");
  },
  computed:{
    result: {
      get() {
        return this.$store.getters.RESULT;
      },
      set(value) {
        this.$store.commit("SET_RESULT", value);
      },
    },
    currentAudio: {
      get() {
        return this.$store.getters.CURRENT_AUDIO;
      },
      set(value) {
        this.$store.commit("SET_CURRENT_AUDIO", value);
      },
    },
  },
  methods: {
    callback (audio) {
      this.$store.commit("SET_CURRENT_AUDIO", audio);
    },
    sendToAnalyze(){
      if (this.currentAudio['url'] === undefined){
        alert('Запишите аудиозапись');
      }
      else {
        this.$store.dispatch("SEND_AUDIO", this.params);
      }
    },
  },
};
</script>

<style>
.draggable-item {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 10px;
  background-color: #fff;
}
</style>

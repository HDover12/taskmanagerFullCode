<template>
  <div id="container">
    <div id="welcometext">
      <h2>Welcome to my task managment app demo</h2>
      <h6>
        This app was built by Hannah Dover using VueJs, Vueitfy and the
        weather.gov api
      </h6>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherComponent",
  data() {
    return {};
  },
};
</script>

<style>
#container {
  background-color: rgba(33, 33, 33, 0.8);
  width: 93vw;
  height: 89vh;
  border-radius: 30px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: inset 0px 0px 35px 35px rgba(0, 0, 0, 70%);
  opacity: 90%;
}

#welcometext {
  font-size: 2rem;
  width: 80%;
  text-align: center;
  font-family: "Poynter Bold";
  padding: 10px;
  text-shadow: 0px 0px 15px black;
}
</style>

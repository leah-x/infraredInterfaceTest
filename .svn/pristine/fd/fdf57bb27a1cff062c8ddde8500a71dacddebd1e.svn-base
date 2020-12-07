<template>
  <div class="hello">HelloWorld</div>
</template>

<script>
export default {
  name: "HelloWorld",
  created() {
    this.$api.get('/User/getUserInfoById?useId=3', null, r => {
    console.log(r.result);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

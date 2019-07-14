<template>
  <div class="claim-wrapper">
    <h1 class="claim">SPACER</h1>
    <p class="subclaim">
      Begin your journey through our amazing galaxy,
      and discover places you never even heard of.
    </p>
    <p class="subclaim">
      Type anything space-related to start.
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Claim',
  };
</script>

<style lang="scss" scoped>
  .claim-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .claim {
    font-size: 50px;

    @media (min-width: 768px) {
      font-size: 80px;
    }

    @media (min-width: 1024px) {
      font-size: 100px;
    }
  }

  .subclaim {
    margin-top: 15px;
    font-weight: 400;
    font-size: 13px;

    @media (min-width: 768px) {
      font-size: 17px;
      width: 500px;
      line-height: 1;
      letter-spacing: 1px;
    }
  }
</style>

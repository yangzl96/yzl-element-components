<template>
  <div style="display: flex">
    <div style="width: 200px">
      <m-menu :data="data1"></m-menu>
    </div>
    <div style="width: 200px; margin-left: 60px">
      <m-infinite-menu
        :data="data2"
        default-active="1"
        active-text-color="red"
      ></m-infinite-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
const data1 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document',
  },
  {
    name: '导航2',
    index: '2',
    icon: 'Document',
  },
  {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
      },
    ],
  },
]
const data2 = [
  {
    name: '导航1',
    index: '1',
    icon: 'Document',
  },
  {
    name: '导航2',
    index: '2',
    icon: 'Document',
  },
  {
    name: '导航3',
    index: '3',
    icon: 'Document',
    children: [
      {
        name: '导航3-1',
        index: '3-1',
        icon: 'Document',
        children: [
          {
            name: '导航3-1-1',
            index: '3-1-1',
            icon: 'Document',
            children: [
              {
                name: '导航3-1-1-1',
                index: '3-1-1-1',
                icon: 'Document',
                children: [
                  {
                    name: '导航3-1-1-1-1',
                    index: '3-1-1-1-1',
                    icon: 'Document',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
</script>

<style scoped lang="scss"></style>

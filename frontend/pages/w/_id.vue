<template>
    <h1>내용 들어갈곳</h1>
</template>
<script>
export default {
    mounted() {
        this.setStore();
        // 문서 내용 패치해올것
    },
    computed: {
        docId() {
            return this.$route.params.id;
        }
    },
    methods: {
        setStore() {
            this.$store.commit('setDocumentNamespace', '문서');
            this.$store.commit('setDocumentTitle', this.docId);
        }
    }
}
</script>

export const state = () => ({
    page: {
        data: {
            document: {
                namespace: '',
                title: ''
            }
        }
    }
})
  
export const mutations = {
    setDocumentNamespace(state, namespace) {
        state.page.data.document.namespace = namespace
    },
    setDocumentTitle(state, title) {
        state.page.data.document.title = title
    }
}
  
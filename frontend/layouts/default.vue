<template>
    <div class="Liberty">
        <div id="top"></div>
        <h1>layout</h1>
        <nav>
            <nuxt-link to="/">theseed</nuxt-link>
            <nuxt-link to="/w/test">test</nuxt-link>
        </nav>
        <h1>{{ $store.state.page.data.document.namespace }}: <span>{{ $store.state.page.data.document.title }}</span></h1>
        <nuxt/>
    </div>
</template>
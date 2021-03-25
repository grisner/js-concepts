<template>
    <div>test</div>
</template>

<script>
export default {
    name: 'app',
    data: function() {
        return {
            counter: 0,
        }
    },
    beforeCreate: function() {
        console.log('beforeCreate');
    },
    created: function() {
        console.log('created', this.counter++);
        
        
    },
    beforeMount: function() {
        console.log('beforeMount', this.counter++);
    },
    mounted: function() {
        console.log('mounted', this.counter++);
    },
    beforeUpdate: function() {
        console.log('beforeUpdate', this.counter++);
    },
    updated: function() {
        console.log('updated', this.counter++);
    },
    computed: {
        loading: function() {
            
        }
    },
    
    
    methods: {
        sleep: (time) => new Promise(resolve=>setTimeout(resolve,time))
    },
    watch: {
        // 'loadingState': function() {
        //     console.log('loadingState changed');
        // }
    }
}
</script>
<style>
.CodeMirror {
	height: auto;
	font-family: roboto, sans-serif;
	font-size: 12pt;
	line-height: 1.3em;
}
.CodeMirror-code {
	min-height: 30em;
}

.vue-codemirror .CodeMirror-wrap {
	border-radius: 6px;
	border: 1px solid transparent;
	transition: .3s border-color;
}
.vue-codemirror:focus-within .CodeMirror-wrap {
	border-color: #BC67D0;
}

.CodeMirror-gutters {
	background-color: #E9E9E9;
	border-right-color: #D6D6D6;
}
.CodeMirror-linenumber {
	font-size: 10pt;
}

.CodeMirror.cm-s-lineasqr .CodeMirror-activeline-background {
	background-color: #BC67D030;
}

.CodeMirror.cm-s-lineasqr .CodeMirror-code div:nth-child(even) .CodeMirror-line {
	background-color: #E9E9E949;
}
</style>

<template>
	<no-ssr>
		<codemirror
			ref=codemirror
			:value=value
			@input="$emit('input', $event)"
			@cursorActivity=cursorActivity
			:options=options />
	</no-ssr>
</template>

<script>
import Vue from 'vue';


export default {
	props: ['value', 'mode', 'line'],
	computed: {
		options() {
			return {
				theme: this.mode === 'lineasqr' ? 'lineasqr' : 'singleqr',
				dragDrop: false,
				lineNumbers: this.mode === 'lineasqr',
				styleActiveLine: this.mode === 'lineasqr',
				lineWrapping: true,
				indentUnit: 4,
				tabSize: 4,
				indentWithTabs: true,
				viewportMargin: Infinity,
			};
		},
	},
	methods: {
		cursorActivity(ev) {
			Vue.nextTick(() => {
				const newLine = ev.getCursor().line
				if (newLine !== this.line) {
					this.$emit('update:line', newLine);
				}
			});
		},
	},
	watch: {
		line(val) {
			const doc = this.$refs.codemirror.codemirror.getDoc();
			if (doc.getCursor().line !== val) {
				doc.setCursor({line: val});
			}
		},
	},
};
</script>

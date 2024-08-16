import css from 'rollup-plugin-css-only'; // Ensure you install this plugin

export default {
  input: 'src/main.js', // Replace with your actual entry file
  output: {
    file: 'dist/bundle.js', // Output file for your JavaScript
    format: 'iife', // 'iife', 'cjs', 'es', or 'umd' depending on your needs
  },
  plugins: [
    css({ output: 'dist/styles.css' }) // Output CSS to a file
  ]
};
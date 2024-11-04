/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors:{
      cor1: '#bd1717',
      cor2: '#5f0808',
      cor3: '#d31515',
      cor4: '#e93939',
      cor5: '#F01111',
      cor6: '#2D82C6',
      cor7: '#FFC8C3',
      cor8: '#D1E4F3',
      cor9: '#D9D9D9',
      cor10: '#fff',
      cor11: '#000',
      cor12: '#ccc',
      red: {
        600: '#C53030', // Usado para botões e texto
      },
      gray: {
        100: '#F7FAFC', // Cor de fundo
        400: '#A0AEC0', // Cor do botão de fechar
      },
      // Adicione outras cores conforme necessário
      cor7: '#FFFFFF', // Cor de fundo do modal (exemplo)
    },
  },
  plugins: [],
}


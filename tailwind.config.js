/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					orange: '#FF6B35',
					blue: '#3B82F6',
				},
				gold: {
					DEFAULT: '#FFD700',
					light: '#FFE55C',
				},
			},
		},
	},
	plugins: [],
}


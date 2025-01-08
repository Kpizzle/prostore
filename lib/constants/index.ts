export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ||  'Prostore';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION ||  'A modern ecommerce store built with nextjs';
export const SERVER_URL=process.env.SERVER_URL || 'http://localhost:3000'
export const LATEST_PRODUCTS_LIMITS = Number(process.env.LATEST_PRODUCTS_LIMITS) || 4

export const signInDefaultValues = {
	email: '', 
	password: ''
}
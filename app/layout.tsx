import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Header } from '@/components/shared/header';
import './globals.css';

const nunito = Nunito({
	subsets: ['cyrillic'],
	weight: ['400', '500', '600', '700', '800', '900'],
	variable: '--font-nunito',
});

export const metadata: Metadata = {
	title: 'Roostiq Pizza | Main Page',
	description: 'Roostiq Pizza made in rustic oven',
};

// Данный Layout - обертка для всех страниц
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={nunito.className}>
				<main className="min-h-screen">
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}

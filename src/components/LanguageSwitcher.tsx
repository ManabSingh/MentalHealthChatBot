import React from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
	{ code: 'en', label: 'English' },
	{ code: 'hi', label: 'हिन्दी' },
	{ code: 'bn', label: 'বাংলা' },
	{ code: 'ta', label: 'தமிழ்' },
	{ code: 'te', label: 'తెలుగు' },
	{ code: 'mr', label: 'मराठी' },
	{ code: 'gu', label: 'ગુજરાતી' },
	{ code: 'kn', label: 'ಕನ್ನಡ' },
	{ code: 'ml', label: 'മലയാളം' },
	{ code: 'pa', label: 'ਪੰਜਾਬੀ' }
];

const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const lng = e.target.value;
		i18n.changeLanguage(lng);
		try { localStorage.setItem('i18nextLng', lng); } catch {}
	};

	return (
		<select
			value={i18n.resolvedLanguage}
			onChange={handleChange}
			className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-calm-blue-600 hover:bg-calm-blue-50 transition-colors bg-white border border-gray-200"
			aria-label="Select language"
		>
			{languages.map((lng) => (
				<option key={lng.code} value={lng.code}>{lng.label}</option>
			))}
		</select>
	);
};

export default LanguageSwitcher;

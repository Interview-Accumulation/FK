import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { getStringItem } from '@/utils/storage';

import en_US from './lang/en_US';
import zh_CN from './lang/zh_CN';
import { LocalEnum, StorageEnum } from '#/enum'

const defaultLng = getStringItem(StorageEnum.I18N) || LocalEnum.zh_CN;
i18next.use(LanguageDetector).use(initReactI18next).init({
  lng: defaultLng,
  fallbackLng: LocalEnum.zh_CN,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en_US: {
      translation: en_US,
    },
    zh_CN: {
      translation: zh_CN,
    },
  },
})

export default i18next;
export const { t } = i18next;


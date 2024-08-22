import {create} from 'zustand';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { StorageEnum, ThemeColorPresets, ThemeLayout, ThemeMode } from '#/enum';

type SettingType = {
    themeColorPresets: ThemeColorPresets;
    themeMode: ThemeMode;
    themeLayout: ThemeLayout;
    themeStretch: boolean;
    breadCrumb: boolean;
    multiTabs: boolean;
}

type SettingStore = {
    settings: SettingType;
    actions: {
        setSettings: (settings: SettingType) => void;
        clearSettings: () => void;
    }
}

const useSettingStore = create<SettingStore>((set) => ({
    settings: getItem<SettingType>(StorageEnum.Settings) || {
        themeColorPresets: ThemeColorPresets.Default,
        themeMode: ThemeMode.Dark,
        themeLayout: ThemeLayout.Vertical,
        themeStretch: false,
        breadCrumb: true,
        multiTabs: true,
    },
    actions: {
        setSettings: (settings) => {
            set({ settings });
            setItem(StorageEnum.Settings, settings);
        },
        clearSettings: () => {
            removeItem(StorageEnum.Settings);
        }
    }
}));

export const useSettings = () => useSettingStore((state) => state.settings);
export const useSettingActions = () => useSettingStore((state) => state.actions);
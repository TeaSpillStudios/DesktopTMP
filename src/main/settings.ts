/*
 * SPDX-License-Identifier: GPL-3.0
 * Vencord Desktop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2023 Vendicated and Vencord contributors
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import type { Settings as TSettings } from "shared/settings";
import { SettingsStore } from "shared/utils/SettingsStore";

import { DATA_DIR, VENCORD_SETTINGS_FILE } from "./constants";

const SETTINGS_FILE = join(DATA_DIR, "settings.json");

function loadSettings<T extends object = any>(file: string, name: string) {
    let settings = {} as T;
    try {
        const content = readFileSync(file, "utf8");
        try {
            settings = JSON.parse(content);
        } catch (err) {
            console.error(`Failed to parse ${name} settings.json:`, err);
        }
    } catch {}

    const store = new SettingsStore(settings);
    store.addGlobalChangeListener(o => writeFileSync(file, JSON.stringify(o, null, 4)));

    return store;
}

export const Settings = loadSettings<TSettings>(SETTINGS_FILE, "Vencord Desktop");
export const VencordSettings = loadSettings<any>(VENCORD_SETTINGS_FILE, "Vencord");

import {customAlphabet} from "nanoid";

export const isRunningOnLocalhost = () => {
    //if (typeof window === "undefined") return "window-is-undefined";

    return window.location.hostname === "localhost";
};

// See https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON:
export const asJsonFromDate = (date: Date) => {
    try {
        return date.toJSON()
    } catch (e) {
        console.error('commons/asJsonFromDate() ERROR: ', e, date);
        return undefined;
    }

};

export const asDateFromJson = (json: Date | string | undefined) => {
    if (!json) {
        console.error('commons/asDateFromJson() UNDEFINED: ', json);
        return;
    }

    try {
        return new Date(json);
    } catch (e) {
        console.error('commons/asDateFromJson() ERROR: ', e, json);
        return;
    }
};

const nextAlphabetId = customAlphabet('123456789', 6);

export function createStringId():string {
    return nextAlphabetId();
}

export function createNumberId():number {
    return Number(createStringId());
}

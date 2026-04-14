export type HotKey = {
    key: string;

    shiftKey: boolean;

    ctrlKey: boolean;
};

export type HotKeysMap = {
    [Key: string]: HotKey | HotKey[] | HotKeysMap;
};

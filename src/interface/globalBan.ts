export interface IGlobalBan {
    results: Result[];
}

interface Result {
    steamId: string;
    guid: string;
    isBanned: boolean;
    banId: string;
    exceptionThrown: boolean;
}
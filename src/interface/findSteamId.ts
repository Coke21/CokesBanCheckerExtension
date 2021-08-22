export interface IFindSteamId {
    results: Results;
}

interface Results {
    query: string;
    steamId: string;
}
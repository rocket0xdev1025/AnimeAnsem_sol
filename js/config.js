/**
 * Anime Ansem — site config
 */
const ANIMEBULL_CONFIG = {
  contractAddress: "5UQNY2hk4fgaDYL8Cq2SgVZ97q7Uvb95aAuSG18dpump",

  symbol: "$ANIMEBULL",
  name: "Anime Ansem",
  xUrl: "https://x.com/AnimeAnsem",

  shortBio: "Anime Ansem: The Seeker of Darkness in stunning anime style.",

  fullDescription:
    "Anime Ansem is the anime-style Seeker of Darkness from Kingdom Hearts. With long silver hair, " +
    "glowing amber eyes and a dramatic black coat, he radiates mystery and power. Cunning and " +
    "philosophical, he believes darkness is the heart's true essence. He commands Heartless and dark " +
    "energy to battle heroes of light. Delivering epic monologues, this stylish antagonist seeks to " +
    "engulf the world in shadows.",
};

function getPumpSwapUrl() {
  const mint = ANIMEBULL_CONFIG.contractAddress;
  if (!mint) return "https://swap.pump.fun/";
  const sol = "So11111111111111111111111111111111111111112";
  return `https://swap.pump.fun/?input=${sol}&output=${mint}`;
}

function getDexScreenerUrl() {
  const mint = ANIMEBULL_CONFIG.contractAddress;
  if (!mint) return "https://dexscreener.com/solana";
  return `https://dexscreener.com/solana/${mint}`;
}

function getDexScreenerEmbedUrl() {
  const mint = ANIMEBULL_CONFIG.contractAddress;
  if (!mint) return "";
  return `https://dexscreener.com/solana/${mint}?embed=1&theme=dark&trades=0&info=0`;
}

function getDexScreenerApiUrl() {
  const mint = ANIMEBULL_CONFIG.contractAddress;
  if (!mint) return "";
  return `https://api.dexscreener.com/latest/dex/tokens/${mint}`;
}

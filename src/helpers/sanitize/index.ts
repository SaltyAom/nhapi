/**
 * Very simple sanitize function.
 * Escape illegal value which made Json parse failed.
 * eg: 292888 - (COMIC1☆15) [CAT GARDEN (ねこてゐ)] 紅閻魔流房中術!! \\せっくすがんばるでち/ (Fate/Grand Order) [無修正]
 * @param {string} param
 */
const sanitize = (param: string | null) =>
    param !== null ? param.replace(/\\|\/\//g, '').replace(/\"/g, '\'') : param
export default sanitize

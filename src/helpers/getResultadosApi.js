const { api } = require("../configApi/api");

const range = (n, a, b) => {
    return n >= a && n <= b;
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const getResultadosApi = async () => {
    const resultados = {
        /* ======== loterias ======== */
        TACHIRA: [],
        CHANCE: [],
        ZULIA: [],
        CARACAS: [],
        USA: [],
        TriNapa: [],
        CentenaP: [],
        Terminalito: [],
        COLOMBIANA: [],
        /* ======== zodiacal ======== */
        CALIENTE: [],
        CARACAS_Sig: [],
        CHANCE_Sig: [],
        ZULIA_Sig: [],
        SuperGana_Sig: [],
        TripleGana_Sig: [],
        TACHIRA_Sig: [],
        /* ======== animalitos ======== */
        TropiGana: [],
        CondorGana: [],
        FruitaGana: [],
        SelvaPlus: [],
        Lottorey: [],
        ChanceAnimal: [],
        CombinaFT: [],
        LA_GRANJITA: [],
        LottoActivo: [],
        GRANJAMILLO_ANI: [],
        Guacharo: [],
        GRANJAZO: [],
    };

    await api
        .get()
        .then(({ data }) => {
            data.forEach((resultado) => {
                const { pro, pos } = resultado;
                if (range(pos, 58, 75) || range(pos, 18, 20)) {
                    resultados[`${pro}_Sig`].push(resultado);
                    return;
                }
                resultados[pro].push(resultado);
            });
        })
        .catch((error) => {
            console.error("Error al conseguir los datos");
        });
    return resultados;
};

module.exports = getResultadosApi;

const { Telegraf } = require("telegraf");
const axios = require('axios');
const { response } = require("express");
axios.post('http://arxdemo.betsoft-srl.it//ARXivarNextWebApi/api/Authentication', {

        username: "marco.bot",
        password: "MarcoBot",
        clientId: "betsoftApi",
        clientSecret: "7F73868161174D619C3E70DCE6A1FF53"

    })
    .then(response => {

        token = response.data.accessToken
        console.log(response.data.accessToken)

    })
var step = 0;
var mask_id = 'bfd3550a6a4743cdab7b17006ef96810'
    //array per un rapportino
const val = [];
//array per i valori
const val_valori = [];
//array per tutti i rapportini
const val_rapportini = [];
//funzione per inserire un array in un altro  array
const insertArrayIntoArray = (a, b, index) => {
    a.splice.apply(a, Array.prototype.concat(index, 0, b));
    return a;
};

function axiosTest() {
    // create a promise for the axios request
    const promise = axios.get('http://arxdemo.betsoft-srl.it/arxivarnextwebapi//api/masks')

    // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)

    // return it
    console.log(response.data)
    return dataPromise
}
var oreAdd = 0,
    oretot = 0,
    minAdd = 0,
    step3 = 0,
    mintot = 0;
const bot = new Telegraf("5101055245:AAF8tO4znUcOCs8xf2OCb2vAs1qL8rdrGAE");
//comando /start
bot.start((ctx) => {
    bot.telegram.sendMessage(
        ctx.chat.id,
        "BOT_RAPPORTINO \nNota: a fine dell'inserimento di un rapportino potrai sempre modificare i valori inseriti 😉", {
            reply_markup: {
                keyboard: [
                    [{ text: "Nuovo rapportino ➕" }],
                    [{ text: "Guarda rapportini inviati ✅" }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        }
    );
});
//bottone Nuovo rapportino
bot.hears("Nuovo rapportino ➕", (ctx) => {
    val[9] =
        "-------------------------------------------------------------------------------------";
    remove_keyboard = true;
    step_2 = "ciao";
    step = 0;
    ctx.reply("Inserire il nome del cliente");
});
//bottone Guarda rapportini inviati
bot.hears("Guarda rapportini inviati ✅", (ctx) => {
    remove_keyboard = true;
    if (val_rapportini[0] == null) {
        //controllo se esitono rapportini già creati
        bot.telegram.sendMessage(ctx.chat.id, "Nessuno rapportino creato", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Nuovo rapportino ➕", callback_data: "Nuovo rapportino" }],
                ],
            },
        });
    } else {
        bot.telegram.sendMessage(ctx.chat.id, val_rapportini.join("\n"), {
            //stampa di tutti i rapportini creati
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Nuovo rapportino ➕", callback_data: "Nuovo rapportino" }],
                ],
            },
        });
    }
});
bot.action("Nuovo rapportino", (ctx) => {
    //ctx.deleteMessage();
    val[8] =
        "-------------------------------------------------------------------------------------";
    remove_keyboard = true;
    step_2 = "ciao";
    step = 0;
    ctx.reply("Inserire il nome del cliente");
});
bot.action("Guarda rapportini inviati", (ctx) => {
    //ctx.deleteMessage();
    remove_keyboard = true;
    step = 0;
    if (val_rapportini[0] == null) {
        //controllo se esitono rapportini già creati
        bot.telegram.sendMessage(ctx.chat.id, "Nessuno rapportino creato", {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Nuovo rapportino ➕", callback_data: "Nuovo rapportino" }],
                ],
            },
        });
    } else {
        bot.telegram.sendMessage(ctx.chat.id, val_rapportini.join("\n"), {
            //stampa di tutti i rapportini creati
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Nuovo rapportino ➕", callback_data: "Nuovo rapportino" }],
                ],
            },
        });
    }
});
//controllo della data
function formato(txtDate) {
    if (
        txtDate.length <= 10 ||
        isNaN(txtDate.substring(0, 2)) ||
        txtDate.substring(2, 3) != "/" ||
        isNaN(txtDate.substring(3, 5)) ||
        txtDate.substring(5, 6) != "/" ||
        isNaN(txtDate.substring(6, 10)) ||
        isNaN(txtDate.substring(0, 2)) ||
        txtDate.substring(2, 3) != "-" ||
        isNaN(txtDate.substring(3, 5)) ||
        txtDate.substring(5, 6) != "-" ||
        isNaN(txtDate.substring(6, 10))
    ) {
        return 1;
    }
    return 2;
}
//validità della data
function DataValida(txtDate) {
    mm = parseInt(txtDate.substring(0, 2));
    gg = parseInt(txtDate.substring(3, 5));
    aa = parseInt(txtDate.substring(6, 10));
    var ListofDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mm <= 12 && mm >= 1) {
        if (gg > ListofDays[mm - 1]) {
            return 2;
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(aa % 4) && aa % 100) || !(aa % 400)) {
                lyear = true;
            }
            if (lyear == false && gg >= 29) {
                return 2;
            }
            if (lyear == true && gg > 29) {
                return 2;
            }
            return 1;
        }
        return 1;
    }
    return 2;
}
//bottone delle ore NON addebitate
bot.action("non_addebitate", (ctx) => {
    ctx.deleteMessage(); //elimina automaticamente il messaggio scritto in precedenza
    oreAdd = 0;
    minAdd = 0;
    val_valori[5] = oreAdd;
    val_valori[6] = minAdd;
    val[5] = "ORE NON ADDEBITATE : " + val_valori[5];
    val[6] = "MINUTI NON ADDEBITATE : " + val_valori[6];
    if (step3 == 0) {
        ctx.reply("Inserisci la descrizione🗒");
        step = 6;
    } else {
        bot.telegram.sendMessage(ctx.chat.id, "visualizzare il riepilogo?📲", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "SI ✅", callback_data: "riepilogo" },
                        { text: "NO❌, conferma e invia", callback_data: "invia" },
                    ],
                ],
            },
        });
    }
});
//bottone delle ore addebitate
bot.action("addebitate", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Tutte le ore?", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "SI ✅", callback_data: "tutte_ore" },
                    { text: "NO❌", callback_data: "inparte" },
                ],
            ],
        },
    });
});
//bottone per selezionare tutte le ore
bot.action("tutte_ore", (ctx) => {
    ctx.deleteMessage();
    oreAdd = oretot;
    minAdd = mintot;
    val_valori[5] = oretot;
    val_valori[6] = mintot;
    val[5] = "ORE NON ADDEBITATE : " + val_valori[5];
    val[6] = "MINUTI NON ADDEBITATE : " + val_valori[6];
    if (step3 == 0) {
        step = 6;
        ctx.reply("Inserisci la descrizione🗒");
    } else {
        bot.telegram.sendMessage(ctx.chat.id, "visualizzare il riepilogo?📲", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "SI ✅", callback_data: "riepilogo" },
                        { text: "NO❌, conferma e invia", callback_data: "invia" },
                    ],
                ],
            },
        });
    }
});
//bottone per inserire le ore addebitate
bot.action("inparte", (ctx) => {
    ctx.deleteMessage();
    step = 9999;
    ctx.reply("inserire le ore non addebitate ❌");
});
//bottone per selezionare il tipo di lavoro ANALISI
bot.action("analisi", (ctx) => {
    ctx.deleteMessage();
    testo = "Analisi";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro ASSISTENZA
bot.action("assistenza", (ctx) => {
    ctx.deleteMessage();
    testo = "Assistenza";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro DEMO
bot.action("demo", (ctx) => {
    ctx.deleteMessage();
    testo = "Demo";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro FORMAZIONE
bot.action("formazione", (ctx) => {
    ctx.deleteMessage();
    testo = "Formazione";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro INSTALLAZIONE
bot.action("installazione", (ctx) => {
    ctx.deleteMessage();
    testo = "Installazione";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro MANUTENZIONE
bot.action("manutenzione", (ctx) => {
    ctx.deleteMessage();
    testo = "Manutenzione";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro ORGANIZZAZIONE
bot.action("organizazione", (ctx) => {
    ctx.deleteMessage();
    testo = "Organizazione";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per selezionare il tipo di lavoro SVILUPPO
bot.action("sviluppo", (ctx) => {
    ctx.deleteMessage();
    testo = "Sviluppo";
    val_valori[1] = testo;
    val[1] = "TIPO DI LAVORO : " + val_valori[1];
    if (step3 == 0) {
        step++;
        ctx.reply(
            "inserito : " +
            val_valori[1] +
            "\nInserisci la data in cui è stato effetuato il lavoro 🗓"
        );
    } else {
        bot.telegram.sendMessage(
            ctx.chat.id,
            "inserito : " + val_valori[1] + "\nvisualizzare il riepilogo?📲", {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "SI ✅", callback_data: "riepilogo" },
                            { text: "NO❌, conferma e invia", callback_data: "invia" },
                        ],
                    ],
                },
            }
        );
    }
});
//bottone per visualizzare il rapportino creato
bot.action("riepilogo", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(
        ctx.chat.id,
        val.join("\n") + "\nModificare qualche campo?", {
            //stampa del rapportino più richiesta di modifica
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "SI ✅", callback_data: "modifica" },
                        { text: "NO❌, conferma e invia", callback_data: "invia" },
                    ],
                ],
            },
        }
    );
});
//bottone modifica
bot.action("modifica", (ctx) => {
    ctx.deleteMessage();
    step3 = 1;
    bot.telegram.sendMessage(ctx.chat.id, "Cosa vuoi modificare?", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Cliente", callback_data: "Cliente" },
                    { text: "Tipo Lavoro", callback_data: "TipoLavoro" },
                ],
                [
                    { text: "Data", callback_data: "Data" },
                    { text: "Descrizione", callback_data: "Descrizione" },
                ],
                [
                    { text: "Ora", callback_data: "Ora" },
                    { text: "Minuti", callback_data: "Minuti" },
                ],
                [
                    { text: "Ore non addebitate", callback_data: "Ore_addebitate" },
                    { text: "Minuti non addebitati", callback_data: "Minuti_addebitati" },
                ],
            ],
        },
    });
});
//bottone per modificare il cliente
bot.action("Cliente", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire Cliente");
    step = 0;
});
//bottone per modificare il tipo di lavoro
bot.action("TipoLavoro", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, "Inserisci il tipo di lavoro ", {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Analisi", callback_data: "analisi" },
                    { text: "Assistenza", callback_data: "assistenza" },
                ],
                [
                    { text: "Demo", callback_data: "demo" },
                    { text: "Formazione", callback_data: "formazione" },
                ],
                [
                    { text: "Installazione", callback_data: "installazione" },
                    { text: "Manutenzione", callback_data: "manutenzione" },
                ],
                [
                    { text: "Organizazione", callback_data: "organizazione" },
                    { text: "Sviluppo", callback_data: "sviluppo" },
                ],
            ],
        },
    });
    step = 0;
});
//bottone per modificare la data
bot.action("Data", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire Data");
    step = 2;
});
//bottone per modificare le ore
bot.action("Ora", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire le Ore");
    step = 3;
});
//bottone per modificare i minuti
bot.action("Minuti", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire i minuti");
    step = 4;
});
//bottone per modificare le ore addebitate
bot.action("Ore_addebitate", (ctx) => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Per modificare, quindi, ci sono ore addebitate?", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "SI ✅", callback_data: "addebitate" },
                        { text: "NO❌", callback_data: "non_addebitate" },
                    ],
                ],
            },
        }
    );
});
//bottone per modificare i minuti addebitati
bot.action("Minuti_addebitati", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire i minuti non addebitati ❌");
    step = 5;
});
//bottone per modificare la descrizione
bot.action("Descrizione", (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Inserire la descrizione");
    step = 6;
});
//bottone salva e invia
bot.action("invia", (ctx) => {
    ctx.deleteMessage();
    axios.get('http://arxdemo.betsoft-srl.it/arxivarnextwebapi//api/masks', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)

        })
        .catch((error) => {
            console.error(error)
        })

    axios.get(`http://arxdemo.betsoft-srl.it/arxivarnextwebapi//api/masks/${mask_id}/profileSchema`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },



        })
        .then((response) => {
            var dati_non_complitati = response.data

        })
        .catch((error) => {
            console.error(error)
        })

    axios.post(`http://arxdemo.betsoft-srl.it/arxivarnextwebapi//api/masks/${mask_id}/profile`, {


            "maskId": "bfd3550a6a4743cdab7b17006ef96810",
            "maskName": "Rapporto di intervento Telegram",
            "predefinedProfileId": 136,
            "options": {
                "showNotes": true,
                "showAttachments": true,
                "showFileSelection": true,
                "showScannerSelection": false,
                "showBarcodeSelection": false
            },
            "behaviour": {
                "loadAdditional": false,
                "showGroups": false,
                "paMode": 7
            },
            "maskType": 2,
            "id": 0,
            "document": {
                "fileNames": null,
                "bufferIds": null
            },
            "fields": [{
                    "value": {
                        "id": 0,
                        "externalId": "NTH-0000000107",
                        "description": "Betsoft S.R.L.",
                        "docNumber": "-1",
                        "type": 1,
                        "contactId": 2937,
                        "fax": "",
                        "address": "Via Stelvio, 172/F",
                        "postalCode": "23017",
                        "contact": "",
                        "job": "",
                        "locality": "Morbegno",
                        "province": "SO",
                        "phone": "",
                        "mobilePhone": "",
                        "telName": "",
                        "faxName": "",
                        "house": "",
                        "department": "",
                        "reference": "",
                        "office": "",
                        "vat": "01020180145",
                        "mail": "",
                        "priority": "N",
                        "code": null,
                        "email": "",
                        "fiscalCode": "01020180145",
                        "nation": "IT",
                        "addressBookId": 2915,
                        "society": "Betsoft S.R.L.",
                        "officeCode": "",
                        "publicAdministrationCode": "",
                        "pecAddressBook": "",
                        "feaEnabled": false,
                        "feaExpireDate": null,
                        "firstName": "",
                        "lastName": "",
                        "pec": ""
                    },
                    "name": "From",
                    "externalId": null,
                    "description": "Da",
                    "order": 19,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "FromFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "To",
                    "externalId": null,
                    "description": "A",
                    "order": 20,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "ToFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "Cc",
                    "externalId": null,
                    "description": "Cc",
                    "order": 21,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "CcFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": "BTS",
                    "displayValue": null,
                    "name": "Aoo",
                    "externalId": null,
                    "description": "Aoo",
                    "order": 22,
                    "dataSource": null,
                    "required": true,
                    "formula": null,
                    "className": "BusinessUnitFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": 156,
                    "displayValue": null,
                    "code": "MARCP.RAPPM",
                    "classDescription": "Rapportino Telegram",
                    "name": "DocumentType",
                    "externalId": null,
                    "description": "Classe documento",
                    "order": 23,
                    "dataSource": null,
                    "required": true,
                    "formula": null,
                    "className": "DocumentTypeFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [{
                        "fieldClassName": "BusinessUnitFieldDTO",
                        "fieldId": "Aoo"
                    }],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "DataDoc",
                    "externalId": null,
                    "description": "Data documento",
                    "order": 24,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "DocumentDateFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": "",
                    "numMaxChar": 30,
                    "name": "ProtocolloInterno",
                    "externalId": null,
                    "description": "Numero",
                    "order": 25,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "NumberFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": "",
                    "numMaxChar": 500,
                    "name": "DocName",
                    "externalId": null,
                    "description": "Oggetto",
                    "order": 26,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "SubjectFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": 0,
                    "name": "Origine",
                    "externalId": null,
                    "description": "Origine",
                    "order": 27,
                    "dataSource": null,
                    "required": true,
                    "formula": null,
                    "className": "OriginFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": "Valido",
                    "name": "Stato",
                    "externalId": null,
                    "description": "Stato",
                    "order": 28,
                    "dataSource": null,
                    "required": true,
                    "formula": null,
                    "className": "StateFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [{
                        "fieldClassName": "DocumentTypeFieldDTO",
                        "fieldId": "DocumentType"
                    }],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "Pratiche",
                    "externalId": null,
                    "description": "Pratiche",
                    "order": 29,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "BinderFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "Scadenza",
                    "externalId": null,
                    "description": "Scadenza",
                    "order": 30,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "DocumentDateExpiredFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": false,
                    "name": "Importante",
                    "externalId": null,
                    "description": "Importante",
                    "order": 31,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "ImportantFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "Senders",
                    "externalId": null,
                    "description": "Altri Da",
                    "order": 32,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "SendersFieldDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": null,
                    "name": "Originale",
                    "externalId": null,
                    "description": "Originale",
                    "order": 0,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "OriginalFieldDTO",
                    "locked": true,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "value": "2022-02-25T11:25:08.3248786",
                    "editTime": false,
                    "name": "DataProt",
                    "externalId": null,
                    "description": "Data Protocollo",
                    "order": 33,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "ProtocolDateFieldDTO",
                    "locked": true,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": false,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "value": "Informazioni lavoro",
                    "numMaxChar": 0,
                    "key": 2,
                    "additionalFieldType": 8,
                    "groupId": 2,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": null,
                    "name": "Group",
                    "externalId": null,
                    "description": "Informazioni lavoro",
                    "order": 0,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "AdditionalFieldGroupDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "limitToList": false,
                    "displayValue": null,
                    "value": val_valori[1],
                    "numMaxChar": 20,
                    "numRows": 0,
                    "additionalFieldType": 3,
                    "groupId": 2,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "COMBO8_12",
                    "externalId": "",
                    "description": "Tipo di lavoro",
                    "order": 1,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldComboDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": "Generale",
                    "numMaxChar": 0,
                    "key": 0,
                    "additionalFieldType": 8,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": null,
                    "name": "Group",
                    "externalId": null,
                    "description": "Generale",
                    "order": 2,
                    "dataSource": null,
                    "required": false,
                    "formula": null,
                    "className": "AdditionalFieldGroupDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": null,
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": "",
                    "numMaxChar": 2000,
                    "numRows": 1,
                    "additionalFieldType": 0,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "TESTO476_0",
                    "externalId": "",
                    "description": "Link",
                    "order": 1002,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldStringDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": val_valori[0],
                    "numMaxChar": 500,
                    "numRows": 1,
                    "additionalFieldType": 0,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "TESTO477_156",
                    "externalId": "",
                    "description": "Cliente",
                    "order": 0,
                    "dataSource": null,
                    "required": true,
                    "formula": "",
                    "className": "AdditionalFieldStringDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": "",
                    "numMaxChar": 100,
                    "numRows": 1,
                    "additionalFieldType": 0,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "TESTO478_156",
                    "externalId": "",
                    "description": "Tipo di attività",
                    "order": 1004,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldStringDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "value": false,
                    "additionalFieldType": 5,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "CHECK479_156",
                    "externalId": "",
                    "description": "Non addebitate",
                    "order": 1005,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldBooleanDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "value": val_valori[2],
                    "additionalFieldType": 1,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "DATA480_156",
                    "externalId": "",
                    "description": "Data intervento",
                    "order": 2,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldDateTimeDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": val_valori[3],
                    "additionalFieldType": 2,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "NUMERIC481_156",
                    "externalId": "",
                    "description": "Ore",
                    "order": 3,
                    "dataSource": null,
                    "required": true,
                    "formula": "",
                    "className": "AdditionalFieldIntDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": val_valori[4],
                    "additionalFieldType": 2,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "NUMERIC482_156",
                    "externalId": "",
                    "description": "Minuti",
                    "order": 4,
                    "dataSource": null,
                    "required": true,
                    "formula": "",
                    "className": "AdditionalFieldIntDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "displayValue": null,
                    "value": val_valori[7],
                    "numMaxChar": 500,
                    "numRows": 3,
                    "additionalFieldType": 0,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "TESTO483_156",
                    "externalId": "",
                    "description": "Descrizione",
                    "order": 5,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldStringDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": false,
                    "additionalFieldType": 5,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "CHECK484_156",
                    "externalId": "",
                    "description": "Non inviare al cliente",
                    "order": 1010,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldBooleanDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": false,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": null,
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": null,
                    "columns": null
                },
                {
                    "value": val_valori[5],
                    "additionalFieldType": 2,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "NUMERIC485_156",
                    "externalId": "",
                    "description": "Ore non addebitate",
                    "order": 6,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldIntDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                },
                {
                    "value": val_valori[6],
                    "additionalFieldType": 2,
                    "groupId": 0,
                    "binderFieldId": 0,
                    "taskWorkVariableId": 0,
                    "validationType": 0,
                    "validationString": "",
                    "name": "NUMERIC486_156",
                    "externalId": "",
                    "description": "Minuti non addebitati",
                    "order": 7,
                    "dataSource": null,
                    "required": false,
                    "formula": "",
                    "className": "AdditionalFieldIntDTO",
                    "locked": false,
                    "comboGruppiId": null,
                    "dependencyFields": [],
                    "associations": [],
                    "isAdditional": true,
                    "visible": true,
                    "predefinedProfileFormula": null,
                    "visibilityCondition": "",
                    "addressBookDefaultFilter": null,
                    "enabledAddressBook": [],
                    "columns": null
                }
            ],
            "postProfilationActions": [{
                    "shortDescription": "Avvia WorkFlow",
                    "description": "Avvia WorkFlow",
                    "action": 15,
                    "visible": true,
                    "value": false
                },
                {
                    "shortDescription": "Perm sing. documento",
                    "description": "Perm sing. documento",
                    "action": 29,
                    "visible": true,
                    "value": false
                }
            ],
            "constrainRoleBehaviour": 0,
            "attachments": null,
            "notes": null,
            "paNotes": null,
            "authorityData": null,
            "generatePaProtocol": false
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }

        })
        .then(response => {


            console.log(response.data)

        })

    let now = new Date();
    val[8] = "Creato il giorno:" + now;
    insertArrayIntoArray(val_rapportini, val, 10); //unione dei due array
    step = 80;
    step3 = 0;
    bot.telegram.sendMessage(
        ctx.chat.id,
        "Rapportino inviato correttamente ✅ ", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "Nuovo rapportino ➕", callback_data: "Nuovo rapportino" },
                        {
                            text: "Guarda rapportini inviati ✅",
                            callback_data: "Guarda rapportini inviati",
                        },
                    ],
                ],
            },
        }
    );
});
//codice eseguido ad ogni invio di un messaggio
bot.on("message", (ctx) => {
    var testo = ctx.message.text;
    if (step_2 == "ciao") {
        switch (step) {
            case 0:
                val_valori[0] = testo; //salvataggio del cliente inserito
                val[0] = "CLIENTE : " + val_valori[0];
                if (step3 == 0) {
                    step = 1;
                    bot.telegram.sendMessage(
                        ctx.chat.id,
                        "Inserisci il tipo di lavoro eseguito 💪🏻", {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "Analisi", callback_data: "analisi" },
                                        { text: "Assistenza", callback_data: "assistenza" },
                                    ],
                                    [
                                        { text: "Demo", callback_data: "demo" },
                                        { text: "Formazione", callback_data: "formazione" },
                                    ],
                                    [
                                        { text: "Installazione", callback_data: "installazione" },
                                        { text: "Manutenzione", callback_data: "manutenzione" },
                                    ],
                                    [
                                        { text: "Organizazione", callback_data: "organizazione" },
                                        { text: "Sviluppo", callback_data: "sviluppo" },
                                    ],
                                ],
                            },
                        }
                    );
                } else {
                    bot.telegram.sendMessage(
                        ctx.chat.id,
                        "visualizzare il riepilogo?📲", {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        { text: "SI ✅", callback_data: "riepilogo" },
                                        { text: "NO❌, conferma e invia", callback_data: "invia" },
                                    ],
                                ],
                            },
                        }
                    );
                }

                break;
            case 1:
                //in caso di aggiunta valore
                break;
            case 2:
                if (formato(testo) == 1) {
                    if (DataValida(testo) == 2) {
                        ctx.reply(
                            "Data impossibile, ReInserisci la data (usare il formato: mm/gg/aaaa) in cui è stato effetuato il lavoro 🗓"
                        );
                    } else if (DataValida(testo) == 1) {
                        val_valori[2] = testo; //salvataggio della data
                        val[2] = "DATA : " + val_valori[2];
                        if (step3 == 0) {
                            ctx.reply("Inserisci le ore di lavoro⏱");
                            step++;
                        } else {
                            bot.telegram.sendMessage(
                                ctx.chat.id,
                                "visualizzare il riepilogo?📲", {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                { text: "SI ✅", callback_data: "riepilogo" },
                                                {
                                                    text: "NO❌, conferma e invia",
                                                    callback_data: "invia",
                                                },
                                            ],
                                        ],
                                    },
                                }
                            );
                        }
                    }
                } else if (formato == 2) {
                    ctx.reply(
                        "Formato data non valida (usare il formato: mm/gg/aaaa), ReInserisci la data in cui è stato effetuato il lavoro 🗓"
                    );
                }
                break;
            case 3:
                if (parseInt(testo) >= 0 && parseInt(testo) < 24) {
                    //controllo delle ore
                    val_valori[3] = testo; //salvataggio delle ore
                    val[3] = "ORA : " + val_valori[3];
                    oretot = parseInt(testo);
                    if (step3 == 0) {
                        ctx.reply("Inserisci i minuti⏱ ");
                        step++;
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "visualizzare il riepilogo?📲", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "riepilogo" },
                                            {
                                                text: "NO❌, conferma e invia",
                                                callback_data: "invia",
                                            },
                                        ],
                                    ],
                                },
                            }
                        );
                    }
                } else {
                    ctx.reply(
                        "Ore di lavoro errate, superano le 24h quindi, Inserisci le ore di lavoro⏱"
                    );
                }
                break;
            case 4:
                if (parseInt(testo) >= 0 && parseInt(testo) < 60) {
                    //controllo del minuti
                    val_valori[4] = testo; //salvataggio dei minuti
                    val[4] = "MINUTI : " + val_valori[4];
                    mintot = parseInt(testo);
                    if (step3 == 0) {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "Ci sono ore non addebitate? ❌", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "addebitate" },
                                            { text: "NO❌", callback_data: "non_addebitate" },
                                        ],
                                    ],
                                },
                            }
                        );
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "visualizzare il riepilogo?📲", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "riepilogo" },
                                            {
                                                text: "NO❌, conferma e invia",
                                                callback_data: "invia",
                                            },
                                        ],
                                    ],
                                },
                            }
                        );
                    }
                } else {
                    ctx.reply(
                        "Minuti errati! assicurati di inserire un valore compreso tra 0 e 60, Inserisci i minuti⏱"
                    );
                }
                break;
            case 5:
                if (parseInt(testo) >= 0 && parseInt(testo) < 60 && oreAdd != oretot) {
                    //controllo dei minuti nei minuti addebitati con ore addebitate diverse dalle ore totali
                    val_valori[6] = testo; //salvataggio minuti addebitati
                    val[6] = "MINUTI NON ADDEBITATI : " + val_valori[6];
                    var minAdd = parseInt(testo);
                    if (step3 == 0) {
                        ctx.reply("Inserisci la descrizione🗒");
                        step++;
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "visualizzare il riepilogo?📲", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "riepilogo" },
                                            {
                                                text: "NO❌, conferma e invia",
                                                callback_data: "invia",
                                            },
                                        ],
                                    ],
                                },
                            }
                        );
                    }
                } else if (oreAdd == oretot && parseInt(testo) <= mintot) {
                    //controllo dei minuti nei minuti addebitati con ore addebitate uguali alle ore totali
                    val_valori[6] = testo; //salvataggio dei minuti addebitati
                    val[6] = "MINUTI NON ADDEBITATI : " + val_valori[6];
                    var minAdd = parseInt(testo);
                    if (step3 == 0) {
                        ctx.reply("Inserisci la descrizione🗒");
                        step++;
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "visualizzare il riepilogo?📲", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "riepilogo" },
                                            {
                                                text: "NO❌, conferma e invia",
                                                callback_data: "invia",
                                            },
                                        ],
                                    ],
                                },
                            }
                        );
                    }
                } else {
                    ctx.reply("reinserire i minuti non addebitati ❌");
                }

                break;
            case 6:
                val_valori[7] = testo; //salvataggio della descrizione
                val[7] = "DESCRIZIONE : " + val_valori[7];
                bot.telegram.sendMessage(ctx.chat.id, "visualizzare riepilogo? 📲", {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: "SI ✅", callback_data: "riepilogo" },
                                { text: "NO❌, conferma e invia", callback_data: "invia" },
                            ],
                        ],
                    },
                });
                break;
            case 9999:
                val_valori[5] = testo; //salvataggio ore addebitate
                val[5] = "ORE NON ADDEBITATE: " + val_valori[5];
                oreAdd = parseInt(testo);
                if (oreAdd > oretot) {
                    //controllo se le ore addebitate sono maggiori delle ore ttotali
                    ctx.reply(
                        "ore non addebitate impossibili, sono maggiori delle ore totali Renserisci le ore non addebitate ❌"
                    );
                } else {
                    if (step3 == 0) {
                        ctx.reply("Inserisci i minuti non addebitati⏱");
                        step = 5;
                    } else {
                        bot.telegram.sendMessage(
                            ctx.chat.id,
                            "visualizzare il riepilogo?📲", {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            { text: "SI ✅", callback_data: "riepilogo" },
                                            {
                                                text: "NO❌, conferma e invia",
                                                callback_data: "invia",
                                            },
                                        ],
                                    ],
                                },
                            }
                        );
                    }
                }
                break;
            case 80:
                ctx.deleteMessage();
                bot.telegram.sendMessage(
                    ctx.chat.id,
                    "Rapportino inviato correttamente ✅ ", {
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                        text: "Nuovo rapportino ➕",
                                        callback_data: "Nuovo rapportino",
                                    },
                                    {
                                        text: "Guarda rapportini inviati ✅",
                                        callback_data: "Guarda rapportini inviati",
                                    },
                                ],
                            ],
                        },
                    }
                );
                break;
        }
    }
});
bot.launch();
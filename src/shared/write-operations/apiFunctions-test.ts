// VON Forschungsprojekt
const GRAPHIT_API_ENDPOINT = "https://graphit.ur.de/w/api.php";
import axios from 'axios';

axios.defaults.withCredentials = true;

/**
 * Returns all wikibase items whose label matches the given text (query)
 * @param {String} query This is the text that was entered into a text input.
 * @returns {Object} The data of the wikibase item matching the text (query).
 */
async function getSearchSuggestions(query) {

    let url = GRAPHIT_API_ENDPOINT;
    let params = {
        action: 'wbsearchentities',
        search: query,
        format: 'json',
        errorformat: 'plaintext',
        language: 'de',
        uselang: 'de',
        type: 'item'
    }
    let response = await fetch(url + '?origin=*&' + new URLSearchParams(params));
    let data = await response.json();
    return data.search;

}
/**
 * Return the data of the wikibase item whose id was passed over.
 * @param {String} id The id of the wikibase item whose data should be returned.
 * @returns {Object} The data of the wikibase item.
 */
async function getItemDataByIdApi(id) {
    let url = GRAPHIT_API_ENDPOINT;
    let params = {
        action: 'wbgetentities',
        format: 'json',
        ids: id,
        props: "info|sitelinks|aliases|labels|descriptions|claims|datatype"
    }
    let response = await fetch(url + '?origin=*&' + new URLSearchParams(params));
    let data = await response.json();
    return data.entities[id];
}

/**
 * Creates a post request that should create a new wikibase item.
 * @param {String} title Title of the wikibase item to be created.
 */
async function createWBEntryWithTitleApi(title) {
    console.log("in createWBEntryWithTitleApi");
    console.log(axios);
    await axios.post("/api/create", { title: title });
}

/**
 * Creates a post request to edit a wikibase item.
 * @param {String} itemId Id of the wikibase item to be changed.
 * @param {String} label Label of the wikibase item to be changed.
 * @param {Object} claimData Data of the wikibase item to be changed.
 */
async function editWBEntryWithIdApi(itemId, label, claimData) {
    await axios.post("/api/edit", {
        itemId: itemId,
        label: label,
        claimData: claimData
    });
}

/**
 * Creates a post request to delete a wikibase item.
 * @param {String} pageId Id of the wikibase item to be deleted.
 */
async function deleteWBEntryWithPageIdApi(pageId) {
    await axios.post("/api/delete", { pageId: pageId });
}

export { getSearchSuggestions, getItemDataByIdApi, createWBEntryWithTitleApi, editWBEntryWithIdApi, deleteWBEntryWithPageIdApi };

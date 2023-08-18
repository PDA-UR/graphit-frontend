/// <reference types="vite/client" />

declare module 'cytoscape-expand-collapse' {
    const ext: cytoscape.Ext;
    export = ext;
}

declare module 'wikibase-edit';
declare module "wikibase-edit-browser";
declare module "cytoscape-layout-utilities";
declare module "cytoscape-view-utilities";
declare module "cytoscape-cise";
declare module "cytoscape-spread";
declare const APP_VERSION: string;

/* // TEMPLATE
declare module 'cytoscape-layout-utilities' {
    const ext: cytoscape.Ext;
    export = ext;
} */
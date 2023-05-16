import wke from 'wikibase-edit';

// Configures wikibase-edit

export class ConfigHandler {
    private readonly username: string;
    private readonly password: string;
    private wbEdit: any;

    constructor(
        username: string,
        password: string,
    ){
        this.username = username;
        this.password = password;
        this.initConfig();
    }

    private initConfig(){
        let generalConfig = {
            instance: 'https://graphit.ur.de',
            //wgScriptPath: '/w', //default API endpoint
            wgScriptPath: 'https://query.graphit.ur.de/proxy/wdqs/bigdata/namespace/wdq/sparql',

            credentials: {
                username: `${this.username}`,
                password: `${this.password}`,
                // or use OAuth tokens -> recommended for mulit-user set-up
                // -> https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#multi-user-setup 
            },
            anonymous: true,
            summary: 'Test Edit Summary',
            tags: ['Test Tag'],
            //userAgent: 'graphIT (https://graph.graphit.ur.de)',
        }

        this.wbEdit = wke(generalConfig);
        //+= '&origin=*';

        //console.log(this.wbEdit.url);


        //TEST CALL
        // Error: Uncaught (in promise) TypeError: qs.stringify is not a function (fixed)
        // Error: CORS
        // Possible fix: &origin=*, to add to query-url
        try  {
            this.wbEdit.label.set({
                id: 'Q157',
                language: 'de',
                value: 'Ein Test-Student mit Test-Label'});
        } catch (error) {
            console.log(error);
        }
    }

}
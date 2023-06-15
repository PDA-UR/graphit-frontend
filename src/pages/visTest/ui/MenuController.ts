import { eventBus } from "../../propertyEditor/global/EventBus";

// For handeling Menu Events/Interactions

export class MenuController {
    
    private readonly $container : HTMLDivElement;
    private readonly $dropBtn : HTMLSelectElement;

    constructor() {
        this.$container = document.getElementById("toolbar") as HTMLDivElement;
        this.$dropBtn = document.getElementById("layout-options") as HTMLSelectElement;
        this.$initListeners();
    }


    private $initListeners() {
        this.$dropBtn.selectedIndex = 0; // Change Dropdown back to default value
        this.$dropBtn.addEventListener("change", this.onLayoutChange);
    };

    // Event to change to layout depending on selecte option (dropdown-menu)
    private onLayoutChange = (e:any) => {
        var layoutVar = e.target.value;
        eventBus.emit("layoutChange", layoutVar);
    };

}
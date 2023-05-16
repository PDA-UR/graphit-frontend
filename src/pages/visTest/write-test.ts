import { ConfigHandler } from "../../shared/write-operations/ConfigHandler";

async function main() {
    let username: string;
    let password: string;
    let user = sessionStorage.getItem("user");
    if(!user) {
        username = window.prompt("Enter Username")as string;
        password = window.prompt("Enter Password") as string;
        sessionStorage.setItem("user", username+","+password);
    } else {
        let str = user.split(",");
        username = str[0];
        password = str[1];
    }

    console.log("User: ", username, ", Pw: ",  password);
    const configHandler = new ConfigHandler(username, password);
}

main();
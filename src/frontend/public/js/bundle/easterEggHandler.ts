export class EasterEggHandler {
    private static HEART_SYMBOL = "\u2665";

    public static console() {
        if (EasterEggHandler.hasConsoleLog()) {
            EasterEggHandler.printConsoleEasterEgg();
        }
    }

    public static printMore() {
        console.group("Infos");
        console.log("Email: ", "theo@dammaretz.fr");
        console.log("PGP: ", "http://dammaretz.fr/public-key.txt");
        console.log("Github: ", "https://github.com/Blightwidow");
        console.log("Philosophy: ", "Keep calm and improve everyday");
        console.log("City: ", "Moscow");
        console.log("Message of the day: ", "Feel free to contact me if you found this easter egg as I respect your privacy and don\"t log your visits");
        console.groupEnd();
    }

    private static printConsoleEasterEgg() {
        console.log(
            `%c ${EasterEggHandler.HEART_SYMBOL} web & perfomance ?%c _> %cknowMore();`,
            "color: red;",
            "color: white;",
            "border: solid 1px #d1d1d8; border-radius: 3px; background: #e7e7e9; font-family: monospace; color: #C25; padding: 2px 3px 1px;"
        );
    }

    private static hasConsoleLog(): boolean {
        return !!(window.console && window.console.log);
    }
}

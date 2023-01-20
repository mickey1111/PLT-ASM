import Logger from "./logger.interface";

const ConsoleClass: Logger = class ConsoleLogger{
    public static log(msg: any){
        console.log(msg);
    }

    public static error(err: Error){
        console.log(err);
    }
}

export default ConsoleClass;
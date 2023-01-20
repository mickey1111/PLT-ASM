export default interface Logger{
    log(msg: any) : void;
    error(err: Error) : void
}
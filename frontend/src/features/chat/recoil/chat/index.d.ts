export interface IMessage {
    name: string | undefined;
    content: string;
    status: "success" | "error" | "normal";
}
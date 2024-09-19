import { QueueClient } from "../common/queue";
import { MessageReceived, SendMessage } from "./dto";

export class Client extends QueueClient<SendMessage, MessageReceived> {

}
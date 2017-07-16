

export class IoCommService{
    private socket : any;

    public setSocket(socket : any){
        this.socket = socket;
    }

    public callClassifiedSocket(data : any){
        console.log("socket called");
        this.socket.emit('displayClassified', data);
    }

}


export class IoCommService{
    private socket : any;

    public setSocket(socket : any){
        this.socket = socket;
    }

    public callClassifiedSocket(data : any){
        this.socket.emit('displayClassified', data);
    }

}
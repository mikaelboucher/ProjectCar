import * as twitter from './twitter'

export function routes(io : any,stream : boolean, ioCommService: any) {
    io.on('connection', (socket : any) => {
        socket.on("requireTweets", ()=>{
            socket.emit("tweet", "@Macron : let's meet in Paris for a covfefe")
        });

        if (stream)
            twitter.twitterStream(socket);


        ioCommService.setSocket(socket);

    });
}

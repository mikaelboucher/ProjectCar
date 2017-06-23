export function routes(io : any) {
    io.on('connection', (socket : any) => {
        
        //éventuellement, requireTweets sera pour tous les tweets pour le membre
        //pour afficher lors du login
        socket.on("requireTweets", ()=>{
            socket.emit("tweet", "@Macron : let's meet in Paris for a covfefe")
        });
    });
}

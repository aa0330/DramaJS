import net from 'net'

const server = net.createServer(socket => {
    setInterval(() => {
        socket.write('富贵')
    }, 1000)
    
    socket.on('data', (e) => {
        console.log(e.toString());
    })
})

server.listen(3000, () => {
    console.log('开始监听3000端口');
})
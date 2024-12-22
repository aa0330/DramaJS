process.on('message', (msg) => {
    console.log('test收到消息了', msg);
})

// process.send(111, '子线程发消息')
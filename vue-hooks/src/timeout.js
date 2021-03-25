const sleep = (time) => new Promise(resolve=>setTimeout(resolve,time))

let ticking = async () => {
    console.log('starting');
    let ticker = 12;
    for(let i = 0;i < ticker; i++) {
        await sleep(1000);
        console.log('waiting', i);

    }
}

async function main() {
    await ticking();
}

main();
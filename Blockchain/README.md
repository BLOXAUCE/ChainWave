Executor 0x6dbd9c7a43f5AfDaF79c9e1ACcd84b0218A5a5D4 -> BSC TESTNET
Sender 0x085543750e56663faba65C2e94E2344691aA7AD6 -> Sepolia

Doporučuju deploy na cokoliv jiné než mumbai ten je totálně bugy a počítá to ty fees na uplné nesmysly

Co se týká těch kontraktů

VotingExecutor

- Tohle nám bude sloužit jako hlavní contract, tj to místo, kde bude probíhat hlasování a vše se bude vyhodnocovat
- function \_nonblockingLzReceive je ta funkce, která se zavolá, pokud přijde validní zpráva z jiného kontraktu, v této funkci je také emit těch values aby to šlo sledovat co to dělá (testovací učely), tady je event
  https://testnet.bscscan.com/address/0x6dbd9c7a43f5AfDaF79c9e1ACcd84b0218A5a5D4#events
- Ten increment counter, sem tam jen nechal integrovanej, protože vždy musí contract mít integrovanej jak send tak recieve message

VotingSender

- Tohle bude jeden z XY kontraktů se stejným tělem, jen budou ruzně rozjebané po chainech, tj místo kde uživatel provede hlasování a pošle zprávu na ten hlavní kontrakt o tom, že hlasoval.
- function incrementCounter(uint16 \_dstChainId, bytes memory \_payload) public payable, tohle když zavoláš, tak se pošle zpráva na VotingExecutor, s těma parametrama co zde pošleš.
- Tady nastává problém jen s tím, že nemají vyřešenou nějakou lepší integraci uživatelské adresy, tudíž to vše musíme posílat v payloadu, tudíž zde asi na tebe, aby si zvolil nejlepší cestu jak to udělat respektive jak to uložit, ted sem to posilal jako bytes, což tak asi stejně skončí a pak to jen v tom VotingExecutor budeme muset dekodovat a pracovat s tím.

Co se týká dalších věcí, tak jsou zde Tasks, tyto task jsou jen hardhat deploy věci, pro tebe duležité
setTrustedRemote.js

- Tohle je velmi duležitá věc, tohle vytváří právě to spojení mezi těma kontraktama, vždy musí být vytvořené oboustrané spojení na tom sem strávil mládí, protože tohle nepišou nikde v docs, ale vždy musíš propojit ContractA s ContractemB a ContractB s ContractemA, to spojení musí být oboustrané.
- Co se týká toho jak to funguje tady, tak musíš měnit //const localContractInstance = await ethers.getContract("VotingSender"), tady určíš odkud spojuješ.
- let remoteAndLocal = hre.ethers.utils.solidityPack(
  ["address", "address"],
  ["0x085543750e56663faba65C2e94E2344691aA7AD6", "0x6dbd9c7a43f5AfDaF79c9e1ACcd84b0218A5a5D4"]
  )
  Tady určuješ adresy Remote(Kam),Local(Odkud), je to kdyžtak více popsané v tom scriptu
- Co se týká toho jak to pouštět, tak vždy upravit ty parametry jak tam jsou napsané a poté
- npx hardhat --network bsc-testnet setTrustedRemote --target-network sepolia --local-contract VotingSender --remote-contract VotingExecutor
  Tohle je příkaz, který říká odkud spojuješ tj spojuje z BSC-testnet na sepolia, v tomhle případě by to bylo teda tak, aby si
  spojoval //const localContractInstance = await ethers.getContract("VotingExecutor")

- npx hardhat --network sepolia setTrustedRemote --target-network bsc-testnet --local-contract VotingSender --remote-contract VotingExecutor

Tohle je příkaz, který říká odkud spojuješ tj spojuje z sepolia na bsc-testnet, v tomhle případě by to bylo teda tak, aby si
spojoval //const localContractInstance = await ethers.getContract("VotingSender")

Kdyby si měl k tomuto otázky můžu ti zavolat ještě, ale prakticky to není o ničem jiném než přenastavit ty hodnoty v tom trustedRemote a zavolat správnej příkaz tj aby byl dobe ten targetet a local network, ty ostatní parametry tam jsou zatím navíc, kvuli automatizaci, ale blbo to, tak to pak vyhodíme

incrementCounter.js

- Tady tohle slouží pro zavolání té funkce, takže tady je jen const votingSender = await ethers.getContract("VotingSender"), což nám říká, že voláme právě ten contract VotingSender.
- Kdyby ti to blbnulo a psala ti to sračky z gas, tak tady let adapterParams = ethers.utils.solidityPack(["uint16", "uint256"], [1, 900000]) // default adapterParams example, těch 900k se dá přenastavit ale mělo by to být s rezervou v pohodě.
-     const message = "hello"
  const messageBytes = ethers.utils.toUtf8Bytes(message) tady posílám pak jen tu zprávu ten payload, tady pak budeme posílat i tu adresu uživatele tak i to jak volil.

Takhle to zavoláš, tj zase Volám ze Sepolia, funkci incremnet counter a targetuju ten bsc-testnet
npx hardhat --network sepolia incrementCounter --target-network bsc-testnet

ocPool.js

- npx hardhat --network bsc-testnet ocPoll, tohle když zavoláš, tak ti to začně vypisovat aktualní hodnotu counteru, slouží to zde jen pro test, bude se vyhazovat. Jen ti to ukazuje kdy se to propíše, občas to trvá třeba 20sec, než se propíše ta zpráva na ten druhej chain

index.js (tu jen definujes ty tasky pro hardhat, kdyby sis chtěl nějakej dopsat)

Deploy Executoru na bsc-testnet

npx hardhat --network bsc-testnet deploy --tags VotingExecutor

Deploy Senderu na Sepolia

npx hardhat --network sepolia deploy --tags VotingSender

Kdyby sis chtěl přidelat nějakej testnet, tka constants chainids doplnit, stejně tak do hardhat.config.js doplnit a pak doplnit i do layerzeroEndpoints.js to najdeš tady https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids , to jsou všechny co supportují!

Ten endpoin vždy leze i do konstruktoru těch kontraktů, protože to vždy jde přes něj ono to zpracovává ty crosschain věci, ale víceméně to řešit nemusíš v tom repu, jen stačí definovat svůj chain a splnit to co jsem psal nahoře



Ještě je si potřeba vytvořit .env file MNEMONIC="x x x x x x x x x x x x"

# encode-week-2

yarn ts-node --files ./scripts/Ballot.ts Chocolate Strawberry Vanilla Coconut
yarn ts-node --files ./scripts/CastVote.ts
yarn ts-node --files ./scripts/DelegateVote.ts
yarn ts-node --files ./scripts/GetWinner.ts
yarn ts-node --files ./scripts/GetRightToVote.ts

Report (Mumbai) :
Tx : 0xccfe10e236921b096981a6f5f64eabc0536d69d0756bb056fb404e04c76e5378 => 0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => created the contract at => 0xb32e96965c609387d9e6e6612f6bbb3d85c59f5b

Tx : 0xf4dc0f351623ef295a399026237e8f30712618393a5bbcf4b89e271c882e452b =>
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => gaveRightToVote to => 0xf1ee3175ebe4b9ff80ec0441c9aa66a319a16d75

Tx : 0x9badbe34a81d9352f17a4318b7f017560149edc2f9f589f4f0fb2db0c8d3d23a =>
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => voted

Non-Tx: 0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => tried to vote => received error that he ‘Has no right to vote’

Tx : 0x31310a79df6129a0626080e2448a3f456b3bed848ae2cae3df6fb2ab5a0f749e =>
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => gaveRightToVoteTo => 0xb32e96965c609387d9e6e6612f6bbb3d85c59f5b

Tx : 0xe845ec6664b09d3523b484514c4897266e6315d9dcf8d72f2f4f16ea2ea10d1a =>
0xf1ee3175ebe4b9ff80ec0441c9aa66a319a16d75 => voted

Tx : 0x7f9da1838e90733ef31187f4ae85d2f95a4a0bef19332135a23a189085edc72d =>
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => gaveRightToVoteTo =>
0x74e1eb731cc257578ab195f9936c8e82456f8cda

Tx : 0xdbf5e8f0b3399369dac8f4a9b35467d9f3a3972c4198efce7945cc1680ce040b
0x74e1eb731cc257578ab195f9936c8e82456f8cda => voted

Tx : 0xb21220f83eb52899b5baf38647eabc802a8db9fd4a80a0a2dc6a3c51ff24382f
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => gaveRightToVoteTo =>

Tx : 0x6db5ff5e748f3c2e0a9c76e2c41ef34b8203b74eb0af79ce8e502ce554056afd
0xd3e62bd441d59e5ad9ccf797f53934062a22c8fb => delegatedTo => 0x1f9d2d0cd37400829396b704349a64d77c41684c

Tx : 0xd60cb7319be985b5b403c9ae23878f8489421fbc0276af026f68e4f8f1270f2b =>
0x1f9d2d0cd37400829396b704349a64d77c41684c => voted

Tx : 0x309dbaa79a73b59990426f268ba0d7dea3f9d6ae1496b22798e9a42a52301016 =>
0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => gaveRightToVoteTo => 0xc706045555e9302aa2c63b7da55681369949df90

Tx : 0x5ee8032cff6c5bec14c9e324ac19b1f7aef9fde1809625bdb01bf8f9b235c106 =>
0xc706045555e9302aa2c63b7da55681369949df90 => voted

Non-Tx : 0x3e702e39e0649bd8581d07a5bf1b9e5924d94ce0 => called GetWinner => received Winner name

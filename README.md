# XpandTrust

XpandTrust addresses critical challenges in institutional DeFi compliance through advanced zero-knowledge (ZK) cryptography, offering a layered approach to privacy-preserving verification. The protocol leverages **ZK Expander** and **GKR-based recursion** to enable low-latency proof generation for complex compliance workflows while maintaining business confidentiality.
Recursive low latency proof generation for institutional defi compliance using ZK Expander and GKR technology.


![Slide3](https://github.com/user-attachments/assets/02a0e6b7-2f7b-45ae-b038-6582ccce1f7b)


We are at the crux of Institutional Defi and Tokenization.

                 For Deeply Composed Compliance of
    		              Identity. Process. Risk. etc

## What Defi needs
- Emerging Institutional Defi Needs Layers of Compliance - WITHOUT compromising Privacy / Business Sensitivity.

- Need for effective integration with Web 2 technologies to provide ZK-Oracles.

- Need for Efficient ZK Provers for low latency proof / verification
  
## Video

https://youtu.be/x8764FAoHOA


## Project Structure

- **/xpander** - frontend implementation including custom oracle
- **/ecc2** - circuit created for compliance data verification ( a recurrsive structure for compilance ) . Provides multi-level compliance giving genuinenes of borrowers to the financial protocols via off-chain verification service, with a minimal and predictable on-chain footprint, incorporating many other parameters of the borrowers based on their business operations , supply chain relationships etc, that can be brought on-chain closer to web2 experience and web2 systems integrations.
- **/aptos-move-contract** - Aptos smart contract showcasing XpandTrust oracle interaction with smart contract. Example use of XpandTrust for proof generation and verification on-chain.

Other files not included are Expander which is used to serve localhost:3030 for prove and verification endpoint



![Slide7](https://github.com/user-attachments/assets/a88bf294-6c5c-4cd8-808f-d517c70dff71)

## Core Innovations
[XpandTrust.pptx](https://github.com/user-attachments/files/19176714/XpandTrust.pptx)
1. Multi-Level Recursive Compliance
  * Uses ZK-Snarks to create recursive proof structures that validata compliance across identity, risk assessment, and business processes (e.g supply chain relationships)
  * The `/cc2` circuit implements a recursive verification system, allowing institutions to prove compliance without exposing sensitive data

2. Integration with Web2 Systems
  * ZK-Oracles bridge traditional APIs and blockchain networks, enabling real-world data (e.g credit scores, risk assestments, compliance data) to be cryptographically verified on-chain.
  * Supports standards like GS1 for supply chian finance

3. Performance Optimizatioin
  * Achieves sub-second proof generation/verification using GKR-bases recursion, critical for high-frequency institutional Defi applications
  * Reduces on-chain footprint thorugh selective disclosure, where only essential compliance metadata is stored publicly

## Institutional Alignment
XpandTrust's architecture aligns with emerging requirements in regulated Defi ecosystem like the XRP Ledger, which prioritizes:
  * Permissioned access via decentralized identity (DID)
  * Tokenized real-world assets (RWAs) requiring layered compliance.
  * Integration with traditional finance (TradFi) risk models


## Use Cases
  * Supply Chain Finance: Validates supplier credentials and payment terms without exposing proprietary contracts.
  * Institutional Lending: Enables underwriting bases on verified off-chain histories via Oracles.
  * Tokenized RWAs: Prividing audit trails for asset-backed securities while preserving commercial confidentiality.

## Technical Implementation
  * Frontend `/xpander` : Next.js interface for proof orchestration, oracle integration and keyless login.
  * Circuit `/ecc2` : Rust bases circuits optimized with ExpanderCompilerCollection for lightweight blockchain architecture
  * Aptos Move Contract `/aptos-move-contract` : Aptos smart contract implementation showcasing oracle interaction with smart contract.



XpandTrust’s approach directly addresses the compliance gaps highlighted in institutional DeFi roadmaps, offering a scalable framework for regulated financial applications. By reducing verification latency and ensuring privacy, it positions itself as a key enabler for the $30T RWA tokenization market19








  

![Slide5](https://github.com/user-attachments/assets/b2b33b8a-f68a-421c-902f-191dfe677dce)




## In this boot camp, 

We have tried enhance our implementation, by trying out one part of our SCF-RWA project (on a MINA grant), with keyless technology from APTOS, and also get the Proof / Verification times
reduced. The implementation we are trying is the Multi-level Recursive Compliance in Supply Chain Finance

Effective Web 3 Digitization needs more than a high-level hash of data but layers of Deep composition with MINIMAL Proof Generation and Verification footprint for Privacy-Protected
Business-sensitive information.

This is a Key Enabler for MSME Trade Finance Inclusivity.
Enables key processes like Supply Chain Finance.The intent of that project is to functionally prove the veracity and accommodating the and privacy and business sensitivity needs of real-world use-cases that have to be bridged between web2 and web3.

The current project Chainaim is working on is a a grant from MINA foundation, is a ZK-Snark based implementation in MINA extends in to many layers for proving business processes, bringing in standards for bpmn2.0, GS1, risk models and financial / compliance for institutional defi for compliance overarching tradfi and defi.
We are making very good progress in this area in our current MINA ZK project.
The one area of improvement for our solution could be in enhancing the web2 user experience and reducing the latency in Proof  and verification times. We also strongly feel for a wide variety of things we have been working, another layer of light weight proofs could be effective to bring a minimal footprint on-chain, while actually leveraging deep proofs that can be potentially leveraged from the MINA snark based solution, both onchain and offchain. We also have formed many relationships with many RWA standards efforts, and assembling them efficiently off-chain for a minimal and predictable proof sizes.

That is why we are very interested in the Expander family of proof systems. We have been trying to get 1 part of the solution tested out with keyless and GKR recursion, because our use-cases truely need those recursive forms of proofs. 

Beyond the hackathon, It is our aim and goal to explore how to use expander and keyless in to advancing our ZKP /ZKML usecases in this area. It would be really great if there are such opportunities to continue to build and collaborate.
uild and collaborate.

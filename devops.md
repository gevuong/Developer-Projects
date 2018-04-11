## DNS & SSL

- Domain Name Service
- Responsible for mapping a string url to an IP address.
- You're buying a right of entry in to the 13 root servers. You have access to name entry portion of the root server.
- First hit root nameserver, then org. namerserver, then wikipedia.org nameserver.

- A maps a name to an IP address
- A "C" maps a name to another name
- Those are the most common types, type A and C.
- Hierarchy nature of DNS. As devops, you'll have to manage domains, text records. So you'll need to edit those DNS records.
- NSA, C, A, and text are the four hierarchical types you need to be concerned about.
- Some domains require that you authenticate your domain to prove that it's your own. They will give a unique string as a text record

- Record Types
    - MX is only for receiving emails.


### Cryptography
- Symmetric vs asymmetric
    - a hash function doesn't have a cryptographic key to go back to the original plain text message as what was passed into the hash.
    - If there was a crypted key, you are able to go back to plain text. But with hashing, there is no crypted key.

    - With cryptographic fcns, you can run a decrypt function to decrypt a crypted text, and encrypt fcn to encrypt plain text.
    - If fcn is symmetric, key_1 == key_2. Symmetric key cryptography is preferred, meaning two people have same keys to read message being sent from one person to another. With public and private keys, symmetric keys mean both person has both public and private keys to read message.
    - fcn is asym if key_1 != key_2. public and private keys means its asymmetric.

- Using XOR uses substitution cyphers. I think writing a hashing fcn uses XOR.
- There are two substitution and two transposition cyphers. The binary string goes through all four cyphers and the process is repeated hundreds of times to produce a key.

- Asymmetric cryptography
    - both parties have a secured shared key, in which both partners can communicate using symmetric fcn.
    - used to get to a shared key. One for encrypting another for decrypting.
    -


## SSL - Key Exchange
- TLS/SSL defines multiple encryption algorithms for creating a shared symmetric key securely. Also known as a SSL handshake.

- SSL in action
    - Give both public and private key to amazon. ELB can take a certificate as a param. So ELB is responsible for all the handshake. Anything forwarded to us will be unencrypted
- We'll generate a RSA key and make a certificate from that RSA key, then give it to amazon, and it will be managed using certificate manager.
- Every SSL certificate also has a public and private key, and a hash or signature and put it in the certificate. All SSL is a web of trust model, in order to trust it, it needs to be signed by another entity that you trust. Browser manufacturers are the ones who provide a trusted SSL signature, so they have special access to Google Chrome's course code. So now the public can trust your certificate, so they ask you to provide money for that type of service.

- Let's Encrypt is trying to do provide all the signatures for free. So Let's Encrypt.org spoke with Chrome developer to ask if letsencrypt.org can be a trusted source for signatures.


# Friday's lecture
Issues and Concerns
- Downtime is always a concern, so speed is desired.

Write 2 scripts:
- Your script should be able to go back and forward if an issue occurs.
- Script to get VPC up, make sure machine state is same at all times.

Failures can occur from:

Mitigate risks by:
- minimizing network distance.
- automating as much as possible.
- Idempotency with rollback, meaning if you run the script, it will always return same state. There should also be a rollback feature.
    - Idempotency allows you to re-run script in case you don't know which server has what code (i.e. due to loss of internet while running script)

Deployment Strategies
- Cutover
    - Today we will be using Cutover strategy.

- Pilot
    - deploy to one server first. Not all at once. Pile up deployment on one server. And if that works, then deploy it to the rest of the fleet.

- Parallel
    - deploy to half of the fleet to see if there are any more errors now that you're running a newer version an hour later. This is like A/B testing from a developer perspective.
    - Then you update other half. There will be no downtime if you implement parallel. User won't know that you deployment was in the process.

Other Concerns
- DB migrations
    - figuring out which DB is responsible for migrating to main DB.
- Load Balancing
    - need to be considered during mid deployment
- A/B testing
    - can see if one version is getting more or less use.
- Push vs Pull
    - All the servers report back to the main server when testing different servers.
- Multiple server roles with multiple environments


## Puppet
- Ruby DSL. Ruby is really extensible, you can define keywords yourself.
- script define the "final state" of the server.
- each "step" in the script is modeled as a "resource"
- Each resource can be dependent on other resources.
- Puppet then makes a graph of changes to apply based on dependencies

- Each step is its own block, does not execute sequentially, breaks it down in chunks, figure out dependencies for each block.
- Can pass a git commit version variable.
- Knows how to move backward in any state, it's called eventually consistent.
- If you're running less than 100 servers, running Puppet would be overkill. Chef would be preferable because it's simpler.

## Chef
- Doesn't do dependency stuff for you.
- If code breaks it will rollback.
- Find cookbook and run recipe to setup and define a new resource for you. (i.e. find NGINX cookbook, and Chef will setup a NGINX resource)
- Chef only notifies central server that one of the machine is in a bad state, but doesn't do anything about it, unlike Puppet.
- Chef server communicates bi-directionally with chef agents on the machine.
- NGINX doesn't come with Chef

## Ansible
- Python
- Does not use middle-man (labeled as M in slides) server role. Uses a non-middle man approach.
- Run from local machines and connect to all servers, without a central management server.
- uses parallel strategy.
- As startup grows, a bash script will not be enough to sustain deployment strategy.

## SaltStack
- ...

## Opsworks
- AWS Service
- Uses client/server model
    - meaning there's a central server that communicates with Opsworks agent, which is the client. AWS has a central server.
    - you'll have Opsworks agent running on machine. Waiting for something to trigger for Opsworks to happen.
- Comes in 2 flavors:
    - Can use Puppet script or Chef script. Most of the time Chef is sufficient

## Opsworks Units
- Not too restrictive, doesn't enforce how you setup your machines.
- Stacks (highest level unit)
    - (i.e. one stack per environment, dev, prod, but they have different configurations set up). They all share same layer but different config.
    - Production stack, dev stack, staging stack, etc.
- Layers
    - Layer of web servers, another layer of app servers, and another layer for DB.
    - One instance exists on one layer or one stack. Each layer can have scripts attached to the layer. If you have one layer, do this, if you have one stack, do this.
    - If there are different machines, you'll have two layers.
    - layer machines will get a message if anyone else joins the layer.
- Goes down from stack, to layer, to instance.
- We'll be passing the secret JSON details on the stack or layer in Opsworks, through to the script, and use the script to setup, like environment variables. Those variables will be accessible in app.

- Apps
    - Think of an App as a string. And during deployment you have to tell it which app to deployment.
    - It's just another variable that gets passed to the JSON file.
    - It's the only thing it does, it's just a string, an identifier.
    - That's the extent of what we'll be using Apps for in this course.

## Opsworks Lifecycle
- Each machine has a full lifecycle. Runs setup, if another machine joins the same layer, will trigger a configure on all existing machines. And will run deploy for you. Then rest of machines will run configure. We are not going to use that step though.
- You can deploy and un-deploy an app.
- We're only going to be using setup and deploy of lifecycle.

## Custom JSON
- When you deploy app, you can add a little extra JSON which will then be passed to Chef script.
-

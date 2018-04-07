
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

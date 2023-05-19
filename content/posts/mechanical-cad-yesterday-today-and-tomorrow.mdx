---
title: 'Mechanical CAD: Yesterday, Today, and Tomorrow'
excerpt: 'The hardware industry is desperate for a modern way to do mechanical design. A new CAD program built for the modern world would lower the barrier to building hardware, decrease the time of development, and usher in a new era of building!'
coverImage: '/kittycad-long.png'
date: '2021-03-23T15:35:07.322Z'
author:
    name: Jessie Frazelle
    picture: '/jessfraz.jpg'
ogImage:
    url: '/kittycad.png'
---

Computer-aided design, or CAD, has been around since the 1950s. The first graphical CAD program was called Sketchpad and came out of MIT[^1]. Since then, CAD has become essential to designing and manufacturing a hardware product. Today there are multiple different types of CAD. This article will be focused on mechanical CAD, used for mechanical engineering.

In digging into the history of computer graphics you will find some interesting connections between the most ambitious and notorious engineers. Ivan Sutherland, who won the Turing Award for Sketchpad in 1988, had Ed Catmull as a student. Ed Catmull and Pat Hanrahan won the Turing award for their contributions to computer graphics in 2019. This included their work at Pixar building [RenderMan](https://renderman.pixar.com/), which was later licensed to other filmmakers. This led to innovations in hardware, software, and GPUs. Without these folks, not only would we not have mechanical CAD, we also wouldn’t have the level of animated films we have today. We wouldn’t even have GPUs!

Modeling geometries has greatly evolved over time. Solids were first modeled as wireframes by representing the object by its edges, line curves, and vertices. This evolved into surface representation using faces, surfaces, edges and vertices. Surface representation is very valuable in robot path planning as well, not just modeling solids. Wireframe and surface representation contain only geometrical data. Today, modeling includes topological information to describe how the object is bounded, connected, and its neighborhood[^2].

OpenCascade, Parasolid, and ACIS are all what is known as a boundary-representation kernel, most people refer to them as B-rep kernels. A B-rep model is composed of geometry and topology information. The topology information tends to differ depending on the program used. B-rep file formats include STEP, IGES, NX’s prt, Solid Edge’s par and asm, Creo’s prt and asm, Solidworks’ sldprt and sldasm, Inventor’s ipt and iam, and AutoCad’s dwg.

Visual-representation, or vis-rep, models tend to be much smaller in data size than b-rep models. This is because they do not contain as much structural or product management information. Vis-rep models are approximations of geometry and are composed of a mass of flat polygons. Vis-rep file formats include obj, STL, 3D XML, 3D PDF, COLLADA, and PLY.

CAD programs tend to use b-rep models while animations, game development, augmented reality, and virtual reality tend to use vis-rep models. However, the two are interchanged frequently. For example, if you had a b-rep model you were using for manufacturing but wanted to load it into Apple’s ARKit for some animations, you would first convert it to COLLADA, a vis-rep file format. The file should already be a bit smaller from dropping all the CAD data. If you wanted to make it even smaller you could tweak the polygon counts on each of the meshes for the various parts.

The tools we build with today are built on the shoulders of giants! But there is a tremendous amount we could do to make them even better. At some point, mechanical CAD lost some of its roots of innovation. Let’s dive into a few of the problems with the CAD programs that exist today and how we can make it better.

## Single-threaded

Since most CAD kernels are built on cores from the 80s, they were not built for modern systems. Even if you have the latest CPU or GPU it won’t do much to help the performance since most of these programs are single-threaded[^3], or have single-threaded aspects, and have no awareness of a GPU. Sure, some of these kernels have been updated since the 80s but their roots are still tied to their predecessors[^4].

That does not mean that all CAD kernels are _entirely_ single-threaded. Parasolid is multi-threaded but that still means if you are importing or exporting to a file format other than Parasolid, you might have just switched back to a single-threaded process. Another example of a multi-threaded kernel is [ImplicitCAD](https://www.implicitcad.org/), which is written in Haskell.

One problem with making a whole CAD program multithreaded is the different file formats. For example, a STEP file, whose format dates back to the 80s[^5], pretty much mandates the need for a single-threaded process[^6]. Additionally, most parametric CAD operations are single-threaded. However, the open-source project [SolveSpace](https://solvespace.com/index.pl), which uses non-uniform rational basis splines (NURBS), has some parallel operations.

## Duplication

In software development, when you want to get the contents of a memory address, you use a pointer. This allows you to reference the same content of memory over and over again without the expense of copying the content itself.

Some products built in CAD may never duplicate a part of their model ever — lucky for them! For folks who do have multiple similar parts in their CAD designs, most CAD programs are creating very expensive copies of the parts.

For example, let’s imagine a model of a server rack. The _default_ method of copying a part[^7] in Solidworks, as well as many other industry wide CAD programs, is to copy the entire contents of a child model to a new model. So if we have 32 sleds in our server rack and we use the default copy method in Solidworks, we have 32 of the exact same model in individual copies. This is very expensive! As you can imagine, each sled has a bunch more models inside, and then those models have child models as well. This exponentially increases the work on the kernel and on our program to even load our model in the first place since the program does not know these are all the same thing.

If we think back to software development, what we really want is a form of pointer to the model. In the CAD world, these are called instances. Then we can have one copy of the model stored, and all the other instances are actually just a reference to the original copy. This also saves the user a bunch of time! Imagine having to update parts of models in 32 different locations when a part in a sled changes. No one could describe this better than Albert Einstein when he said, “The definition of insanity is doing the same thing over and over again, but expecting different results.”

While the default copy method in Solidworks is very expensive, they do offer another option that is more in line with how pointers operate. However, since this is not the default, you can imagine most people might not even realize there is a better way. This might seem mundane and the answer should be “just use the other way”, but products should try to make the default path lead to the least amount of pain. Instead of having two methods for copying, have one! Make the default method act more like a pointer (or instance) _until_ the geometry, surfaces, or topology of the copy (not the main) has changed. In which case warn the user that this will now act like a unique part aside from the main copy. Or the user might have mistakenly meant to apply those changes to all the copies in which case they should apply the changes to the main copy.

There is another huge problem with this as well. Each individual CAD program has their own way of implementing and referencing instances. So if you export your program from one CAD program to another, likely you will still have 32 individual sleds versus the concept of 1 sled and 31 references to the original sled with only the xyz coordinates changed. Some programs offer ways to import instances but it all relies on the type of file format you are importing and if they have the support for that.

As an additional cherry on top, even if you are using instances you are still at the mercy of the single-threaded kernel and likely none of the copies are going to render in parallel.

## Version control

For software teams that are accustomed to using git, having the ability to diff, fix merge conflicts, and work as a team in parallel on the same file is a huge time saver. For mechanical CAD, there are a number of startups trying to solve this problem.

Instead of re-inventing version control for CAD, folks who use git today want to continue to use git and not have to add another tool to their workflow. The way CAD files are today, there is no way to push them to a git repo, have several people modify the file, and resolve merge conflicts[^8]. For all the startups working to solve version control for mechanical CAD, this is why they had to reinvent the wheel.

However, in a world where we could make a kernel that fully utilizes a modern CPU and GPU, can we not also use a file format that is human-readable and would allow for resolving merge conflicts? When you ask yourself “what is human readable and works well with git?”, the first thing that comes to mind is a programming language.

The other great win from using a programming language is: even if you don’t use git or want to use git, there are many different options already for version control of human-readable files. Additionally, integrations with GitHub and other version control tools could be extended with wasm support so that diffs could be visualized as renders as well.

## Programmable

Let’s think back to our example of the rack of servers. If part of our rack contained complex math that we were calculating in a program like Mathematica, we would have to continuously re-evaluate the math in another program and update it in our model. If instead we could program in the CAD program itself, then we could do all our calculations in one place and the model would update if anything in our equations changed.

For our rack of servers, each sled has network cables that connect to the back of the sled. Using the GUI it is quite hard to make these perfectly aligned with the connector on the sled. Someone would have to sit with the model for an hour or so just tweaking each individual cable to be perfectly aligned. That is a huge waste of time! Rather, if we could program the alignment of the cables, we could ensure each was perfectly aligned with the connector.

The need for programming becomes even more acute if you want to do mesh or topology optimizations. Unfortunately, most optimizations are implemented through GUI click interfaces, and given their complexity to define, can often be more trouble than they are worth. Today, some of the industry used programs allow for scripting, but their APIs are COM based and as you can imagine built in the 90s. But it’s great they even offer it for the ones that do! Thank you AutoCAD for being the first CAD command line interface I got to use!

For the modern world, it would be great to generate sdk clients for the CAD program in every language. Much like how API clients are generated. This way, anyone could program in any language! It greatly lowers the barrier to entry since you wouldn’t have to learn a new language. This would allow for complex math to be done in the CAD program itself versus using Mathematica, MATLAB, or Wolfram Alpha.

A few scriptable CAD programs exist today and are great examples of paving the way for this: [ImplicitCAD](https://www.implicitcad.org/), [libfive Studio](https://libfive.com/), [OpenSCAD](https://www.openscad.org/), [CadQuery](https://github.com/CadQuery/cadquery), [FreeCAD](https://www.freecadweb.org/), and [ruckus](https://github.com/cbiffle/ruckus). [Blender](https://www.blender.org/) has a great console interface. [Three.js](https://threejs.org/), while not CAD oriented, is also another great example of 3D programming languages. Jonathan Blow’s [Jai](https://oxide.computer/podcast/on-the-metal-9-jonathan-blow/) is for writing systems-level code, and a great example of creating a language thinking heavily about performance[^9].

Most of the mechanical engineering community is tied to the GUI, so you’d also need a way to generate code from GUI interactions. This is quite similar to an HTML “point and click” GUI that generates code on the backend. This allows folks who want to script to script and others who want to click can click. Both worlds can be happy — code on the left side, render on the right, just like a markdown editor.

If there is an SDK client for the CAD program and underlying kernel, you can imagine a very rich ecosystem of plugins and tools emerging much like the ecosystem that surrounds VSCode, vim, and emacs. Most CAD editors used for products are very closed off and don’t allow for this type of community-based development and sharing. Plugins could be written for any use case, for example: mesh/topology optimizations and supply chain system integrations. This includes the functionality for finding parts, creating bills of materials (BOMs), and computing lead times for parts of the model. Today, this is usually done in separate programs or even spreadsheets.

I’d personally love plugins to support a command+P function. In most programs, when you want to print something, you hit command+P[^10]. For mechanical CAD, when I want to “print” my model the underlying program should discover all the 3D printers and machines on my local network (or plugged directly into my machine) and send the parts of my model that are compatible with that machine to be printed. You could even take this a step further — in a fully automated factory with robots, the program should set up and start the assembly for the model and all the parts.

Speaking of 3D printing, let’s dive in a bit to the STL file format. The STL format was defined in 1987 and its namesake comes from stereolithography, the first method of additive manufacturing. STL files represent geometry in a series of triangular surfaces. Since STL is a vis-rep format, it does not hold any data about internal structure, color, texture, or any other CAD data that a b-rep format would contain. Modern 3D printers have innovated past the simplicity of the STL format. For example, if you wanted to print a full color model, you should use a VRML (Virtual Reality Modeling Language) file or you’d need an STL file associated with textures in order for the printer to add color and texture to your object. Plugins can ensure that your printer gets the right data for your specific model, without the pain of conversion and make sure no materials or textures are dropped.

## Testing

The test flow of CAD models usually consists of running simulations. These can be for various different things but we can use airflow and thermals as examples.

In the software world, after pushing our code updates, typically a CI is run on our changes letting us and our teammates know if we broke anything and our code is safe to merge. CAD should work in the same way. If we make changes to a model, our simulations should run in a CI to let our teammates know if our code is safe to merge. Most of these simulations are very compute intensive so being able to offload the simulations to the cloud or remote servers would also be ideal.

Much like VSCode and other editors have nice plugins for offloading tests to other computers, a modern CAD program should have the same.

## User Experience and Design

After trying numerous different industry CAD programs, most have one thing in common: a user interface that looks like it is from the 90s. It is a bit ironic that a tool used for mechanical design has not considered the design and experience of its user interface. Most CAD programs are in need of a makeover, however there are a couple outliers that do interface design well. [Shapr3D](https://www.shapr3d.com/), an iPad CAD app, has a great design and very intuitive interface. [SketchUp](https://www.sketchup.com/products/sketchup-pro) has a more intuitive and beautiful design.

Additionally, CAD applications need to be native on MacOS, Linux, and Windows. Native applications built for their specific platform perform better than ones built with Electron[^11] and the like. Especially for a program as graphics heavy as CAD, it is best to utilize the underlying OS graphics mechanisms to get the best performance possible. Today, you can only use CAD programs on the single OS that is supported by that specific program. Additionally, most of them use archaic GUI frameworks that truly show their age.

[OnShape](https://www.onshape.com/en/) changed the mold by offering a software-as-a-service (SaaS) CAD program. This allows expensive compute processes to be easily offloaded to the cloud. This was truly revolutionary and a great idea. However, this limits users ability to work offline. In contrast, native apps can work offline but also have the ability to offload workloads to the cloud when you are connected to the network.

By focusing on having an intuitive design that does not fall into a trap of complexity, both new users and pro users should be productive. Just like I would use vim for a side project and also professional projects, I would expect my CAD tool to work for building a toy for fun, just as well as it would work for a complex project. A lot of this comes down to the interface design and extensibility through plugins.

## A better tomorrow

Each of these aspects needs to be thought through for a new CAD program. To date, not one existing CAD program has solved all of these problems.

We owe so much of the amazing innovations of computer graphics to brilliant folks like Ivan Sutherland, Pat Hanrahan, Ed Catmull, John Carmack, and so many others. I can only hope some truly revolutionary changes are headed to the world of computer-aided design in the same way that computer graphics pioneers paved the way for rendering, animations, and virtual reality.

The hardware industry is desperate for a modern way to do mechanical design. A new CAD program built for the modern world would lower the barrier to building hardware, decrease the time of development, and usher in a new era of building!

> This post was originally published on
> [medium](https://medium.com/embedded-ventures/mechanical-cad-yesterday-today-and-tomorrow-981cef7e06b1).
> It has been copied here for the sake of preserving history.

[^1]: [http://images.designworldonline.com.s3.amazonaws.com/CADhistory/Sketchpad_A_Man-Machine_Graphical_Communication_System_Jan63.pdf](http://images.designworldonline.com.s3.amazonaws.com/CADhistory/Sketchpad_A_Man-Machine_Graphical_Communication_System_Jan63.pdf)
[^2]: A neighborhood of a point is a set of points containing that point where one can move some amount in any direction away from that point without leaving the set.
[^3]: OpenSCAD, and everything built on CGAL are all single threaded.
[^4]: I am sure there is a lot to learn from these codebases. But as someone who has seen many old code bases, this can lead down a dangerous path.
[^5]: [https://www.iso.org/committee/54110.html](https://www.iso.org/committee/54110.html)
[^6]: Additionally, you cannot read a step file sequentially, you need to load the whole thing into memory and then resolve it.
[^7]: Using “copy” and “paste”.
[^8]: You could, but it would be the opposite of fun.
[^9]: This is not yet open to the public, but he has talked about it extensively.
[^10]: Creo probably has the closest thing to this functionality but lacks an open ecosystem.
[^11]: That being said, VSCode is a very nice Electron app.

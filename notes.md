 * Server is Backend *
 * Client is Frontend *
 * MVC - controllers & routes are hand-in-hand *

 * Front end code is ready to be integrated with the backend, often made AHEAD of backend *

 * client package.json has arwes dependency *
    - arwes is a Futuristic Sci-Fi UI Web Framework

* Always a 1 to 1 relationship between routers & controllers *
//////////////////

 * Testing In Node *
    - Test Runner
    - Text Fixtures
    - Assertions
    - Mocking

    jest includes ALL of the above. Works on front/back. 

    SuperTest allows us to test HTTP / APIs. (express server). 


* Node/JS event loop is Single-Threaded * --> Can only run one line (request) at a time.

* Worker_Threads module * require('worker-threads')
    - Runs 'isolates' to create 'new' threads to execute JS code side by side with each V8 isolate handling the JS code for one thread. 
    - Mimics 'multi-threading'.
    - Takes advantage of multiple cpu processes available on our machine.

- TO RECAP -

    * Cluster Module * - multiple instances of node in separate processes. FOR SERVERS.
    node server.js --> master --> fork() --> worker ... can call fork however many times you like to create new workers. 

     3 instances of Node
     3 process

    * Worker_Threads * - multiple instances of node in the same process, taking advantage of V8 isolate feature. 
    node index.js --> MAIN THREAD --> new Worker() --> worker thread ... can create as many workers as we'd like.

    3 instances of Node
    1 process

    USING index.js, not server.js, because it doesn't share requests into a server. Doesn't include any built in functionality to run a server on one port and distribute incoming requests. 


mongoDb user:
    nasa-api
    NDrtAAjGxE8UJuPC

    * mongoose to connect to mongoDB. npm i mongoose

* Node.js queries -> MODEL uses-> SCHEMA maps to-> COLLECTION has many-> DOCUMENTS

* Mongoose Models vs MVC Models *
    - Mongoose Models are objects and classes that Mongoose provides for us to talk to collections of documents in MongoDB.
    - Models in MVC are a more general concept that can apply to any database or source.
        * Captures the data our API is working with.
    - We're using model.js files to hide mongo.js files. 
        - model.js are higher level and easier to work with than a mongoose model would be directly.
    
    * ObjectId in Mongo? *
        - Unique identifier for each document.
        - Essentially a SERIAL PK(?) in SQL.
        - Very unlikely two different docs will have the same id.
        - Holds creation date in it!!!
    
    * __v: ? *
        - version key
        - If you change the schema of your collection, can increase to show new data from old schema.
        - Good idea to filter out when returning the data.
        

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


# openfedx
and open sdk for the fedex api

# Status
This SDK is currently in early development the road map to 1.0 (prod ready) 
Each minor incredment IE 0.Thisone.0 will introduce a new fully functioning API 

# Usage
This SDK is essentially a state machine, continue to chain calls to build out your
request with the API IE: 

const token = await fedex.authenticate().consumeToken();
fedex.authenticate().rates().generateTestRequest();

methods that begin with consume end your method chains and will execute returning
what ever the proceeds the consume in this example token. 

It is highly recomended that you always call authenticate first. 
const token = await fedex.authenticate().run();

The run function executes the method chain without returning a value good if you
are only interested in the side effects of the method chains. 

Errors encountered during the method chain are caught and logged to standard out, 
returning undefined. 

# Planned features from main path
Custom error handling

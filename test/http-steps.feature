Feature: making http requests

    Scenario: I want to make a request
        Given I set property foo of request body to string bar
        When I send a POST request to /foo
        Then the response status code is 200
        And I check property foo of response body equals string bar

    Scenario: I want to make a request of which host and port are defined in the testConfig
        Given I set property foo of request body to string bar
        When I send a POST request to /foo
        Then the response status code is 200
        And I check property foo of response body equals string bar

    Scenario: I want to make a request to a full url
        Given I set property foo of request body to string bar
        When I send a POST request to http://localhost:8080/foo
        Then the response status code is 200
        And I check property foo of response body equals string bar

    Scenario: I want to make a request which contains parameters
        Given I set property foo of bar to string localhost
        Given I set property foo of request body to string bar
        When I send a POST request to http://{bar.foo}:8080/foo
        Then the response status code is 200
        And I check property foo of response body equals string bar

    Scenario: I want to prepare an object as request body
        Given I set property foo of myObject to string bar
        And I set the request body to property myObject
        When I send a POST request to /foo
        Then the response status code is 200
        And I check property foo of response body equals string bar

    Scenario: I want to make a request with a specific header
        Given I set property test-foo of request headers to string bar
        When I send a POST request to /foo
        Then the response status code is 200
        And I check property test-foo of response headers equals string bar

    Scenario: I want to make a request with a specific header
        Given I set the request header test-foo with value bar
        When I send a POST request to /foo
        Then the response status code is 200
        And I check property test-foo of response headers equals string bar

    Scenario: I want to make a polling request
        Given I set property foo of request body to string bar
        And I set property request-type of request headers to string delay
        When I poll with a POST request to /foo until property res.statusCode equals number 200
        Then I check property foo of response body equals string bar

    @https
    Scenario: I want to make a HTTPS Request
        Given I set property cert to file customer-client.crt
        Given I set property key to file customer-client.key
        And I set property req.agentOptions.cert to property cert
        And I set property req.agentOptions.key to property key
        When I send a GET request to https://localhost:8081/foo
        Then the response status code is 200

    @form-data
    Scenario: I want to make a request with from-data
        Given I set content type to multipart/formdata
        Given I set property formData of request to file ice.jpg
        When I send a POST request to /api/form-data
        Then the response status code is 200

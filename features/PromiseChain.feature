Feature: Promise chain performance test
  As a developer
  I try running test with or without promise chain
  So I can check which is the best solution
  
  Scenario Outline: Checking run <type> promise chain <number> times
    Given test page is opened
    When test run <type> promise chain <number> times
    Then all titles have checked
    And all buttons have checked
    
    Examples:
      | type    | number |
      | without | 50     |
      | with    | 50     |
      | without | 100    |
      | with    | 100    |
      | without | 200    |
      | with    | 200    |
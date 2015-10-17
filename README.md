# Stripe Web Data Connector
Get your Stripe.com data into Tableau!

This connector allows you to pull in all of your Stripe charges data into Tableau so you can begin slicing, dicing, and exploring.

### Requirements
All you need is Tableau (9.1 or greater), a Stripe.com account, and your Stripe private key. The connector will use the Stripe API to retrieve your charge data and build an extract for you.

### Refreshes
Refreshes work just like refreshing any extract. For incrementals, the connector will remember where you left off with the data pulled and retrieve from that point forward. Full refreshes will pick up everything. You don't even have to enter your Stripe key again!

### To Do
* Other types of records other than Charges
* Update to latest version of the API
* Handle refund sub-records
* Handle fraud details sub-records


### License
The MIT License (MIT)

Copyright (c) 2015 Benji Schwartz-Gilbert

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

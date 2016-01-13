/**
 * This provides the basic implementation for consuming charges data from Stripe through the API
 *
 * Version 1.0.0
 */

/**
 * Module for performing various data manipulation helper functions
 */
var DataTools = (function() {
	var flatten = function(obj) {
		for(var key in obj) {
			if(obj.hasOwnProperty(key) && (typeof obj[key] == 'object')) {
				var subObj = obj[key];
				this.flatten(subObj);
				for(var k in subObj) {
					if(subObj.hasOwnProperty(k)) {
						k = k.trim().replace(/\s+/, '_').toLowerCase();
						obj[key + '_' + k] = subObj[k];
					}
				}

				delete obj[key];
			}
		}
	};

	return {
		flatten : flatten
	};
})();

(function() {
	var StripeConnector = tableau.makeConnector();

	/**
	 * Setup the initialization function to initialize the connection for incremental refreshes on the id column
	 */
	StripeConnector.init = function() {
		if(tableau.interactive) {
			tableau.connectionName = 'Tableau Stripe Connector';
			tableau.incrementalExtractColumn = 'id';
		}

	    tableau.initCallback();
	};

	/**
	 * Setup the headers and field types for a merged version of the Stripe Charge object
	 *
	 * This needs to be done statically rather than dynamically from one of the Stripe charge objects because we have no
	 * guarantee that the charge object used will have all of the necessary fields that would be mapped for other charges
	 */
	StripeConnector.getColumnHeaders = function() {
		var fieldnames = [], fieldtypes = [];

		// Add in 'id' field
		fieldnames.push('id');
		fieldtypes.push('string');

		// Add in 'created' field
		fieldnames.push('created');
		fieldtypes.push('datetime');

		// Add in 'amount' field
		fieldnames.push('amount');
		fieldtypes.push('int');

		// Add in 'amount_refunded' field
		fieldnames.push('amount_refunded');
		fieldtypes.push('int');

		// Add in 'currency' field
		fieldnames.push('currency');
		fieldtypes.push('string');

		// Add in 'livemode' field
		fieldnames.push('livemode');
		fieldtypes.push('bool');

		// Add in 'captured' field
		fieldnames.push('captured');
		fieldtypes.push('bool');

		// Add in 'refunded' field
		fieldnames.push('refunded');
		fieldtypes.push('bool');

		// Add in 'paid' field
		fieldnames.push('paid');
		fieldtypes.push('bool');

		// Add in 'invoice' field
		fieldnames.push('invoice');
		fieldtypes.push('string');

		// Add in 'description' field
		fieldnames.push('description');
		fieldtypes.push('string');

		// Add in 'statement_description' field
		fieldnames.push('statement_description');
		fieldtypes.push('string');

		// Add in 'source_id' field
		fieldnames.push('source_id');
		fieldtypes.push('string');

		// Add in 'source_object' field
		fieldnames.push('source_object');
		fieldtypes.push('string');

		// Add in 'source_last4' field
		fieldnames.push('source_last4');
		fieldtypes.push('string');

		// Add in 'source_brand' field
		fieldnames.push('source_brand');
		fieldtypes.push('string');

		// Add in 'source_funding' field
		fieldnames.push('source_funding');
		fieldtypes.push('string');

		// Add in 'source_exp_month' field
		fieldnames.push('source_exp_month');
		fieldtypes.push('int');

		// Add in 'source_exp_year' field
		fieldnames.push('source_exp_year');
		fieldtypes.push('int');

		// Add in 'source_fingerprint' field
		fieldnames.push('source_fingerprint');
		fieldtypes.push('string');

		// Add in 'source_country' field
		fieldnames.push('source_country');
		fieldtypes.push('string');

		// Add in 'source_name' field
		fieldnames.push('source_name');
		fieldtypes.push('string');

		// Add in 'source_address_line1' field
		fieldnames.push('source_address_line1');
		fieldtypes.push('string');

		// Add in 'source_address_line2' field
		fieldnames.push('source_address_line2');
		fieldtypes.push('string');

		// Add in 'source_address_city' field
		fieldnames.push('source_address_city');
		fieldtypes.push('string');

		// Add in 'source_address_state' field
		fieldnames.push('source_address_state');
		fieldtypes.push('string');

		// Add in 'source_address_zip' field
		fieldnames.push('source_address_zip');
		fieldtypes.push('string');

		// Add in 'source_address_country' field
		fieldnames.push('source_address_country');
		fieldtypes.push('string');

		// Add in 'source_cvc_check' field
		fieldnames.push('source_cvc_check');
		fieldtypes.push('bool');

		// Add in 'source_address_line1_check' field
		fieldnames.push('source_address_line1_check');
		fieldtypes.push('bool');

		// Add in 'source_address_zip_check' field
		fieldnames.push('source_address_zip_check');
		fieldtypes.push('bool');

		// Add in 'source_dynamic_last4' field
		fieldnames.push('source_dynamic_last4');
		fieldtypes.push('string');

		// Add in 'source_tokenization_method' field
		fieldnames.push('source_tokenization_method');
		fieldtypes.push('string');

		// Add in 'source_customer_id' field
		fieldnames.push('source_customer_id');
		fieldtypes.push('string');

		// Add in 'failure_message' field
		fieldnames.push('failure_message');
		fieldtypes.push('string');

		// Add in 'failure_code' field
		fieldnames.push('failure_code');
		fieldtypes.push('string');

		// Add in 'receipt_email' field
		fieldnames.push('receipt_email');
		fieldtypes.push('string');

		// Add in 'receipt_number' field
		fieldnames.push('receipt_number');
		fieldtypes.push('string');

		// Add in 'customer' field
		fieldnames.push('customer_id');
		fieldtypes.push('string');

		// Add in 'balance_transaction_id' field
		fieldnames.push('balance_transaction_id');
		fieldtypes.push('string');

		// Add in 'transfer_id' field
		fieldnames.push('transfer_id');
		fieldtypes.push('string');

		// Add in 'shipping_address_line_1' field
		fieldnames.push('shipping_address_line_1');
		fieldtypes.push('string');

		// Add in 'shipping_address_line_2' field
		fieldnames.push('shipping_address_line_2');
		fieldtypes.push('string');

		// Add in 'shipping_address_city' field
		fieldnames.push('shipping_address_city');
		fieldtypes.push('string');

		// Add in 'shipping_address_state' field
		fieldnames.push('shipping_address_state');
		fieldtypes.push('string');

		// Add in 'shipping_address_postal_code' field
		fieldnames.push('shipping_address_postal_code');
		fieldtypes.push('string');

		// Add in 'shipping_address_country' field
		fieldnames.push('shipping_address_country');
		fieldtypes.push('string');

		// Add in 'shipping_name' field
		fieldnames.push('shipping_name');
		fieldtypes.push('string');

		// Add in 'shipping_carrier' field
		fieldnames.push('shipping_carrier');
		fieldtypes.push('string');

		// Add in 'shipping_phone' field
		fieldnames.push('shipping_phone');
		fieldtypes.push('string');

		// Add in 'shipping_tracking_number' field
		fieldnames.push('shipping_tracking_number');
		fieldtypes.push('string');

		tableau.headersCallback(fieldnames, fieldtypes);
	};

	/**
	 * Retrieves data from Stripe in batches
	 *
	 * @param String lastChargeId The charge id of the last record to be retrieved from Stripe
	 *
	 */
	StripeConnector.getTableData = function(lastChargeId) {
		var requestConfig = {
			crossDomain : true,
			data : {
				// Max out the number of records we're grabbing at a time
				limit : 100
			},
			dataType : 'json',
			beforeSend: function(xhr) {
			    xhr.setRequestHeader("Authorization", "Bearer " + tableau.password);
			    xhr.withCredentials = true;
			},
			statusCode : {
				403: function() {
					tableau.log("The private key you provided was invalid or otherwise failed to authenticate against your account");
				},
				500: function() {
					tableau.log("An internal error was encountered on the Stripe servers");
				}
			},
			url : 'https://api.stripe.com/v1/charges'
		};

		if((lastChargeId != null) && (lastChargeId != '')) {
			requestConfig.data.starting_after = lastChargeId;
		}

		var retrievedData = [],lastChargeId;
		$.ajax(requestConfig).done(function(response, status, jqxhr) {
			if((status == 'success') && (response != null)) {
				if(response.data != null) {
					for(var i = 0; i < response.data.length; i++) {
						var charge = response.data[i], result = {};
						// Set the last Charge Id encountered
						lastChargeId = charge.id;

						// Convert the created field to a formatted datetime string
						charge.created = new Date(charge.created * 1000).toISOString();

						// Remove sub-objects and fields we don't want in the flattened object
						delete charge.object;
						delete charge.fraud_details;
						delete charge.refunds;

						// Flatten the returned object down
						DataTools.flatten(charge);

						retrievedData.push(charge);
					}
				} else {
					tableau.log("Response came back as 'success' but returned no data from Stripe");
					tableau.abortWithError("Doesn't look like we got any data back from Stripe. Do you have any charges to retrieve?");
				}
			} else {
				tableau.log("Retrieving data from Stripe failed with status {" + status + "}");
				tableau.abortWithError("Sorry, the result from the Stripe API indicates the request failed");
			}

			// Pass the data and last charge id to Tableau
			tableau.lastRecordToken = lastChargeId;
			tableau.dataCallback(retrievedData, lastChargeId, response.has_more);
		}).fail(function(jqxhr, status, error) {
			tableau.log("Retrieving data from Stripe failed with status {" + status + "} and error {" + error + "}");
			// Pass the data and last charge id to Tableau
			tableau.abortWithError("Sorry, the request to the Stripe API failed");
		});
	};

	/**
	 * Setup parsing of the secret key input element
	 */
	$(document).ready(function() {
		var stripePrivateKeyElem = $("#stripe-private-key");
		if(stripePrivateKeyElem.length == 1) {
			stripePrivateKeyElem.popover({
				container : 'body',
				content : 'You need to provide a value for the Stripe private key so that we can retrieve your data.',
				placement : 'bottom',
				trigger : 'manual'
			});
			stripePrivateKeyElem.focus(function() {
				stripePrivateKeyElem.popover('hide');
				stripePrivateKeyElem.parent().removeClass('has-error');
			});

			$("#stripe-private-key-form").submit(function(event) {
				// Prevent default form submit behavior
				event.preventDefault();

				var stripePrivateKey = stripePrivateKeyElem.val();
				if((stripePrivateKey != null) && (stripePrivateKey != '')) {
					tableau.password = stripePrivateKey;
					tableau.submit();
				} else {
					stripePrivateKeyElem.parent().addClass('has-error');
					stripePrivateKeyElem.popover('show');
				}

				return false;
			});
		}
	});

	// Register the stripe connector that's been configured
	tableau.registerConnector(StripeConnector);
})();
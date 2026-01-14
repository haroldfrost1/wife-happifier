### Example Full API Endpoint URL

Source: https://developer.up.com.au/index

An illustration of how a specific endpoint, such as `GET /accounts`, is combined with the base URL to create a fully qualified and callable API endpoint.

```Text
https://api.up.com.au/api/v1/accounts
```

---

### Sample Request: List Webhook Logs

Source: https://developer.up.com.au/index

An example cURL command demonstrating how to fetch webhook delivery logs for a specific webhook, including authentication and specifying the page size for pagination.

```curl
curl https://api.up.com.au/api/v1/webhooks/1bcf7477-a232-4bd7-ba38-80673cca9910/logs \
-G \
-H 'Authorization: Bearer up:demo:a3yX5KRTHu2sK4bx' \
-d 'page[size]=1'
```

---

### Retrieve Webhooks List using cURL

Source: https://developer.up.com.au/index

Example cURL command to fetch a list of webhooks from the Up API. This demonstrates how to use the GET method with authorization and pagination parameters to retrieve webhook data.

```curl
curl https://api.up.com.au/api/v1/webhooks \
-G \
-H 'Authorization: Bearer up:demo:QSoWoJCsW6coSztt' \
-d 'page[size]=1'
```

---

### Sample Response: List Webhook Logs

Source: https://developer.up.com.au/index

A JSON example of the response received when listing webhook delivery logs. It includes details about the request, response, delivery status, and pagination links.

```json
{
  "data": [
    {
      "type": "webhook-delivery-logs",
      "id": "8e95a0f0-3d4c-4294-9c44-563b745662f1",
      "attributes": {
        "request": {
          "body": "{\"data\":{\"type\":\"webhook-events\",\"id\":\"26fa6493-b4fe-4d6f-baa6-7bd72db1e8fc\",\"attributes\":{\"eventType\":\"TRANSACTION_CREATED\",\"createdAt\":\"2025-06-03T00:22:51+10:00\"},\"relationships\":{\"webhook\":{\"data\":{\"type\":\"webhooks\",\"id\":\"1bcf7477-a232-4bd7-ba38-80673cca9910\"},\"links\":{\"related\":\"https://api.up.com.au/api/v1/webhooks/1bcf7477-a232-4bd7-ba38-80673cca9910\"}},\"transaction\":{\"data\":{\"type\":\"transactions\",\"id\":\"ba763685-fd3d-4307-bf7a-1a0da2c5f3a7\"},\"links\":{\"related\":\"https://api.up.com.au/api/v1/transactions/ba763685-fd3d-4307-bf7a-1a0da2c5f3a7\"}}}}}}"
        },
        "response": {
          "statusCode": 200,
          "body": "{\"ok\":true}"
        },
        "deliveryStatus": "DELIVERED",
        "createdAt": "2025-06-03T00:22:51+10:00"
      },
      "relationships": {
        "webhookEvent": {
          "data": {
            "type": "webhook-events",
            "id": "26fa6493-b4fe-4d6f-baa6-7bd72db1e8fc"
          }
        }
      }
    }
  ],
  "links": {
    "prev": null,
    "next": "https://api.up.com.au/api/v1/webhooks/1bcf7477-a232-4bd7-ba38-80673cca9910/logs?page%5Bafter%5D=WyIyMDI1LTA2LTAyVDE0OjIyOjUxLjI1MzU5ODAwMFoiLCI4ZTk1YTBmMC0zZDRjLTQyOTQtOWM0NC01NjNiNzQ1NjYyZjEiXQ%3D%3D&page%5Bsize%5D=1"
  }
}
```

---

### List Accounts: Sample Request (cURL)

Source: https://developer.up.com.au/index

Demonstrates how to make a cURL request to list all accounts from the Up API. This example includes the Authorization header and a pagination parameter to limit the page size.

```curl
curl https://api.up.com.au/api/v1/accounts \
-G \
-H 'Authorization: Bearer up:demo:9lHvlo0pmtvTfLlP' \
-d 'page[size]=1'
```

---

### Example URL for Specifying Pagination Page Size

Source: https://developer.up.com.au/index

Demonstrates how to use the `page[size]` query parameter to control the number of resources returned per page in paginated API requests, with a typical upper limit of 100.

```Text
https://api.up.com.au/api/v1/accounts?page[size]=10
```

---

### Sample JSON Response: List Categories

Source: https://developer.up.com.au/index

An example of the JSON structure returned by the /categories endpoint, showing multiple category resources with their attributes and relationships, including parent and children links.

```json
{
  "data": [
    {
      "type": "categories",
      "id": "hobbies",
      "attributes": {
        "name": "Hobbies"
      },
      "relationships": {
        "parent": {
          "data": {
            "type": "categories",
            "id": "good-life"
          },
          "links": {
            "related": "https://api.up.com.au/api/v1/categories/good-life"
          }
        },
        "children": {
          "data": [],
          "links": {
            "related": "https://api.up.com.au/api/v1/categories?filter%5Bparent%5D=hobbies"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/categories/hobbies"
      }
    },
    {
      "type": "categories",
      "id": "restaurants-and-cafes",
      "attributes": {
        "name": "Restaurants & Cafes"
      },
      "relationships": {
        "parent": {
          "data": {
            "type": "categories",
            "id": "good-life"
          },
          "links": {
            "related": "https://api.up.com.au/api/v1/categories/good-life"
          }
        },
        "children": {
          "data": [],
          "links": {
            "related": "https://api.up.com.au/api/v1/categories?filter%5Bparent%5D=restaurants-and-cafes"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/categories/restaurants-and-cafes"
      }
    }
  ]
}
```

---

### Sample Webhook Creation Response

Source: https://developer.up.com.au/index

Example JSON response received after successfully creating a webhook, including its unique identifier, configured URL, description, a one-time secret key for signature verification, and creation timestamp.

```json
{
  "data": {
    "type": "webhooks",
    "id": "eee8034c-9599-409c-8dd5-b04a75bddf23",
    "attributes": {
      "url": "http://example.com/webhook",
      "description": "Example webhook",
      "secretKey": "oC8HhYUjSm3fapyXde1Rjo78X9Mhl6gqnEg6q5BD40L2o3bx9iKTZoks1LgoV0oD",
      "createdAt": "2025-06-04T00:21:49+10:00"
    },
    "relationships": {
      "logs": {
        "links": {
          "related": "https://api.up.com.au/api/v1/webhooks/eee8034c-9599-409c-8dd5-b04a75bddf23/logs"
        }
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/webhooks/eee8034c-9599-409c-8dd5-b04a75bddf23"
    }
  }
}
```

---

### List All Attachments API Request and Response

Source: https://developer.up.com.au/index

Demonstrates how to make a GET request to retrieve a list of all attachments, including authorization, and provides the full JSON response structure with pagination links and individual attachment details.

```curl
curl https://api.up.com.au/api/v1/attachments \
-H 'Authorization: Bearer up:demo:qiVJLF5hYRrwLdCO'
```

```json
{
  "data": [
    {
      "type": "attachments",
      "id": "e8513ab4-64b8-4180-a7f6-817ed7e8ad75",
      "attributes": {
        "createdAt": "2025-06-04T00:21:29+10:00",
        "fileURL": "http://localhost:8080/asset/customer_transaction_attachment.jpg?filename=uploads%2Fcustomer_transaction_attachments%2Fmodels%2Fattachment%2Ffile%2F7%2Fattachment.jpg&timestamp=1748960490&token=bbc1441debfcca93a4fb39908a1526c30703b8d03b458fcab88e55ab52cf3236",
        "fileURLExpiresAt": "2025-06-04T00:36:30+10:00",
        "fileExtension": "jpg",
        "fileContentType": "image/jpeg"
      },
      "relationships": {
        "transaction": {
          "data": {
            "type": "transactions",
            "id": "a236b4eb-7e38-4669-810e-439ba7f084fd"
          },
          "links": {
            "related": "https://api.up.com.au/api/v1/transactions/a236b4eb-7e38-4669-810e-439ba7f084fd"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/attachments/e8513ab4-64b8-4180-a7f6-817ed7e8ad75"
      }
    },
    {
      "type": "attachments",
      "id": "fbb02d5c-28d3-4807-8438-a624a6feb632",
      "attributes": {
        "createdAt": "2025-06-04T00:21:30+10:00",
        "fileURL": "http://localhost:8080/asset/customer_transaction_attachment.jpg?filename=uploads%2Fcustomer_transaction_attachments%2Fmodels%2Fattachment%2Ffile%2F8%2Fattachment.jpg&timestamp=1748960490&token=32bcc4a6a0138f2fc49d6197b94b57620053de4afac36c856950264c16962bfa",
        "fileURLExpiresAt": "2025-06-04T00:36:30+10:00",
        "fileExtension": "jpg",
        "fileContentType": "image/jpeg"
      },
      "relationships": {
        "transaction": {
          "data": {
            "type": "transactions",
            "id": "75a9b682-0376-43da-90ac-12b99cf5224e"
          },
          "links": {
            "related": "https://api.up.com.au/api/v1/transactions/75a9b682-0376-43da-90ac-12b99cf5224e"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/attachments/fbb02d5c-28d3-4807-8438-a624a6feb632"
      }
    }
  ],
  "links": {
    "prev": null,
    "next": null
  }
}
```

```APIDOC
Pagination Links:
  prev: string (nullable) - The link to the previous page in the results. If this value is null there is no previous page.
  next: string (nullable) - The link to the next page in the results. If this value is null there is no next page.
```

---

### API Reference: List Transactions by Account

Source: https://developer.up.com.au/index

Comprehensive documentation for the `GET /accounts/{accountId}/transactions` endpoint, detailing path and query parameters for filtering and pagination, along with the structure of the successful response.

```APIDOC
GET /accounts/{accountId}/transactions
  Description: Retrieve a list of all transactions for a specific account. The returned list is [paginated](#pagination) and can be scrolled by following the `next` and `prev` links where present. To narrow the results to a specific date range pass one or both of `filter[since]` and `filter[until]` in the query string. These filter parameters **should not** be used for pagination. Results are ordered newest first to oldest last.

  Path Parameters:
    accountId:
      Type: string
      Description: The unique identifier for the account.
      Example: 4bedbcc7-3cf6-44a4-92bc-cbed4bd65d87

  Query Parameters:
    page[size]:
      Type: integer
      Description: The number of records to return in each page.
      Example: ?page[size]=30
    filter[status]:
      Type: string (TransactionStatusEnum)
      Description: The transaction status for which to return records. This can be used to filter `HELD` transactions from those that are `SETTLED`.
      Possible values: HELD, SETTLED
      Example: ?filter[status]=HELD
    filter[since]:
      Type: string (rfc-3339 date-time)
      Description: The start date-time from which to return records, formatted according to rfc-3339. Not to be used for pagination purposes.
      Example: ?filter[since]=2020-01-01T01:02:03+10:00
    filter[until]:
      Type: string (rfc-3339 date-time)
      Description: The end date-time up to which to return records, formatted according to rfc-3339. Not to be used for pagination purposes.
      Example: ?filter[until]=2020-02-01T01:02:03+10:00
    filter[category]:
      Type: string
      Description: The category identifier for which to filter transactions. Both parent and child categories can be filtered through this parameter. Providing an invalid category identifier results in a `404` response.
      Example: ?filter[category]=good-life
    filter[tag]:
      Type: string
      Description: A transaction tag to filter for which to return records. If the tag does not exist, zero records are returned and a success response is given.
      Example: ?filter[tag]=Holiday

  Returns:
    200 - Successful Response:
      data:
        Type: Array [TransactionResource]
        Description: The list of transactions returned in this response.
      data[].type:
        Type: string
        Description: The type of this resource: `transactions`
      data[].id:
        Type: string
        Description: The unique identifier for this transaction.
      data[].attributes:
        Type: object
      data[].attributes.status:
        Type: TransactionStatusEnum
        Description: The current processing status of this transaction, according to whether or not this transaction has settled or is still held.
        Possible values: HELD, SETTLED
      data[].attributes.rawText:
        Type: string (nullable)
        Description: The original, unprocessed text of the transaction. This is often not a perfect indicator of the actual merchant, but it is useful for reconciliation purposes in some cases.
      data[].attributes.description:
        Type: string
        Description: A short description for this transaction. Usually the merchant name for purchases.
      data[].attributes.message:
        Type: string
      data[].links:
        Type: object
        Description: Links related to the transaction resource.
      data[].links.self:
        Type: string
        Description: The canonical link to this resource within the API.
```

---

### List Accounts: Sample Response (JSON)

Source: https://developer.up.com.au/index

An example JSON response for listing accounts, showing the structure of account data, including display name, type, balance, and links for pagination. The 'next' link indicates the availability of more results.

```json
{
  "data": [
    {
      "type": "accounts",
      "id": "6d48510d-a8a7-4477-8b61-7a6372cf6e5a",
      "attributes": {
        "displayName": "Spending",
        "accountType": "TRANSACTIONAL",
        "ownershipType": "INDIVIDUAL",
        "balance": {
          "currencyCode": "AUD",
          "value": "1.00",
          "valueInBaseUnits": 100
        },
        "createdAt": "2025-06-04T00:21:27+10:00"
      },
      "relationships": {
        "transactions": {
          "links": {
            "related": "https://api.up.com.au/api/v1/accounts/6d48510d-a8a7-4477-8b61-7a6372cf6e5a/transactions"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/accounts/6d48510d-a8a7-4477-8b61-7a6372cf6e5a"
      }
    }
  ],
  "links": {
    "prev": null,
    "next": "https://api.up.com.au/api/v1/accounts?page%5Bafter%5D=WyIyMDI1LTA2LTAzVDE0OjIxOjI3Ljc4MjQ1OTAwMFoiLCI2ZDQ4NTEwZC1hOGE3LTQ0NzctOGI2MS03YTYzNzJjZjZlNWEiXQ%3D%3D&page%5Bsize%5D=1"
  }
}
```

---

### Create Webhook using cURL

Source: https://developer.up.com.au/index

Example cURL command to create a new webhook via the Up API. This demonstrates the `POST` method, required authentication, and setting the `Content-Type` header for sending JSON data.

```curl
curl https://api.up.com.au/api/v1/webhooks \
-XPOST \
-H 'Authorization: Bearer up:demo:hMq7sff4MLe7GJES' \
-H 'Content-Type: application/json' \
```

---

### Sample Response for Retrieve Webhook

Source: https://developer.up.com.au/index

Example JSON response for a successful webhook retrieval, showing the webhook's details including URL, description, and creation timestamp. Note that the 'secretKey' is not returned in subsequent retrievals.

```json
{
  "data": {
    "type": "webhooks",
    "id": "d5878264-b56e-4780-8cd2-d944cea35753",
    "attributes": {
      "url": "http://example.com/webhook-2",
      "description": "Webhook number 2",
      "createdAt": "2025-06-03T00:21:49+10:00"
    },
    "relationships": {
      "logs": {
        "links": {
          "related": "https://api.up.com.au/api/v1/webhooks/d5878264-b56e-4780-8cd2-d944cea35753/logs"
        }
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/webhooks/d5878264-b56e-4780-8cd2-d944cea35753"
    }
  }
}
```

---

### Retrieve Webhook API Endpoint Documentation

Source: https://developer.up.com.au/index

API documentation for retrieving a specific webhook by its unique identifier. This section details the GET endpoint, required path parameters, and the comprehensive structure of the successful 200 OK response, including all webhook attributes and related links.

```APIDOC
GET /webhooks/{id}
Retrieve a specific webhook by providing its unique identifier.

Path Parameters
id
  string
  The unique identifier for the webhook.
  e.g. 9c681b97-b14d-4fc4-a56d-71f8c79a5f15

Returns
200 - Successful Response
data
  WebhookResource
  The webhook returned in this response.
  type
    string
    The type of this resource: webhooks
  id
    string
    The unique identifier for this webhook.
  attributes
    object
    url
      string
      The URL that this webhook is configured to POST events to.
    description
      string
      (nullable)
      An optional description that was provided at the time the webhook was created.
    secretKey
      string
      (optional)
      A shared secret key used to sign all webhook events sent to the configured webhook URL. This field is returned only once, upon the initial creation of the webhook. If lost, create a new webhook and delete this webhook.
      The webhook URL receives a request with a X-Up-Authenticity-Signature header, which is the SHA-256 HMAC of the entire raw request body signed using this secretKey. It is advised to compute and check this signature to verify the authenticity of requests sent to the webhook URL. See Handling webhook events for full details.
    createdAt
      string (date-time)
      The date-time at which this webhook was created.
  relationships
    object
    logs
      object
      links
        object
        (optional)
        related
          string
          The link to retrieve the related resource(s) in this relationship.
  links
    object
    (optional)
    self
      string
      The canonical link to this resource within the API.
```

---

### Retrieve Webhook Sample Request (curl)

Source: https://developer.up.com.au/index

Example `curl` command to retrieve a specific webhook using its ID and an Authorization Bearer token. Replace the placeholder ID and token with actual values.

```bash
curl https://api.up.com.au/api/v1/webhooks/d5878264-b56e-4780-8cd2-d944cea35753 \
-H 'Authorization: Bearer up:demo:im1zzg8QGGeutjHM'
```

---

### Sample JSON Response for Ping Endpoint

Source: https://developer.up.com.au/index

An example of the JSON response returned by the `/util/ping` endpoint upon successful authentication and request, typically with an HTTP `200` status.

```JSON
{
"meta": {
"id": "3b5d17a4-6778-48dc-ae7d-9f8aace2e2fc",
"statusEmoji": "⚡️"
}
}
```

---

### Create Webhook Request Payload Example

Source: https://developer.up.com.au/index

Example JSON payload for creating a new webhook, specifying the URL and an optional description. This payload would typically be sent in a POST request body.

```json
{
  "data": {
    "attributes": {
      "url": "http://example.com/webhook",
      "description": "Example webhook"
    }
  }
}
```

---

### API Documentation: Retrieve Account Endpoint

Source: https://developer.up.com.au/index

Detailed API specification for the GET /accounts/{id} endpoint. It outlines the required path parameters, the expected 200 successful response, and the full structure of the AccountResource object, including attributes, relationships, and links.

```APIDOC
GET /accounts/{id}
Retrieve a specific account by providing its unique identifier.

Path Parameters:
  id: string
    Description: The unique identifier for the account.
    Example: 4b0c14d5-e07f-458d-ab14-6a8ab57f11a4

Returns:
  200 - Successful Response
    data: AccountResource
      type: string (accounts)
      id: string
      attributes: object
        displayName: string
          Description: The name associated with the account in the Up application.
        accountType: AccountTypeEnum
          Description: The bank account type of this account.
          Possible values: SAVER, TRANSACTIONAL, HOME_LOAN
        ownershipType: OwnershipTypeEnum
          Description: The ownership structure for this account.
          Possible values: INDIVIDUAL, JOINT
        balance: MoneyObject
          Description: The available balance of the account, taking into account any amounts that are currently on hold.
          currencyCode: string
            Description: The ISO 4217 currency code.
          value: string
            Description: The amount of money, formatted as a string in the relevant currency. E.g., "10.56".
          valueInBaseUnits: integer
            Description: The amount of money in the smallest denomination for the currency, as a 64-bit integer. E.g., 1056.
        createdAt: string (date-time)
          Description: The date-time at which this account was first opened.
      relationships: object
        transactions: object
          links: object (optional)
            related: string
              Description: The link to retrieve the related resource(s) in this relationship.
      links: object (optional)
        self: string
          Description: The canonical link to this resource within the API.
```

---

### List Categories API Endpoint Definition

Source: https://developer.up.com.au/index

Documents the GET /categories endpoint, which allows retrieval of all pre-defined categories within the Up system.

```APIDOC
GET /categories
  Description: Retrieve all pre-defined categories in the Up system.
```

---

### API Documentation: List Attachments Endpoint

Source: https://developer.up.com.au/index

Detailed API specification for the GET /attachments endpoint. It describes how to retrieve a paginated list of all attachments, including the structure of the AttachmentResource object with its attributes and relationships.

```APIDOC
GET /attachments
Retrieve a list of all attachments. The returned list is paginated and can be scrolled by following the `next` and `prev` links where present.

Returns:
  200 - Successful Response
    data: Array [AttachmentResource]
      Description: The list of attachments returned in this response.
      type: string (attachments)
      id: string
        Description: The unique identifier for this attachment.
      attributes: object
        createdAt: string (date-time) (nullable)
          Description: The date-time when the file was created.
        fileURL: string (nullable)
          Description: A temporary link to download the file.
        fileURLExpiresAt: string (date-time)
          Description: The date-time at which the `fileURL` link expires.
        fileExtension: string (nullable)
          Description: File extension for the uploaded attachment.
        fileContentType: string (nullable)
          Description: Content type for the uploaded attachment.
      relationships: object
        transaction: object
          data: object
            type: string (transactions)
            id: string
              Description: The unique identifier of the resource within its type.
          links: object (optional)
            related: string
              Description: The link to retrieve the related resource(s) in this relationship.
      links: object (optional)
        self: string
          Description: The canonical link to this resource within the API.
```

---

### Up Banking API HTTP Status Codes Reference

Source: https://developer.up.com.au/index

A reference guide to the HTTP status codes used by the Up Banking API to convey the success or failure of requests, along with their common meanings and typical usage.

```APIDOC
200: Successful response: Everything worked as intended
201: Successful response: A new resource was created successfully—Typically used with POST requests.
204: Successful response: No content—typically used with DELETE requests.
400: Bad request: Typically a problem with the query string or an encoding error.
401: Not authorized: The request was not authenticated.
404:
```

---

### Webhook Ping Response Example

Source: https://developer.up.com.au/index

Illustrates the expected JSON response structure after successfully pinging a webhook. It includes the webhook event type, creation timestamp, and related webhook details.

```json
{
  "data": {
    "type": "webhook-events",
    "id": "9d0a5fee-f6c7-4689-95ba-eaf03d150912",
    "attributes": {
      "eventType": "PING",
      "createdAt": "2025-06-04T00:21:50+10:00"
    },
    "relationships": {
      "webhook": {
        "data": {
          "type": "webhooks",
          "id": "c4dffdac-5e23-47a1-869b-2c431059a9cf"
        },
        "links": {
          "related": "https://api.up.com.au/api/v1/webhooks/c4dffdac-5e23-47a1-869b-2c431059a9cf"
        }
      }
    }
  }
}
```

---

### Up Personal Finance API Beta Overview and Access

Source: https://developer.up.com.au/index

This section details the initial beta release of the Up API, enabling programmatic access to user financial data like balances and transactions. It covers the process of obtaining and managing a Personal Access Token (PAT) for secure authentication, and outlines the current scope of the API, which is primarily for personal use, with future expansion planned for broader developer integrations.

```APIDOC
API: Up Personal Finance API
Status: Beta Release
Access Scope: Personal financial data (balances, transactions)
Key Features:
  - Retrieve past transactions
  - Real-time transaction events via webhooks (future)
Authentication: Personal Access Token (PAT)
PAT Management:
  - Generation: Via Up app ("Data sharing" -> "Personal Access Token" -> "Generate a token") or https://api.up.com.au
  - Reissuance: Via Up app (generates new, expires old)
  - Revocation: Via Up app
Security: PAT is highly sensitive, never share.
Prerequisites:
  - Up customer account
  - Programming knowledge (e.g., Rails, Javascript)
  - Familiarity with console/terminal
Future Development: Expansion to allow third-party applications and integrations.
```

---

### Retrieve Paginated List of Accounts API Endpoint

Source: https://developer.up.com.au/index

Documents the `GET /accounts` endpoint for retrieving a paginated list of accounts for the authenticated user. This includes details on available query parameters for filtering by account type or ownership, and the comprehensive structure of the successful 200 OK response, including nested data models like `AccountResource` and `MoneyObject`.

```APIDOC
GET /accounts:
  Description: Retrieve a paginated list of all accounts for the currently authenticated user.
  Query Parameters:
    page[size]: integer
      Description: The number of records to return in each page.
      Example: ?page[size]=30
    filter[accountType]: string
      Description: The type of account for which to return records.
      Example: ?filter[accountType]=SAVER
    filter[ownershipType]: string
      Description: The account ownership structure for which to return records.
      Example: ?filter[ownershipType]=INDIVIDUAL
  Returns:
    200 OK:
      data: Array [AccountResource]
        Description: The list of accounts returned in this response.
      links: object
        prev: string (nullable)
          Description: The link to the previous page in the results.
        next: string (nullable)
          Description: The link to the next page in the results.

AccountResource:
  type: string
    Description: The type of this resource: `accounts`
  id: string
    Description: The unique identifier for this account.
  attributes: object
    Properties:
      displayName: string
        Description: The name associated with the account in the Up application.
      accountType: AccountTypeEnum
        Description: The bank account type of this account.
        Possible values: SAVER, TRANSACTIONAL, HOME_LOAN
      ownershipType: OwnershipTypeEnum
        Description: The ownership structure for this account.
        Possible values: INDIVIDUAL, JOINT
      balance: MoneyObject
        Description: The available balance of the account, taking into account any amounts that are currently on hold.
      createdAt: string (date-time)
        Description: The date-time at which this account was first opened.
  relationships: object
    Properties:
      transactions: object
        Properties:
          links: object (optional)
            Properties:
              related: string
                Description: The link to retrieve the related resource(s) in this relationship.
  links: object (optional)
    Properties:
      self: string
        Description: The canonical link to this resource within the API.

MoneyObject:
  currencyCode: string
    Description: The ISO 4217 currency code.
  value: string
    Description: The amount of money, formatted as a string in the relevant currency.
    Example: "10.56"
  valueInBaseUnits: integer
    Description: The amount of money in the smallest denomination for the currency, as a 64-bit integer.
    Example: 1056
```

---

### Up API Transaction Resource Sample JSON

Source: https://developer.up.com.au/index

An example JSON structure representing a transaction resource from the Up API, illustrating its attributes, relationships (account, category, tags), and links. Note: This is a fragment of a larger API response.

```json
"value": "-11.95",

"valueInBaseUnits": -1195

},

"foreignAmount": null,

"cardPurchaseMethod": null,

"settledAt": null,

"createdAt": "2025-05-31T20:12:47+10:00",

"transactionType": null,

"note": null,

"performingCustomer": {

"displayName": "Bobby"

},

"deepLinkURL": "up://transaction/VHJhbnNhY3Rpb24tMTM5"

},

"relationships": {

"account": {

"data": {

"type": "accounts",

"id": "eaf01bef-8560-45cd-b1ae-1a2c1b04a21a"

},

"links": {

"related": "https://api.up.com.au/api/v1/accounts/eaf01bef-8560-45cd-b1ae-1a2c1b04a21a"

}

},

"transferAccount": {

"data": null

},

"category": {

"data": {

"type": "categories",

"id": "tv-and-music"

},

"links": {

"self": "https://api.up.com.au/api/v1/transactions/890d5c10-1fbd-4202-be75-bda6f7b7530b/relationships/category",

"related": "https://api.up.com.au/api/v1/categories/tv-and-music"

}

},

"parentCategory": {

"data": {

"type": "categories",

"id": "good-life"

},

"links": {

"related": "https://api.up.com.au/api/v1/categories/good-life"

}

},

"tags": {

"data": [],

"links": {

"self": "https://api.up.com.au/api/v1/transactions/890d5c10-1fbd-4202-be75-bda6f7b7530b/relationships/tags"

}

},

"attachment": {

"data": null

}

},

"links": {

"self": "https://api.up.com.au/api/v1/transactions/890d5c10-1fbd-4202-be75-bda6f7b7530b"

}

}

],

"links": {

"prev": null,

"next": null

}

}
```

---

### Sample JSON Response: Retrieve a Single Category

Source: https://developer.up.com.au/index

An example of the JSON response for retrieving a single category, showing its type, ID, attributes, and relationships, including a null parent and child categories.

```json
{
  "data": {
    "type": "categories",
    "id": "home",
    "attributes": {
      "name": "Home"
    },
    "relationships": {
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "type": "categories",
            "id": "groceries"
          }
        ],
        "links": {
          "related": "https://api.up.com.au/api/v1/categories?filter%5Bparent%5D=home"
        }
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/categories/home"
    }
  }
}
```

---

### List All Tags

Source: https://developer.up.com.au/index

This endpoint retrieves a paginated list of all tags currently in use, ordered lexicographically. It supports pagination via `page[size]` and provides links for navigating through results. Each tag includes a link to its associated transactions.

```APIDOC
GET /tags

Query Parameters:
  page[size]: integer
    The number of records to return in each page.
    e.g. `?page[size]=50`

Returns:
  200 - Successful Response
  data: Array [TagResource]
    The list of tags returned in this response.
    type: string
      The type of this resource: `tags`
    id: string
      The label of the tag, which also acts as the tag’s unique identifier.
    relationships: object
      transactions: object
        links: object (optional)
          related: string
            The link to retrieve the related resource(s) in this relationship.
  links: object
    prev: string (nullable)
      The link to the previous page in the results. If this value is `null` there is no previous page.
    next: string (nullable)
      The link to the next page in the results. If this value is `null` there is no next page.
```

```curl
curl https://api.up.com.au/api/v1/tags \
-G \
-H 'Authorization: Bearer up:demo:DX1EmaQPOfJ83VtC' \
-d 'page[size]=2'
```

```json
{
"data": [
{
"type": "tags",
"id": "Holiday",
"relationships": {
"transactions": {
"links": {
"related": "https://api.up.com.au/api/v1/transactions?filter%5Btag%5D=Holiday"
}
}
}
},
{
"type": "tags",
"id": "Pizza Night",
"relationships": {
"transactions": {
"links": {
"related": "https://api.up.com.au/api/v1/transactions?filter%5Btag%5D=Pizza+Night"
}
}
}
}
],
"links": {
"prev": null,
"next": "https://api.up.com.au/api/v1/tags?page%5Bafter%5D=WyJQaXp6YSBOaWdodCJd&page%5Bsize%5D=2"
}
```

---

### Example API Error Response Payload

Source: https://developer.up.com.au/index

A sample JSON payload demonstrating the structure of a typical API error response, including status, title, detail, and a source pointer indicating the problematic field in the request body.

```JSON
{
  "errors": [{
    "status": "422",
    "title": "Invalid Request Payload",
    "detail": "fixed value \"tags\" required",
    "source": {
      "pointer": "/data/0/type"
    }
  }]
}
```

---

### Example Transaction Resource Response (JSON)

Source: https://developer.up.com.au/index

Illustrates the detailed JSON structure returned by the Up Bank API for a single transaction resource, including attributes like status, amounts, and relationships to other resources like accounts and categories.

```json
{
  "data": {
    "type": "transactions",
    "id": "6035d589-42a1-44b0-9007-754119a5d04a",
    "attributes": {
      "status": "SETTLED",
      "rawText": "WARUNG BEBEK, UBUD INDONES",
      "description": "Warung Bebek Bengil",
      "message": null,
      "isCategorizable": true,
      "holdInfo": {
        "amount": {
          "currencyCode": "AUD",
          "value": "-107.92",
          "valueInBaseUnits": -10792
        },
        "foreignAmount": null
      },
      "roundUp": {
        "amount": {
          "currencyCode": "AUD",
          "value": "-0.08",
          "valueInBaseUnits": -8
        },
        "boostPortion": null
      },
      "cashback": null,
      "amount": {
        "currencyCode": "AUD",
        "value": "-107.92",
        "valueInBaseUnits": -10792
      },
      "foreignAmount": {
        "currencyCode": "IDR",
        "value": "-1053698.77",
        "valueInBaseUnits": -105369877
      },
      "cardPurchaseMethod": {
        "method": "CARD_ON_FILE",
        "cardNumberSuffix": "0001"
      },
      "settledAt": "2025-05-31T04:00:00+10:00",
      "createdAt": "2025-05-31T04:00:00+10:00",
      "transactionType": null,
      "note": null,
      "performingCustomer": {
        "displayName": "Bobby"
      },
      "deepLinkURL": "up://transaction/VHJhbnNhY3Rpb24tMTE2"
    },
    "relationships": {
      "account": {
        "data": {
          "type": "accounts",
          "id": "00cc7754-c332-48e5-894e-05250d3dbc6c"
        },
        "links": {
          "related": "https://api.up.com.au/api/v1/accounts/00cc7754-c332-48e5-894e-05250d3dbc6c"
        }
      },
      "transferAccount": {
        "data": null
      },
      "category": {
        "data": null,
        "links": {
          "self": "https://api.up.com.au/api/v1/transactions/6035d589-42a1-44b0-9007-754119a5d04a/relationships/category"
        }
      },
      "parentCategory": {
        "data": null
      },
      "tags": {
        "data": [],
        "links": {
          "self": "https://api.up.com.au/api/v1/transactions/6035d589-42a1-44b0-9007-754119a5d04a/relationships/tags"
        }
      },
      "attachment": {
        "data": null
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/transactions/6035d589-42a1-44b0-9007-754119a5d04a"
    }
  }
}
```

---

### Up API Ping Endpoint Authenticated Usage

Source: https://developer.up.com.au/index

Demonstrates how to make an authenticated `curl` request to the Up API `/util/ping` endpoint and its corresponding successful JSON response.

```bash
curl https://api.up.com.au/api/v1/util/ping \
-H 'Authorization: Bearer up:demo:4KrTknwbncTgjT5p'
```

```json
{
  "meta": {
    "id": "849e23dd-f7aa-4421-a47a-f246dc6576fd",
    "statusEmoji": "⚡️"
  }
}
```

---

### Sample JSON Response for Paginated Endpoints

Source: https://developer.up.com.au/index

Illustrates the typical structure of a paginated response from the Up Banking API, including the `data` array for resources and the `links` object for navigation (`prev` and `next` cursors).

```JSON
{
"data": [...],
"links": {
"prev": "https://api.up.com.au/api/v1/accounts?page[before]=x",
"next": "https://api.up.com.au/api/v1/accounts?page[after]=y"
}
}
```

---

### Create Webhook API Endpoint (`POST /webhooks`)

Source: https://developer.up.com.au/index

Documentation for the `POST /webhooks` API endpoint, detailing its purpose, request payload structure (`WebhookInputResource`), and the expected `WebhookResource` response upon successful creation of a new webhook. It also outlines limitations and retry mechanisms.

```APIDOC
POST /webhooks
  description: Create a new webhook with a given URL. The URL will receive webhook events as JSON-encoded `POST` requests. The URL must respond with a HTTP `200` status on success. There is currently a limit of 10 webhooks at any given time. Event delivery is retried with exponential backoff if the URL is unreachable or it does not respond with a `200` status. The response includes a `secretKey` attribute, which is used to sign requests sent to the webhook URL.
  Request Payload:
    data: WebhookInputResource
      attributes: object
        url: string (uri)
          description: The URL that this webhook should post events to. This must be a valid HTTP or HTTPS URL that does not exceed 300 characters in length.
        description: string (nullable, optional)
          description: An optional description for this webhook, up to 64 characters in length.
  Returns:
    201 - Created
      data: WebhookResource
        description: The webhook that was created. (References the WebhookResource schema)
```

---

### API Documentation: Handle Incoming Webhook Events

Source: https://developer.up.com.au/index

Guidelines for implementing a webhook endpoint to receive and process events from the Up API. It specifies the expected HTTP method, content type, and response requirements for successful event delivery.

```APIDOC
Endpoint: POST {webhookURL}
Description: Once you have created a webhook in the Up API, events are sent to the webhook’s configured URL as JSON-encoded POST requests. The webhook URL must respond with a HTTP 200 status on success. It is important that the URL responds in a timely manner. If the URL takes too long to respond (currently 30s), the request will be timed out.

Request Details:
  Method: POST
  Content-Type: application/json
  Body: JSON payload containing event data

Response Requirements:
  HTTP Status: 200 (on success)
  Timeliness: Respond within 30 seconds to avoid timeout.
```

---

### Example Transaction List API Response

Source: https://developer.up.com.au/index

Illustrates a sample JSON response structure for a list of transactions returned by the Up API. It shows a single transaction entry with its type, ID, attributes (status, rawText, description, holdInfo, amount), and relationships.

```json
{
  "data": [
    {
      "type": "transactions",
      "id": "890d5c10-1fbd-4202-be75-bda6f7b7530b",
      "attributes": {
        "status": "HELD",
        "rawText": "Spotify 0123456789",
        "description": "Spotify",
        "message": null,
        "isCategorizable": true,
        "holdInfo": {
          "amount": {
            "currencyCode": "AUD",
            "value": "-11.95",
            "valueInBaseUnits": -1195
          },
          "foreignAmount": null
        },
        "roundUp": null,
        "cashback": null,
        "amount": {
          "currencyCode": "AUD"
        }
      }
    }
  ]
}
```

---

### Sample JSON Response for Transaction Query

Source: https://developer.up.com.au/index

A sample JSON payload representing a successful response from the Up API when querying for transaction details. This example showcases the structure of a single transaction resource with its attributes and relationships, including a 'Pizza Night' tag.

```json
{
  "data": [
    {
      "type": "transactions",
      "id": "09d0428f-2d7e-499a-8f61-e27a04c5eb43",
      "attributes": {
        "status": "SETTLED",
        "rawText": null,
        "description": "David Taylor",
        "message": "Money for the pizzas last night.",
        "isCategorizable": true,
        "holdInfo": null,
        "roundUp": null,
        "cashback": null,
        "amount": {
          "currencyCode": "AUD",
          "value": "-59.98",
          "valueInBaseUnits": -5998
        },
        "foreignAmount": null,
        "cardPurchaseMethod": null,
        "settledAt": "2025-06-02T17:19:41+10:00",
        "createdAt": "2025-06-02T17:19:41+10:00",
        "transactionType": null,
        "note": null,
        "performingCustomer": {
          "displayName": "Bobby"
        },
        "deepLinkURL": "up://transaction/VHJhbnNhY3Rpb24tMTA4"
      },
      "relationships": {
        "account": {
          "data": {
            "type": "accounts",
            "id": "ecaf05a6-4eaa-46e7-b587-dff2ba500b0a"
          },
          "links": {
            "related": "https://api.up.com.au/api/v1/accounts/ecaf05a6-4eaa-46e7-b587-dff2ba500b0a"
          }
        },
        "transferAccount": {
          "data": null
        },
        "category": {
          "data": null,
          "links": {
            "self": "https://api.up.com.au/api/v1/transactions/09d0428f-2d7e-499a-8f61-e27a04c5eb43/relationships/category"
          }
        },
        "parentCategory": {
          "data": null
        },
        "tags": {
          "data": [
            {
              "type": "tags",
              "id": "Pizza Night"
            }
          ],
          "links": {
            "self": "https://api.up.com.au/api/v1/transactions/09d0428f-2d7e-499a-8f61-e27a04c5eb43/relationships/tags"
          }
        },
        "attachment": {
          "data": null
        }
      }
    }
  ]
}
```

---

### Fetch Filtered Transactions via cURL

Source: https://developer.up.com.au/index

Example cURL command to retrieve transaction data from the Up API. This command demonstrates how to apply filters for page size, specific tags ('Pizza Night'), and transaction status ('SETTLED').

```curl
curl https://api.up.com.au/api/v1/transactions \
-G \
-H 'Authorization: Bearer up:demo:QRbB0nKUn4kBS9yY' \
-d 'page[size]=1' \
-d 'filter[tag]=Pizza Night' \
-d 'filter[status]=SETTLED'
```

---

### Up API Webhooks List Endpoint Definition

Source: https://developer.up.com.au/index

Documentation for the Up API `/webhooks` endpoint, used to retrieve a paginated list of configured webhooks. Includes details on query parameters and the structure of the successful (200) response, defining the WebhookResource.

```APIDOC
GET /webhooks
  Description: Retrieve a list of configured webhooks. Results are paginated and ordered oldest first.
  Query Parameters:
    page[size]: integer (The number of records to return in each page. e.g., ?page[size]=30)
  Returns:
    200 - Successful Response
      data: Array [WebhookResource]
        WebhookResource:
          type: string (The type of this resource: `webhooks`)
          id: string (The unique identifier for this webhook.)
          attributes: object
            url: string (The URL that this webhook is configured to POST events to.)
            description: string (nullable, An optional description provided at creation.)
            secretKey: string (optional)
```

---

### API Documentation: List Webhook Delivery Logs

Source: https://developer.up.com.au/index

Comprehensive documentation for the API endpoint to retrieve a paginated list of delivery logs for a specific webhook. Useful for debugging and analysis, logs are ordered newest first.

```APIDOC
Endpoint: GET /webhooks/{webhookId}/logs
Description: Retrieve a list of delivery logs for a webhook by providing its unique identifier. This is useful for analysis and debugging purposes. The returned list is paginated and can be scrolled by following the `next` and `prev` links where present. Results are ordered newest first to oldest last. Logs may be automatically purged after a period of time.

Path Parameters:
  webhookId:
    Type: string
    Description: The unique identifier for the webhook.
    Example: d58c19d9-46f3-47f2-8ac3-7d850c64a47e

Query Parameters:
  page[size]:
    Type: integer
    Description: The number of records to return in each page.
    Example: ?page[size]=30

Returns:
  200 - Successful response
    data: Array [WebhookDeliveryLogResource]
      Description: The list of delivery logs returned in this response.
      type: string (webhook-delivery-logs)
      id: string
      attributes: object
        request: object
          body: string (The payload that was sent in the request body.)
        response: object (nullable)
          statusCode: integer (The HTTP status code received in the response.)
          body: string (The payload that was received in the response body.)
        deliveryStatus: WebhookDeliveryStatusEnum (DELIVERED, UNDELIVERABLE, BAD_RESPONSE_CODE)
        createdAt: string (date-time)
      relationships: object
        webhookEvent: object
          data: object
            type: string (webhook-events)
            id: string
    links: object
      prev: string (nullable) (The link to the previous page in the results.)
      next: string (nullable) (The link to the next page in the results.)
```

---

### API Documentation: List All Categories

Source: https://developer.up.com.au/index

Details the API endpoint for retrieving a list of all categories and their ancestry. The response is not paginated and supports filtering by parent category ID.

```APIDOC
GET /categories

Description: Retrieve a list of all categories and their ancestry. The returned list is not paginated.

Query Parameters:
  filter[parent]:
    Type: string
    Description: The unique identifier of a parent category for which to return only its children. Providing an invalid category identifier results in a 404 response.
    Example: ?filter[parent]=good-life

Returns:
  200 - Successful Response:
    data: Array [CategoryResource]
      Description: The list of categories returned in this response.
      type: string (The type of this resource: categories)
      id: string (The unique identifier for this category. This is a human-readable but URL-safe value.)
      attributes: object
        name: string (The name of this category as seen in the Up application.)
      relationships: object
        parent: object
          data: object (nullable)
            type: string (The type of this resource: categories)
            id: string (The unique identifier of the resource within its type.)
          links: object (optional)
            related: string (The link to retrieve the related resource(s) in this relationship.)
        children: object
          data: Array [object]
            type: string (The type of this resource: categories)
            id: string (The unique identifier of the resource within its type.)
          links: object (optional)
            related: string (The link to retrieve the related resource(s) in this relationship.)
      links: object (optional)
        self: string (The canonical link to this resource within the API.)
```

---

### Sample JSON Response for Webhooks List

Source: https://developer.up.com.au/index

Illustrative JSON response showing the structure of data returned when retrieving a list of webhooks. It includes an array of webhook resources and pagination links for navigating through results.

```json
{
  "data": [
    {
      "type": "webhooks",
      "id": "3bc44b6f-5a67-4f12-aa9f-095042decf55",
      "attributes": {
        "url": "http://example.com/webhook-1",
        "description": "Webhook number 1",
        "createdAt": "2025-06-02T00:21:48+10:00"
      },
      "relationships": {
        "logs": {
          "links": {
            "related": "https://api.up.com.au/api/v1/webhooks/3bc44b6f-5a67-4f12-aa9f-095042decf55/logs"
          }
        }
      },
      "links": {
        "self": "https://api.up.com.au/api/v1/webhooks/3bc44b6f-5a67-4f12-aa9f-095042decf55"
      }
    }
  ],
  "links": {
    "prev": null,
    "next": "https://api.up.com.au/api/v1/webhooks?page%5Bafter%5D=WyIyMDI1LTA2LTAxVDE0OjIxOjQ4LjU4MDkxNjAwMFoiLCIzYmM0NGI2Zi01YTY3LTRmMTItYWE5Zi0wOTUwNDJkZWNmNTUiXQ%3D%3D&page%5Bsize%5D=1"
  }
}
```

---

### Verify Access Token with cURL Ping Request

Source: https://developer.up.com.au/index

Demonstrates how to make a cURL request to the `/util/ping` endpoint to verify the validity of an access token. This is the simplest request to confirm your token works.

```curl
curl https://api.up.com.au/api/v1/util/ping \
-H "Authorization: Bearer $your_access_token"
```

---

### Retrieve Specific Attachment API Endpoint and Example

Source: https://developer.up.com.au/index

Provides the detailed API specification for retrieving a single attachment by ID, including path parameters, the comprehensive AttachmentResource schema, and a complete curl request with its corresponding JSON response.

```APIDOC
GET /attachments/{id}
  Description: Retrieve a specific attachment by providing its unique identifier.
  Path Parameters:
    id: string - The unique identifier for the attachment. e.g. 5a9bb704-cf77-4698-8a3c-2905e2647721
  Returns:
    200 - Successful Response
      data: AttachmentResource
        type: string - The type of this resource: attachments
        id: string - The unique identifier for this attachment.
        attributes: object
          createdAt: string (date-time, nullable) - The date-time when the file was created.
          fileURL: string (nullable) - A temporary link to download the file.
          fileURLExpiresAt: string (date-time) - The date-time at which the fileURL link expires.
          fileExtension: string (nullable) - File extension for the uploaded attachment.
          fileContentType: string (nullable) - Content type for the uploaded attachment.
        relationships: object
          transaction: object
            data: object
              type: string - The type of this resource: transactions
              id: string - The unique identifier of the resource within its type.
            links: object (optional)
              related: string - The link to retrieve the related resource(s) in this relationship.
        links: object (optional)
          self: string - The canonical link to this resource within the API.
```

```curl
curl https://api.up.com.au/api/v1/attachments/9533f431-91e1-4ca6-bc8d-fdc43d4e1630 \
-H 'Authorization: Bearer up:demo:zUQhCxdeKme4tRvf'
```

```json
{
  "data": {
    "type": "attachments",
    "id": "9533f431-91e1-4ca6-bc8d-fdc43d4e1630",
    "attributes": {
      "createdAt": "2025-06-04T00:21:31+10:00",
      "fileURL": "http://localhost:8080/asset/customer_transaction_attachment.jpg?filename=uploads%2Fcustomer_transaction_attachments%2Fmodels%2Fattachment%2Ffile%2F11%2Fattachment.jpg&timestamp=1748960491&token=c522c0c063dd218b8af648f75d1360639c25d9e072510b3f0a52f07047ce3319",
      "fileURLExpiresAt": "2025-06-04T00:36:31+10:00",
      "fileExtension": "jpg",
      "fileContentType": "image/jpeg"
    },
    "relationships": {
      "transaction": {
        "data": {
          "type": "transactions",
          "id": "490e4a01-830a-4286-9aef-5f30e22a9d64"
        },
        "links": {
          "related": "https://api.up.com.au/api/v1/transactions/490e4a01-830a-4286-9aef-5f30e22a9d64"
        }
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/attachments/9533f431-91e1-4ca6-bc8d-fdc43d4e1630"
    }
  }
}
```

---

### Up Banking API Endpoints Reference

Source: https://developer.up.com.au/index

This section provides a comprehensive reference for all available endpoints in the Up Banking API, categorized by resource. It includes methods for managing accounts, attachments, categories, tags, transactions, webhooks, and a utility ping endpoint, detailing the HTTP method and path for each operation.

```APIDOC
API Endpoints:
  Accounts:
    - List accounts: GET /accounts
    - Retrieve account: GET /accounts/{id}
  Attachments:
    - List attachments: GET /attachments
    - Retrieve attachment: GET /attachments/{id}
  Categories:
    - List categories: GET /categories
    - Retrieve category: GET /categories/{id}
    - Categorize transaction: PATCH /transactions/{transactionId}/relationships/category
  Tags:
    - List tags: GET /tags
    - Add tags to transaction: POST /transactions/{transactionId}/relationships/tags
    - Remove tags from transaction: DELETE /transactions/{transactionId}/relationships/tags
  Transactions:
    - List transactions: GET /transactions
    - Retrieve transaction: GET /transactions/{id}
    - List transactions by account: GET /accounts/{accountId}/transactions
  Utility endpoints:
    - Ping: GET /util/ping
  Webhooks:
    - List webhooks: GET /webhooks
    - Create webhook: POST /webhooks
    - Retrieve webhook: GET /webhooks/{id}
    - Delete webhook: DELETE /webhooks/{id}
    - Ping webhook: POST /webhooks/{webhookId}/ping
    - List webhook logs: GET /webhooks/{webhookId}/logs
    - Handling webhook events: POST /webhookURL (callback)
```

---

### Retrieve Specific Account: Sample Response (JSON)

Source: https://developer.up.com.au/index

An example JSON response for retrieving a single account, detailing its attributes like display name, account type, balance, and related transaction links. This shows a 'SAVER' account type.

```json
{
  "data": {
    "type": "accounts",
    "id": "f95ce3b0-ddd5-46cc-a573-b976ee9bde57",
    "attributes": {
      "displayName": "🐷 Savings",
      "accountType": "SAVER",
      "ownershipType": "INDIVIDUAL",
      "balance": {
        "currencyCode": "AUD",
        "value": "125.36",
        "valueInBaseUnits": 12536
      },
      "createdAt": "2025-06-04T00:21:29+10:00"
    },
    "relationships": {
      "transactions": {
        "links": {
          "related": "https://api.up.com.au/api/v1/accounts/f95ce3b0-ddd5-46cc-a573-b976ee9bde57/transactions"
        }
      }
    },
    "links": {
      "self": "https://api.up.com.au/api/v1/accounts/f95ce3b0-ddd5-46cc-a573-b976ee9bde57"
    }
  }
}
```

---

### Up API Utility Ping Endpoint Definition

Source: https://developer.up.com.au/index

Comprehensive documentation for the Up API `/util/ping` endpoint, detailing its purpose, authentication requirements, successful (200) and error (401) response structures, including meta data and error object schemas.

```APIDOC
GET /util/ping
  Description: Make a basic ping request to the API. Useful to verify authentication.
  Returns:
    200 - Successful Response
      meta: object
        id: string (The unique identifier of the authenticated customer.)
        statusEmoji: string (A cute emoji that represents the response status.)
    401 - Not Authorized
      errors: Array [ErrorObject]
        ErrorObject:
          status: string (The HTTP status code associated with this error.)
          title: string (A short description of this error.)
          detail: string (A detailed description of this error. Useful for debugging.)
          source: object (optional)
            parameter: string (optional, if error relates to a query parameter)
            pointer: string (optional, if error relates to an attribute in request body, rfc-6901 JSON pointer)
```

---

### Delete Webhook Sample Request (curl)

Source: https://developer.up.com.au/index

Example `curl` command to delete a specific webhook using its ID, the HTTP DELETE method, and an Authorization Bearer token. Replace the placeholder ID and token with actual values.

```bash
curl https://api.up.com.au/api/v1/webhooks/508e45c0-bbc5-470c-b433-39fdd1ffae84 \
-XDELETE \
-H 'Authorization: Bearer up:demo:jrHnHiaILBIxb3dE'
```

---

### Up Banking API Base URL

Source: https://developer.up.com.au/index

The foundational URL to which all specific Up Banking API endpoint paths must be appended to form a complete request URL.

```Text
https://api.up.com.au/api/v1
```

---

### CardPurchaseMethod Data Structures and Enum

Source: https://developer.up.com.au/index

Describes the `CardPurchaseMethodObject`, which provides information about the card used for a transaction, and the `CardPurchaseMethodEnum`, listing all possible types of card purchase methods.

```APIDOC
CardPurchaseMethodEnum:
  Possible values: BAR_CODE, OCR, CARD_PIN, CARD_DETAILS, CARD_ON_FILE, ECOMMERCE, MAGNETIC_STRIPE, CONTACTLESS

CardPurchaseMethodObject:
  method: CardPurchaseMethodEnum (The type of card purchase.)
  cardNumberSuffix: string (nullable) (The last four digits of the card used for the purchase, if applicable.)
```

---

### Sample cURL Request: List Categories with Parent Filter

Source: https://developer.up.com.au/index

Demonstrates how to make a cURL request to the /categories endpoint, filtering by a parent category ID and including authorization. Note that URL parameters should be correctly encoded.

```bash
curl https://api.up.com.au/api/v1/categories \
-G \
-H 'Authorization: Bearer up:demo:ih3rrXr6Aq4138Zb' \
-d 'filter[parent]=good-life'
```

---

### Fetch Transactions for an Account with Filters

Source: https://developer.up.com.au/index

Demonstrates how to use `curl` to retrieve transactions for a specific account from the Up API, applying filters for page size, status, and category. Requires an Authorization Bearer token.

```bash
curl https://api.up.com.au/api/v1/accounts/eaf01bef-8560-45cd-b1ae-1a2c1b04a21a/transactions \
-G \
-H 'Authorization: Bearer up:demo:RbQKR0oa67hcT3L9' \
-d 'page[size]=1' \
-d 'filter[status]=HELD' \
-d 'filter[category]=good-life'
```

---

### Ping Webhook API Endpoint Documentation

Source: https://developer.up.com.au/index

API documentation for sending a PING event to a webhook for testing and debugging purposes. This section details the POST endpoint, required path parameters, and the structure of the 201 Created response, which includes the webhook event data sent.

```APIDOC
POST /webhooks/{webhookId}/ping
Send a PING event to a webhook by providing its unique identifier. This is useful for testing and debugging purposes. The event is delivered asynchronously and its data is returned in the response to this request.

Path Parameters
webhookId
  string
  The unique identifier for the webhook.
  e.g. d0011d16-c914-4ccb-a878-61615bf7e8dd

Returns
201 - Successful response
data
  WebhookEventResource
  The webhook event data sent to the subscribed webhook.
  type
    string
    The type of this resource: webhook-events
  id
    string
    The unique identifier for this event. This will remain constant across delivery retries.
  attributes
    object
    eventType
      WebhookEventTypeEnum
      The type of this event.
      Possible values: TRANSACTION_CREATED, TRANSACTION_SETTLED, TRANSACTION_DELETED, PING
    createdAt
      string (date-time)
      The date-time at which this event was generated.
  relationships
    object
    webhook
      object
      data
        object
        type
          string
          The type of this resource: webhooks
        id
          string
          The unique identifier of the resource within its type.
        links
          object
          (optional)
          related
            string
            The link to retrieve the related resource(s) in this relationship.
    transaction
      object
      (optional)
      data
        object
        type
          string
          The type of this resource: transactions
        id
          string
          The unique identifier of the resource within its type.
        links
          object
          (optional)
          related
            string
```

---

### Sample cURL Request: Retrieve a Single Category

Source: https://developer.up.com.au/index

Illustrates how to perform a cURL request to retrieve a specific category by its ID, including the necessary authorization header for authentication.

```bash
curl https://api.up.com.au/api/v1/categories/home \
-H 'Authorization: Bearer up:demo:DZPIYOUDRl6XQuyp'
```

---

### API Authentication Header Format

Source: https://developer.up.com.au/index

Illustrates the required format for the `Authorization` header when making authenticated requests to the Up Banking API, using a Bearer token. Replace `$your_access_token` with your personal access token.

```Text
Authorization: Bearer $your_access_token
```

---

### Verify Up Webhook Signature using HMAC SHA-256

Source: https://developer.up.com.au/index

This code snippet demonstrates how to verify the authenticity of incoming Up webhook events by computing the SHA-256 HMAC signature of the raw request body using a shared secret key and comparing it with the `X-Up-Authenticity-Signature` header. This process ensures the event was sent by Up and has not been tampered with. Examples are provided for Ruby (using Rails framework), PHP (using Laravel framework), and Go.

```Ruby
require 'openssl'

def handle_webhook_event
  received_signature =
    request.headers['X-Up-Authenticity-Signature']

  signature = OpenSSL::HMAC.hexdigest(
    'SHA256',
    secret_key,
    request.raw_post,
  )

  if Rack::Utils.secure_compare(received_signature, signature)
    # Process webhook event
  end
end
```

```PHP
public function handleWebhookEvent(Request $request) {
    $received_signature = $request->header(
        'X-Up-Authenticity-Signature',
        ''
    );
    $raw_body = $request->getContent();
    $signature = hash_hmac('sha256', $raw_body, $this->secretKey);

    if (hash_equals($signature, $received_signature)) {
        // Process webhook event
    }
}
```

```Go
import (
    "crypto/hmac"
    "crypto/sha256"
    "encoding/hex"
    "io"
    "net/http"
)

func handleWebhookEvent(w http.ResponseWriter, r *http.Request) {
    receivedSignature, _ := hex.DecodeString(
        r.Header.Get("X-Up-Authenticity-Signature"),
    )

    mac := hmac.New(sha256.New, secretKey)
    io.Copy(mac, r.Body)
    signature := mac.Sum(nil)

    if hmac.Equal(signature, receivedSignature)
        // Process webhook event
    }
}
```

---

### CashbackObject Data Structure

Source: https://developer.up.com.au/index

Defines the structure for cashback details associated with a transaction. It includes a brief description of why the cashback was paid and the total amount of cashback, represented as a MoneyObject.

```APIDOC
CashbackObject:
  description: string (A brief description of why this cashback was paid.)
  amount: MoneyObject (The total amount of cashback paid, represented as a positive value.)
```

---

### Send Webhook Ping Request

Source: https://developer.up.com.au/index

Demonstrates how to send a ping request to a specific webhook URL using cURL to test its connectivity and ensure it's reachable and responsive.

```curl
curl https://api.up.com.au/api/v1/webhooks/c4dffdac-5e23-47a1-869b-2c431059a9cf/ping \
-XPOST \
-H 'Authorization: Bearer up:demo:jfCRnwAmJOPfsrZ6' \
-H 'Content-Type: application/json' \
--data-binary ''
```

---

### Up Webhook Event API Reference

Source: https://developer.up.com.au/index

This section provides a detailed reference for the structure of incoming Up webhook event requests and their expected responses. It covers the required request headers, the schema for the `WebhookEventResource` payload including its attributes and relationships, and a sample JSON payload for a `TRANSACTION_CREATED` event.

```APIDOC
Request Headers:
  X-Up-Authenticity-Signature: string
    Description: The SHA-256 HMAC signature of the raw request body, signed using the `secretKey` of the webhook.
    Example: `X-Up-Authenticity-Signature: 317c0a8ea81df3f53c1d2aef5dcbf60492d0df557197b2990e71daa4a0693364`

Request Payload:
  data: WebhookEventResource
    type: string (value: `webhook-events`)
    id: string
      Description: The unique identifier for this event. This will remain constant across delivery retries.
    attributes: object
      eventType: WebhookEventTypeEnum
        Description: The type of this event. This can be used to determine what action to take in response to the event.
        Possible values: `TRANSACTION_CREATED`, `TRANSACTION_SETTLED`, `TRANSACTION_DELETED`, `PING`
      createdAt: string (date-time)
        Description: The date-time at which this event was generated.
    relationships: object
      webhook: object
        data: object
          type: string (value: `webhooks`)
          id: string
            Description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            Description: The link to retrieve the related resource(s) in this relationship.
      transaction: object (optional)
        data: object
          type: string (value: `transactions`)
          id: string
            Description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            Description: The link to retrieve the related resource(s) in this relationship.

Expected Response:
  200 - Successful Response

Sample Payload:
{
  "data": {
    "type": "webhook-events",
    "id": "544a5a44-a826-4ab2-ac42-7bc88f22066f",
    "attributes": {
      "eventType": "TRANSACTION_CREATED",
      "createdAt": "2025-06-04T00:21:49+10:00"
    },
    "relationships": {
      "webhook": {
        "data": {
          "type": "webhooks",
          "id": "bba7584c-6e79-4aba-89b2-cea60a3c00f5"
        },
        "links": {
          "related": "https://api.up.com.au/api/v1/webhooks/bba7584c-6e79-4aba-89b2-cea60a3c00f5"
        }
      },
      "transaction": {
        "data": {
          "type": "transactions",
          "id": "ddd6c04d-d5da-455f-8153-6adc098030a3"
        },
        "links": {
          "related": "https://api.up.com.au/api/v1/transactions/ddd6c04d-d5da-455f-8153-6adc098030a3"
        }
      }
    }
  }
}
```

---

### Retrieve Specific Account: Sample Request (cURL)

Source: https://developer.up.com.au/index

Illustrates a cURL command to fetch details of a single account using its unique identifier. This request requires an Authorization header for authentication.

```curl
curl https://api.up.com.au/api/v1/accounts/f95ce3b0-ddd5-46cc-a573-b976ee9bde57 \
-H 'Authorization: Bearer up:demo:GACQDjqfwe2uE2Lv'
```

---

### Up API Ping Endpoint Unauthenticated Usage

Source: https://developer.up.com.au/index

Illustrates an unauthenticated `curl` request to the Up API `/util/ping` endpoint and its corresponding 401 Unauthorized JSON error response.

```bash
curl https://api.up.com.au/api/v1/util/ping
```

```json
{
  "errors": [
    {
      "status": "401",
      "title": "Not Authorized",
      "detail": "The request was not authenticated because no valid credential was found in the Authorization header, or the Authorization header was not present."
    }
  ]
}
```

---

### Retrieve Single Transaction Details (cURL)

Source: https://developer.up.com.au/index

Demonstrates how to fetch a specific transaction using its ID via a cURL command, including the necessary Authorization header with a bearer token.

```curl
curl https://api.up.com.au/api/v1/transactions/6035d589-42a1-44b0-9007-754119a5d04a \
-H 'Authorization: Bearer up:demo:Z4Lrp87xFOHIgA2i'
```

---

### CodeBlockProps Type Definition

Source: https://developer.up.com.au/index

Defines the Flow type for the properties expected by the `MemoizedCodeBlock` component. It specifies that the component requires a `code` property, which must be a string.

```javascript
type CodeBlockProps = {code: string};
```

---

### API Documentation: Retrieve a Single Category by ID

Source: https://developer.up.com.au/index

Documents the API endpoint for fetching a specific category using its unique identifier. This provides detailed information about a single category resource, including its attributes and relationships.

```APIDOC
GET /categories/{id}

Description: Retrieve a specific category by providing its unique identifier.

Path Parameters:
  id: string (The unique identifier for the category. e.g. restaurants-and-cafes)

Returns:
  200 - Successful Response:
    data: CategoryResource
      Description: The category returned in this response.
      type: string (The type of this resource: categories)
      id: string (The unique identifier for this category. This is a human-readable but URL-safe value.)
      attributes: object
        name: string (The name of this category as seen in the Up application.)
      relationships: object
        parent: object
          data: object (nullable)
            type: string (The type of this resource: categories)
            id: string (The unique identifier of the resource within its type.)
          links: object (optional)
            related: string (The link to retrieve the related resource(s) in this relationship.)
        children: object
          data: Array [object]
            type: string (The type of this resource: categories)
            id: string (The unique identifier of the resource within its type.)
          links: object (optional)
            related: string (The link to retrieve the related resource(s) in this relationship.)
      links: object (optional)
        self: string (The canonical link to this resource within the API.)
```

---

### Up API Webhook Resource Schema

Source: https://developer.up.com.au/index

Defines the data structure for a webhook resource, including its attributes, relationships, and links, as returned by the Up API. This schema is used for both input and output webhook representations.

```APIDOC
WebhookResource:
  type: string
    description: The type of this resource: `webhooks`
  id: string
    description: The unique identifier for this webhook.
  attributes: object
    url: string
      description: The URL that this webhook is configured to `POST` events to.
    description: string (nullable)
      description: An optional description that was provided at the time the webhook was created.
    secretKey: string (optional)
      description: A shared secret key used to sign all webhook events sent to the configured webhook URL. This field is returned only once, upon the initial creation of the webhook. If lost, create a new webhook and delete this webhook. The webhook URL receives a request with a `X-Up-Authenticity-Signature` header, which is the SHA-256 HMAC of the entire raw request body signed using this `secretKey`. It is advised to compute and check this signature to verify the authenticity of requests sent to the webhook URL.
    createdAt: string (date-time)
      description: The date-time at which this webhook was created.
  relationships: object
    logs: object
      links: object (optional)
        related: string
          description: The link to retrieve the related resource(s) in this relationship.
  links: object (optional)
    self: string
      description: The canonical link to this resource within the API.
    prev: string (nullable)
      description: The link to the previous page in the results. If this value is `null` there is no previous page.
    next: string (nullable)
      description: The link to the next page in the results. If this value is `null` there is no next page.
```

---

### RoundUpObject Data Structure

Source: https://developer.up.com.au/index

Details the structure for transaction round-up information. It includes the total round-up amount and an optional boosted portion, both represented using the MoneyObject structure.

```APIDOC
RoundUpObject:
  amount: MoneyObject (The total amount of this Round Up, including any boosts, represented as a negative value.)
  boostPortion: MoneyObject (nullable) (The portion of the Round Up `amount` owing to boosted Round Ups, represented as a negative value. If no boost was added to the Round Up this field will be `null`.)
```

---

### Remove Tags from Transaction

Source: https://developer.up.com.au/index

This endpoint allows removing one or more tags from a specific transaction. It uses the DELETE method on the transaction's tags relationship.

```APIDOC
DELETE /transactions/{transactionId}/relationships/tags
```

---

### Transaction Details API Reference

Source: https://developer.up.com.au/index

Comprehensive API documentation for the Transaction Details object, detailing its properties and the structure of associated nested objects such as HoldInfoObject, MoneyObject, RoundUpObject, and CashbackObject. Each field includes its type, nullability, and a brief description of its purpose and usage.

```APIDOC
TransactionDetails:
  attachedMessage: string (nullable)
    description: Attached message for this transaction, such as a payment message, or a transfer note.
  isCategorizable: boolean
    description: Boolean flag set to true on transactions that support the use of categories.
  holdInfo: HoldInfoObject (nullable)
    description: If this transaction is currently in the `HELD` status, or was ever in the `HELD` status, the `amount` and `foreignAmount` of the transaction while `HELD`.
  roundUp: RoundUpObject (nullable)
    description: Details of how this transaction was rounded-up. If no Round Up was applied this field will be `null`.
  cashback: CashbackObject (nullable)
    description: If all or part of this transaction was instantly reimbursed in the form of cashback, details of the reimbursement.
  amount: MoneyObject
    description: The amount of this transaction in Australian dollars. For transactions that were once `HELD` but are now `SETTLED`, refer to the `holdInfo` field for the original `amount` the transaction was `HELD` at.
  foreignAmount: MoneyObject (nullable)
    description: The foreign currency amount of this transaction. This field will be `null` for domestic transactions. The amount was converted to the AUD amount reflected in the `amount` of this transaction. Refer to the `holdInfo` field for the original `foreignAmount` the transaction was `HELD` at.

HoldInfoObject:
  amount: MoneyObject
    description: The amount of this transaction while in the `HELD` status, in Australian dollars.
  foreignAmount: MoneyObject (nullable)
    description: The foreign currency amount of this transaction while in the `HELD` status. This field will be `null` for domestic transactions. The amount was converted to the AUD amount reflected in the `amount` field.

MoneyObject:
  currencyCode: string
    description: The ISO 4217 currency code.
  value: string
    description: The amount of money, formatted as a string in the relevant currency. For example, for an Australian dollar value of $10.56, this field will be "10.56". The currency symbol is not included in the string.
  valueInBaseUnits: integer
    description: The amount of money in the smallest denomination for the currency, as a 64-bit integer. For example, for an Australian dollar value of $10.56, this field will be 1056.

RoundUpObject:
  amount: MoneyObject
    description: The total amount of this Round Up, including any boosts, represented as a negative value.
  boostPortion: MoneyObject (nullable)
    description: The portion of the Round Up `amount` owing to boosted Round Ups, represented as a negative value. If no boost was added to the Round Up this field will be `null`.

CashbackObject:
  description: string
    description: A brief description of why this cashback was paid.
  amount: MoneyObject
    description: The total amount of cashback paid, represented as a positive value.
```

---

### MoneyObject Data Structure

Source: https://developer.up.com.au/index

Defines the standard structure for representing monetary values, including the ISO 4217 currency code, the amount formatted as a string, and the amount in its smallest base unit as a 64-bit integer.

```APIDOC
MoneyObject:
  currencyCode: string (ISO 4217 currency code)
  value: string (The amount of money, formatted as a string in the relevant currency. For example, for an Australian dollar value of $10.56, this field will be "10.56". The currency symbol is not included in the string.)
  valueInBaseUnits: integer (The amount of money in the smallest denomination for the currency, as a 64-bit integer. For example, for an Australian dollar value of $10.56, this field will be 1056.)
```

---

### Delete Webhook API Endpoint Documentation

Source: https://developer.up.com.au/index

API documentation for deleting a specific webhook by its unique identifier. This section details the DELETE endpoint, required path parameters, and the 204 No Content response indicating successful deletion.

```APIDOC
DELETE /webhooks/{id}
Delete a specific webhook by providing its unique identifier. Once deleted, webhook events will no longer be sent to the configured URL.

Path Parameters
id
  string
  The unique identifier for the webhook.
  e.g. 8180d9dc-45f9-4f1a-838e-dd1e4cca9a14

Returns
204 - Deleted
```

---

### API Documentation: Categorize Transaction

Source: https://developer.up.com.au/index

Describes the API endpoint for updating the category associated with a transaction. This operation is only supported for transactions where 'isCategorizable' is true, and the category ID must be from the /categories list.

```APIDOC
PATCH /transactions/{transactionId}/relationships/category

Description: Updates the category associated with a transaction. Only transactions for which isCategorizable is set to true support this operation. The id is taken from the list exposed on /categories and cannot be one of
```

---

### Up API Transaction Object Schema

Source: https://developer.up.com.au/index

Defines the structure and properties of a transaction resource within the Up API, including monetary values, timestamps, card information, and linked resources like accounts and categories.

```APIDOC
TransactionObject:
  amount: MoneyObject
    description: The amount of this transaction in Australian dollars. For transactions that were once HELD but are now SETTLED, refer to the holdInfo field for the original amount the transaction was HELD at.
    currencyCode: string
      description: The ISO 4217 currency code.
    value: string
      description: The amount of money, formatted as a string in the relevant currency. For example, for an Australian dollar value of $10.56, this field will be "10.56". The currency symbol is not included in the string.
    valueInBaseUnits: integer
      description: The amount of money in the smallest denomination for the currency, as a 64-bit integer. For example, for an Australian dollar value of $10.56, this field will be 1056.
  foreignAmount: MoneyObject (nullable)
    description: The foreign currency amount of this transaction. This field will be null for domestic transactions. The amount was converted to the AUD amount reflected in the amount of this transaction. Refer to the holdInfo field for the original foreignAmount the transaction was HELD at.
    currencyCode: string
      description: The ISO 4217 currency code.
    value: string
      description: The amount of money, formatted as a string in the relevant currency. For example, for an Australian dollar value of $10.56, this field will be "10.56". The currency symbol is not included in the string.
    valueInBaseUnits: integer
      description: The amount of money in the smallest denomination for the currency, as a 64-bit integer. For example, for an Australian dollar value of $10.56, this field will be 1056.
  cardPurchaseMethod: CardPurchaseMethodObject (nullable)
    description: Information about the card used for this transaction, if applicable.
    method: CardPurchaseMethodEnum
      description: The type of card purchase.
      possible_values: BAR_CODE, OCR, CARD_PIN, CARD_DETAILS, CARD_ON_FILE, ECOMMERCE, MAGNETIC_STRIPE, CONTACTLESS
    cardNumberSuffix: string (nullable)
      description: The last four digits of the card used for the purchase, if applicable.
  settledAt: string (date-time) (nullable)
    description: The date-time at which this transaction settled. This field will be null for transactions that are currently in the HELD status.
  createdAt: string (date-time)
    description: The date-time at which this transaction was first encountered.
  transactionType: string (nullable)
    description: A description of the transaction method used e.g. Purchase, BPAY Payment.
  note: NoteObject (nullable)
    description: A customer provided note about the transaction. Can only be provided by Up High subscribers.
    text: string
      description: A text note about the transaction.
  performingCustomer: CustomerObject (nullable)
    description: The customer who initated the transaction. For 2Up accounts this could be the customer who's card was used.
    displayName: string
      description: The Upname or preferred name of the customer
    deepLinkURL: string
      description: A deep link to the transaction receipt screen in-app.
  relationships: object
    account: object
      data: object
        type: string
          description: The type of this resource: `accounts`
        id: string
          description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            description: The link to retrieve the related resource(s) in this relationship.
    transferAccount: object
      description: If this transaction is a transfer between accounts, this relationship will contain the account the transaction went to/came from. The amount field can be used to determine the direction of the transfer.
      data: object (nullable)
        type: string
          description: The type of this resource: `accounts`
        id: string
          description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            description: The link to retrieve the related resource(s) in this relationship.
    category: object
      data: object (nullable)
        type: string
          description: The type of this resource: `categories`
        id: string
          description: The unique identifier of the resource within its type.
        links: object (optional)
          self: string
            description: The link to retrieve or modify linkage between this resources and the related resource(s) in this relationship.
          related: string (optional)
            description: The link to retrieve the related resource(s) in this relationship.
    parentCategory: object
      data: object (nullable)
        type: string
          description: The type of this resource: `categories`
        id: string
          description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            description: The link to retrieve the related resource(s) in this relationship.
    tags: object
      data: Array [object]
        type: string
          description: The type of this resource: `tags`
        id: string
          description: The label of the tag, which also acts as the tag’s unique identifier.
        links: object (optional)
          self: string
            description: The link to retrieve or modify linkage between this resources and the related resource(s) in this relationship.
    attachment: object
      data: object (nullable)
        type: string
          description: The type of this resource: `attachments`
        id: string
          description: The unique identifier of the resource within its type.
        links: object (optional)
          related: string
            description: The link to retrieve the related resource(s) in this relationship.
```

---

### Initialization of Triangle Code Data and Animation Interval

Source: https://developer.up.com.au/index

Defines constants for the number of triangles to display and the animation interval. `arbitraryNumberOfTrianglesLongArray` is initialized to hold the code snippets, dynamically populated by formatting and joining parts of a `splitCode` array (which is not defined in this snippet).

```javascript
const numberOfTriangles = 1;
const arbitraryNumberOfTrianglesLongArray = new Array(numberOfTriangles)
  .fill(1)
  .map((_, index) => formatCode(splitCode.slice(index * 2).join('')));
const changeIntervalMs = 1000;
```

---

### Retrieve a List of Transactions

Source: https://developer.up.com.au/index

This API endpoint retrieves a paginated list of all transactions for the authenticated user across all accounts. Results can be filtered by status (HELD/SETTLED), date range (since/until), category, or specific tags. Results are ordered newest first. Pagination links (`next`, `prev`) are provided for scrolling.

```APIDOC
GET /transactions

Query Parameters:
  page[size]: integer
    Description: The number of records to return in each page.
    Example: ?page[size]=30
  filter[status]: string
    Description: The transaction status for which to return records.
    Possible values: HELD, SETTLED
    Example: ?filter[status]=HELD
  filter[since]: string (rfc-3339)
    Description: The start date-time from which to return records.
    Example: ?filter[since]=2020-01-01T01:02:03+10:00
  filter[until]: string (rfc-3339)
    Description: The end date-time up to which to return records.
    Example: ?filter[until]=2020-02-01T01:02:03+10:00
  filter[category]: string
    Description: The category identifier for which to filter transactions.
    Example: ?filter[category]=good-life
  filter[tag]: string
    Description: A transaction tag to filter for which to return records.
    Example: ?filter[tag]=Holiday

Returns:
  200 - Successful Response
  data: Array [TransactionResource]
    type: string
      Description: The type of this resource: `transactions`
    id: string
      Description: The unique identifier for this transaction.
    attributes: object
      status: TransactionStatusEnum
        Description: The current processing status of this transaction.
        Possible values: HELD, SETTLED
      rawText: string (nullable)
        Description: The original, unprocessed text of the transaction.
      description: string
        Description: A short description for this transaction.
      message: string (nullable)
        Description: Attached message for this transaction.
      isCategorizable: boolean
        Description: Boolean flag set to true on transactions that support categories.
      holdInfo: HoldInfoObject (nullable)
        Description: If this transaction is currently in the `HELD` status, or was ever in the `HELD` status, the `amount` and `foreignAmount` of the transaction while `HELD`.
        amount: MoneyObject
          Description: The amount of this transaction while in the `HELD` status, in Australian dollars.
          currencyCode: string
            Description: The ISO 4217 currency code.
          value: string
            Description: The amount of money, formatted as a string in the relevant currency.
            Example: "10.56"
          valueInBaseUnits: integer
            Description: The amount of money in the smallest denomination for the currency.
```

---

### ContainerProps Type Definition

Source: https://developer.up.com.au/index

Defines the Flow type for the properties expected by the `MemoizedTriangleCode` component. It specifies that the component accepts a `className` string for CSS classes and a `style` object for inline styling.

```javascript
type ContainerProps = {
  className: string,
  style: Object,
};
```

---

### Up API Transaction Resource Definition

Source: https://developer.up.com.au/index

Defines the structure and properties of a transaction resource returned by the Up API, including its core attributes and various relationships to other entities like accounts, categories, and tags. This schema describes the fields, their types, and nullability.

```APIDOC
Transaction Resource:
  settledAt: string (date-time) (nullable)
    Description: The date-time at which this transaction settled. Null for transactions in 'HELD' status.
  createdAt: string (date-time)
    Description: The date-time at which this transaction was first encountered.
  transactionType: string (nullable)
    Description: A description of the transaction method used e.g. Purchase, BPAY Payment.
  note: NoteObject (nullable)
    Description: A customer provided note about the transaction. Only for Up High subscribers.
    NoteObject:
      text: string
        Description: A text note about the transaction.
  performingCustomer: CustomerObject (nullable)
    Description: The customer who initiated the transaction. For 2Up accounts, this could be the customer whose card was used.
    CustomerObject:
      displayName: string
        Description: The Upname or preferred name of the customer.
  deepLinkURL: string
    Description: A deep link to the transaction receipt screen in-app.
  relationships: object
    account: object
      data: object
        type: string (Value: 'accounts')
        id: string
          Description: The unique identifier of the resource within its type.
      links: object (optional)
        related: string
          Description: The link to retrieve the related resource(s) in this relationship.
    transferAccount: object
      Description: If this transaction is a transfer between accounts, this relationship will contain the account the transaction went to/came from. The 'amount' field can be used to determine the direction of the transfer.
      data: object (nullable)
        type: string (Value: 'accounts')
        id: string
          Description: The unique identifier of the resource within its type.
      links: object (optional)
        related: string
          Description: The link to retrieve the related resource(s) in this relationship.
    category: object
      data: object (nullable)
        type: string (Value: 'categories')
        id: string
          Description: The unique identifier of the resource within its type.
      links: object (optional)
        self: string
          Description: The link to retrieve or modify linkage between this resources and the related resource(s) in this relationship.
        related: string (optional)
          Description: The link to retrieve the related resource(s) in this relationship.
    parentCategory: object
      data: object (nullable)
        type: string (Value: 'categories')
        id: string
          Description: The unique identifier of the resource within its type.
      links: object (optional)
        related: string
          Description: The link to retrieve the related resource(s) in this relationship.
    tags: object
      data: Array [object]
        type: string (Value: 'tags')
        id: string
          Description: The label of the tag, which also acts as the tag’s unique identifier.
      links: object (optional)
        self: string
          Description: The link to retrieve or modify linkage between this resources and the related resource(s) in this relationship.
    attachment: object
      data: object (nullable)
        type: string (Value: 'attachments')
        id: string
          Description: The unique identifier of the resource within its type.
      links: object (optional)
        related: string
          Description: The link to retrieve the related resource(s) in this relationship.
  links: object (optional)
    self: string
      Description: The canonical link to this resource within the API.
  pagination_links: object
    prev: string (nullable)
      Description: The link to the previous page in the results. Null if no previous page.
    next: string (nullable)
      Description: The link to the next page in the results. Null if no next page.
```

---

### Up API Transaction Object Schema

Source: https://developer.up.com.au/index

Defines the structure and attributes of a transaction resource within the Up API, including its core properties, nested objects like card purchase methods and notes, and various relationships to other resources such as accounts, categories, and tags.

```APIDOC
Transaction Object:
  currencyCode: string (ISO 4217 currency code)
  value: string (amount of money, e.g., "10.56")
  valueInBaseUnits: integer (amount in smallest denomination, e.g., 1056)
  cardPurchaseMethod: CardPurchaseMethodObject (nullable)
    method: CardPurchaseMethodEnum (Possible values: BAR_CODE, OCR, CARD_PIN, CARD_DETAILS, CARD_ON_FILE, ECOMMERCE, MAGNETIC_STRIPE, CONTACTLESS)
    cardNumberSuffix: string (nullable, last four digits of card)
  settledAt: string (date-time) (nullable, date-time transaction settled)
  createdAt: string (date-time) (date-time transaction first encountered)
  transactionType: string (nullable, description of transaction method)
  note: NoteObject (nullable)
    text: string (customer provided note)
  performingCustomer: CustomerObject (nullable)
    displayName: string (Upname or preferred name of customer)
    deepLinkURL: string (deep link to transaction receipt screen)
  relationships: object
    account: object
      data: object
        type: string (resource type: 'accounts')
        id: string (unique identifier)
      links: object (optional)
        related: string (link to related resource)
    transferAccount: object
      data: object (nullable)
        type: string (resource type: 'accounts')
        id: string (unique identifier)
      links: object (optional)
        related: string (link to related resource)
    category: object
      data: object (nullable)
        type: string (resource type: 'categories')
        id: string (unique identifier)
      links: object (optional)
        self: string (link to retrieve/modify linkage)
        related: string (optional, link to related resource)
    parentCategory: object
      data: object (nullable)
        type: string (resource type: 'categories')
        id: string (unique identifier)
      links: object (optional)
        related: string (link to related resource)
    tags: object
      data: Array [object]
        type: string (resource type: 'tags')
        id: string (tag label/unique identifier)
      links: object (optional)
        self: string (link to retrieve/modify linkage)
    attachment: object
      data: object (nullable)
        type: string (resource type: 'attachments')
        id: string (unique identifier)
      links: object (optional)
        related: string (link to related resource)
  links: object (optional) (Resource-specific links)
    self: string (canonical link to this resource within the API)
  links: object (Pagination links)
    prev: string (nullable, link to previous page in results)
    next: string (nullable, link to next page in results)
```

---

### Up Webhook Event Type Definitions

Source: https://developer.up.com.au/index

Defines the different event types that can be received via webhooks from the Up API, detailing their triggers, included relationships, and specific behaviors or limitations. Event delivery includes retry mechanisms with exponential backoff for non-200 responses, unreachable URLs, or timeouts.

```APIDOC
Event Types:
  PING:
    Description: Manually triggered by calls to the webhook ping endpoint.
    Purpose: Used for testing and debugging purposes.
  TRANSACTION_CREATED:
    Description: Triggered whenever a new transaction is created in Up.
    Includes:
      - transaction relationship: Provides the unique identifier for the transaction and a link to the transaction within the Up API.
    Usage: The provided link should be used to retrieve the complete transaction data.
  TRANSACTION_SETTLED:
    Description: Triggered whenever a transaction transitions from the HELD status to the SETTLED status.
    Includes:
      - transaction relationship: Provides the unique identifier for the transaction and a link to the transaction within the Up API.
    Usage: The provided link should be used to retrieve the complete transaction data.
    Limitations: Due to external factors in banking processes, this event may not be triggered on rare occasions. In such cases, separate TRANSACTION_DELETED and TRANSACTION_CREATED events will be received instead.
  TRANSACTION_DELETED:
    Description: Triggered whenever a HELD transaction is deleted from Up.
    Example: Occurs when a hotel deposit is returned.
    Includes:
      - transaction relationship: Provides the unique identifier for the transaction.
    Note: No link is provided to the transaction within the Up API as it no longer exists.
```

---

### API Error Response Object Structure

Source: https://developer.up.com.au/index

Defines the generic error response structure, including the `errors` array, `status`, `title`, `detail`, and optional `source` fields for debugging purposes. This object is returned for 4xx and 5xx HTTP status codes.

```APIDOC
ErrorObject:
  status: string
    Description: The HTTP status code associated with this error.
  title: string
    Description: A short description of this error.
  detail: string
    Description: A detailed description of this error.
  source: object (optional)
    Description: If applicable, location in the request that this error relates to.
    Properties:
      parameter: string (optional)
        Description: If this error relates to a query parameter, the name of the parameter.
      pointer: string (optional)
        Description: If this error relates to an attribute in the request body, a rfc-6901 JSON pointer to the attribute.

Generic Error Response:
  errors: Array [ErrorObject]
    Description: The list of errors returned in this response.
```

---

### Retrieve a Specific Transaction by ID

Source: https://developer.up.com.au/index

This API endpoint allows you to fetch detailed information for a single transaction using its unique identifier. The response includes various attributes such as status, description, amounts (including held and foreign amounts), round-up details, and cashback information.

```APIDOC
GET /transactions/{id}

Path Parameters:
  id: string
    The unique identifier for the transaction.
    e.g. 63b7d8bc-3705-4513-914e-c8c5b2456bed

Returns:
  200 - Successful Response
    data: TransactionResource
      type: string
        The type of this resource: `transactions`
      id: string
        The unique identifier for this transaction.
      attributes: object
        status: TransactionStatusEnum
          The current processing status of this transaction.
          Possible values: HELD, SETTLED
        rawText: string (nullable)
          The original, unprocessed text of the transaction.
        description: string
          A short description for this transaction. Usually the merchant name.
        message: string (nullable)
          Attached message for this transaction.
        isCategorizable: boolean
          Boolean flag set to true on transactions that support categories.
        holdInfo: HoldInfoObject (nullable)
          If this transaction is currently in the `HELD` status, or was ever in the `HELD` status.
          amount: MoneyObject
            The amount of this transaction while in the `HELD` status, in Australian dollars.
            currencyCode: string
              The ISO 4217 currency code.
            value: string
              The amount of money, formatted as a string.
            valueInBaseUnits: integer
              The amount of money in the smallest denomination.
          foreignAmount: MoneyObject (nullable)
            The foreign currency amount of this transaction while in the `HELD` status.
            currencyCode: string
              The ISO 4217 currency code.
            value: string
              The amount of money, formatted as a string.
            valueInBaseUnits: integer
              The amount of money in the smallest denomination.
        roundUp: RoundUpObject (nullable)
          Details of how this transaction was rounded-up.
          amount: MoneyObject
            The total amount of this Round Up, including any boosts, represented as a negative value.
            currencyCode: string
              The ISO 4217 currency code.
            value: string
              The amount of money, formatted as a string.
            valueInBaseUnits: integer
              The amount of money in the smallest denomination.
          boostPortion: MoneyObject (nullable)
            The portion of the Round Up `amount` owing to boosted Round Ups.
            currencyCode: string
              The ISO 4217 currency code.
            value: string
              The amount of money, formatted as a string.
            valueInBaseUnits: integer
              The amount of money in the smallest denomination.
        cashback: CashbackObject (nullable)
          If all or part of this transaction was instantly reimbursed in the form of cashback.
          description: string
            A brief description of why this cashback was paid.
          amount: MoneyObject
            The total amount of cashback paid, represented as a positive value.
            currencyCode: string
              The ISO 4217 currency code.
            value: string
              The amount of money, formatted as a string.
            valueInBaseUnits: integer
              The amount of money in the smallest denomination.
```

---

### React Component for Dynamic Code Display with Triangle Layout

Source: https://developer.up.com.au/index

This React component dynamically displays code snippets within a unique triangle-shaped layout. It manages the display of multiple code blocks, cycling through them at a set interval using `useState` and `useInterval` hooks. The layout uses CSS `shape-outside` for the triangle effect, providing a visually distinct presentation for code.

```JavaScript
const splitCode = sampleCode.split('');
const formatCode = code => code;
const numberOfTriangles = 1;const arbitraryNumberOfTrianglesLongArray = new Array(numberOfTriangles)  .fill(1)  .map((_, index) => formatCode(splitCode.slice(index * 2).join('')));
const changeIntervalMs = 1000;
const useTriangleIndex = () => {  const [triangleIndex, setTriangleIndex] = useState(0);  const updateTriangle = React.useCallback(() => {    const newIndex = (triangleIndex + 1) % numberOfTriangles;    setTriangleIndex(newIndex);  }, [triangleIndex]);  useInterval(updateTriangle, changeIntervalMs);  return triangleIndex;};
type CodeBlockProps = {code: string};
const codeBlockStyle = {whiteSpace: 'normal', opacity: 0.8, lineBreak: 'anywhere'};
const leftTriangletyle = {  shapeOutside: 'polygon(0 0, 100% 0, 0 100%)',  height: 700,};
const rightTriangleStyle = {  shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)',  height: 700,};
const MemoizedCodeBlock = React.memo<CodeBlockProps>(function Code({code}: CodeBlockProps) {  return (    <CodeBlock
      language="jsx"
      id="triangle-code-container" // used as a css selector
      className="text-center"
      code={code}
      style={codeBlockStyle}
    >      <div className="w-1/2 float-left" style={leftTriangletyle} />      <div className="w-1/2 float-right" style={rightTriangleStyle} />    </CodeBlock>  );});
const Triangle = function Triangle({className, code}: Props) {  return (    <div className={classnames('overflow-hidden w-full h-full text-center', className)}>      <MemoizedCodeBlock code={code} />    </div>  );};
type ContainerProps = {|  className: string,
  style: Object,
|};
const MemoizedTriangleCode = React.memo<ContainerProps>(function TriangleCode({className, style}: ContainerProps) {  const triangleIndex = useTriangleIndex();  return (    <div style={style} className={className}>      {arbitraryNumberOfTrianglesLongArray.map((code, index) => (
        <Triangle code={code} key={index} className={triangleIndex !== index ? 'hidden' : ''} />
      ))}
    </div>
  );});
export default MemoizedTriangleCode;
```

---

### Memoized React Component for Dynamic Triangle Code Display

Source: https://developer.up.com.au/index

This React functional component, `MemoizedTriangleCode`, renders a series of `Triangle` components, each displaying a code snippet. It uses `React.memo` for performance optimization and integrates with `useTriangleIndex` to dynamically show one triangle at a time, creating a rotating effect. It expects `className` and `style` props for styling the container.

```jsx
type ContainerProps = {|
  className: string,
  style: Object,
|};
const MemoizedTriangleCode = React.memo<ContainerProps>(function TriangleCode({className, style}: ContainerProps) {
  const triangleIndex = useTriangleIndex();
  return (
    <div style={style} className={className}>
      {arbitraryNumberOfTrianglesLongArray.map((code, index) => (
        <Triangle code={code} key={index} className={triangleIndex !== index ? 'hidden' : ''} />
      ))}
    </div>
  );
});
export default MemoizedTriangleCode;
```

---

### Styling Constants for Code Block and Triangles

Source: https://developer.up.com.au/index

Defines constant objects for inline styles applied to the `CodeBlock` component and the `div` elements forming the triangular shapes. `codeBlockStyle` sets text wrapping and opacity, while `leftTriangletyle` and `rightTriangleStyle` use `shape-outside` to create CSS exclusion shapes for the triangular effect.

```javascript
const codeBlockStyle = { whiteSpace: 'normal', opacity: 0.8, lineBreak: 'anywhere' };
const leftTriangletyle = {
  shapeOutside: 'polygon(0 0, 100% 0, 0 100%)',
  height: 700,
};
const rightTriangleStyle = {
  shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)',
  height: 700,
};
```

---

### Add Tags to Transaction

Source: https://developer.up.com.au/index

This endpoint associates one or more tags with a specific transaction. A maximum of 6 tags can be applied per transaction, and duplicate tags are ignored. A successful operation returns an HTTP 204. The associated tags are also exposed via the `tags` relationship on the transaction resource.

```APIDOC
POST /transactions/{transactionId}/relationships/tags

Path Parameters:
  transactionId: string
    The unique identifier for the transaction.
    e.g. `27cc102e-6182-4bbc-acfb-adbe4222a165`

Request Payload:
  data: Array [TagInputResourceIdentifier]
    The tags to add to or remove from the transaction.
    type: string
      The type of this resource: `tags`
    id: string
      The label of the tag, which also acts as the tag’s unique identifier.

Returns:
  204 - Successful Response
```

```curl
curl https://api.up.com.au/api/v1/transactions/0c322745-66ab-4944-8737-7efbb776eca9/relationships/tags \
-XPOST \
-H 'Authorization: Bearer up:demo:lY0XsUm7oAQohQiv' \
-H 'Content-Type: application/json' \
--data-binary '{
"data": [
{
"type": "tags",
"id": "Holiday"
},
{
"type": "tags",
"id": "Queensland"
}
]
}'
```

---

### Memoized React Component for Styled Code Block Display

Source: https://developer.up.com.au/index

This `MemoizedCodeBlock` React component is responsible for rendering a single code snippet within a styled container. It utilizes `React.memo` for performance and accepts a `code` string prop. The component applies specific inline styles for `whiteSpace`, `opacity`, and `lineBreak`, and includes two floating `div` elements with `shapeOutside` styles to create a 'triangle' visual effect around the code block.

```jsx
type CodeBlockProps = {code: string};
const codeBlockStyle = {whiteSpace: 'normal', opacity: 0.8, lineBreak: 'anywhere'};
const leftTriangletyle = {
  shapeOutside: 'polygon(0 0, 100% 0, 0 100%)',
  height: 700,
};
const rightTriangleStyle = {
  shapeOutside: 'polygon(0 0, 100% 0, 100% 100%)',
  height: 700,
};
const MemoizedCodeBlock = React.memo<CodeBlockProps>(function Code({code}: CodeBlockProps) {
  return (
    <CodeBlock
      language="jsx"
      id="triangle-code-container" // used as a css selector
      className="text-center"
      code={code}
      style={codeBlockStyle}
    >
      <div className="w-1/2 float-left" style={leftTriangletyle} />
      <div className="w-1/2 float-right" style={rightTriangleStyle} />
    </CodeBlock>
  );
});
```

---

### Triangle Container Component for Code Blocks

Source: https://developer.up.com.au/index

A React functional component that serves as a wrapper for the `MemoizedCodeBlock`. It applies general styling, including `overflow-hidden`, `w-full`, `h-full`, and `text-center`, ensuring the content is properly contained and centered. This component is used to render individual triangular code displays.

```jsx
const Triangle = function Triangle({className, code}: Props) {
  return (
    <div className={classnames('overflow-hidden w-full h-full text-center', className)}>
      <MemoizedCodeBlock code={code} />
    </div>
  );
};
```

---

### Core Transaction Field Definitions

Source: https://developer.up.com.au/index

Defines key fields within a transaction record, including foreign and Australian dollar amounts (for both held and settled states), details on round-ups and cashback, card purchase method information, and the settlement timestamp. These fields often reference other defined data structures like `MoneyObject`.

```APIDOC
TransactionFields:
  foreignAmount (HELD): MoneyObject (nullable) (The foreign currency amount of this transaction while in the `HELD` status. This field will be `null` for domestic transactions. The amount was converted to the AUD amount reflected in the `amount` field.)
  roundUp: RoundUpObject (nullable) (Details of how this transaction was rounded-up. If no Round Up was applied this field will be `null`.)
  cashback: CashbackObject (nullable) (If all or part of this transaction was instantly reimbursed in the form of cashback, details of the reimbursement.)
  amount (SETTLED): MoneyObject (The amount of this transaction in Australian dollars. For transactions that were once `HELD` but are now `SETTLED`, refer to the `holdInfo` field for the original `amount` the transaction was `HELD` at.)
  foreignAmount (SETTLED): MoneyObject (nullable) (The foreign currency amount of this transaction. This field will be `null` for domestic transactions. The amount was converted to the AUD amount reflected in the `amount` of this transaction. Refer to the `holdInfo` field for the original `foreignAmount` the transaction was `HELD` at.)
  cardPurchaseMethod: CardPurchaseMethodObject (nullable) (Information about the card used for this transaction, if applicable.)
  settledAt: string (date-time)
```

---

### Memoized Triangle Code Display Orchestration Component

Source: https://developer.up.com.au/index

A memoized React functional component that manages the display of multiple `Triangle` components. It iterates over an array of code snippets (`arbitraryNumberOfTrianglesLongArray`) and renders a `Triangle` for each. The `useTriangleIndex` hook controls which triangle is currently visible, creating an animated cycling effect.

```jsx
const MemoizedTriangleCode = React.memo<ContainerProps>(function TriangleCode({className, style}: ContainerProps) {
  const triangleIndex = useTriangleIndex();
  return (
    <div style={style} className={className}>
      {arbitraryNumberOfTrianglesLongArray.map((code, index) => (
        <Triangle code={code} key={index} className={triangleIndex !== index ? 'hidden' : ''} />
      ))}
    </div>
  );
});
export default MemoizedTriangleCode;
```

---

### React Component for Wrapping Memoized Code Block

Source: https://developer.up.com.au/index

The `Triangle` React functional component acts as a wrapper for the `MemoizedCodeBlock`. It receives `className` and `code` props, applying the `className` to its container `div` for styling and passing the `code` prop directly to the `MemoizedCodeBlock` for rendering. This component is designed to provide a consistent container for the visually 'triangular' code blocks.

```jsx
const Triangle = function Triangle({className, code}: Props) {
  return (
    <div className={classnames('overflow-hidden w-full h-full text-center', className)}>
      <MemoizedCodeBlock code={code} />
    </div>
  );
};
```

---

### Update Transaction Category (Set or Decategorize)

Source: https://developer.up.com.au/index

This API endpoint allows setting or removing a category for a specific transaction. To de-categorize, set the entire `data` key to `null`. A successful operation returns an HTTP 204. The associated category is also exposed via the `category` relationship on the transaction resource.

```APIDOC
PATCH /transactions/{transactionId}/relationships/category

Path Parameters:
  transactionId: string
    The unique identifier for the transaction.
    e.g. `7db3ecf8-1a27-4716-a46f-63039046c1f9`

Request Payload:
  data: CategoryInputResourceIdentifier (nullable)
    The category to set on the transaction. Set this entire key to `null` to de-categorize a transaction.
    type: string
      The type of this resource: `categories`
    id: string
      The unique identifier of the category, as returned by the `/categories` endpoint.

Returns:
  204 - Successful Response
```

```curl
curl https://api.up.com.au/api/v1/transactions/ecf4810e-2b08-4cb1-9589-56b457bc2f5a/relationships/category \
-XPATCH \
-H 'Authorization: Bearer up:demo:yhj9n7pRPdPFBHxW' \
-H 'Content-Type: application/json' \
--data-binary '{
"data": {
"type": "categories",
"id": "restaurants-and-cafes"
}
}'
```

---

### Memoized Code Block Component with Triangular Overlays

Source: https://developer.up.com.au/index

A memoized React functional component that wraps a generic `CodeBlock` component. It applies specific styling, including `text-center` and custom `style` properties, and overlays two `div` elements styled as triangles using CSS `shape-outside` for visual effect. This component is designed to display code within a custom, visually distinct container.

```jsx
const MemoizedCodeBlock = React.memo<CodeBlockProps>(function Code({code}: CodeBlockProps) {
  return (
    <CodeBlock
      language="jsx"
      id="triangle-code-container" // used as a css selector
      className="text-center"
      code={code}
      style={codeBlockStyle}
    >
      <div className="w-1/2 float-left" style={leftTriangletyle} />
      <div className="w-1/2 float-right" style={rightTriangleStyle} />
    </CodeBlock>
  );
});
```

---

### React Hook for Managing Triangle Display Index

Source: https://developer.up.com.au/index

The `useTriangleIndex` custom React hook manages the active index for displaying a sequence of 'triangle' code blocks. It uses `useState` to maintain the current index and `useCallback` to define an update function that cycles through the indices. The `useInterval` hook (assumed external) is used to trigger updates at a specified `changeIntervalMs`, creating an automatic rotation effect.

```jsx
const changeIntervalMs = 1000;
const useTriangleIndex = () => {
  const [triangleIndex, setTriangleIndex] = useState(0);
  const updateTriangle = React.useCallback(() => {
    const newIndex = (triangleIndex + 1) % numberOfTriangles;
    setTriangleIndex(newIndex);
  }, [triangleIndex]);
  useInterval(updateTriangle, changeIntervalMs);
  return triangleIndex;
};
```

---

### useTriangleIndex Custom Animation Hook

Source: https://developer.up.com.au/index

A custom React hook responsible for managing the active index of the displayed triangles. It uses `useState` to maintain the current `triangleIndex` and `useCallback` to create an `updateTriangle` function that increments the index cyclically. The `useInterval` hook (assumed to be defined elsewhere) triggers `updateTriangle` at a specified `changeIntervalMs`, enabling the animation.

```javascript
const useTriangleIndex = () => {
  const [triangleIndex, setTriangleIndex] = useState(0);
  const updateTriangle = React.useCallback(() => {
    const newIndex = (triangleIndex + 1) % numberOfTriangles;
    setTriangleIndex(newIndex);
  }, [triangleIndex]);
  useInterval(updateTriangle, changeIntervalMs);
  return triangleIndex;
};
```

---

### Disassociate Tags from a Transaction

Source: https://developer.up.com.au/index

This API endpoint allows disassociating one or more tags from a specific transaction. Tags not currently associated are silently ignored. A successful request returns an HTTP 204 No Content. The endpoint requires a transaction ID as a path parameter and a JSON payload specifying the tags to remove. The associated tags are also exposed via the `tags` relationship on the transaction resource.

```APIDOC
DELETE /transactions/{transactionId}/relationships/tags

Path Parameters:
  transactionId: string
    Description: The unique identifier for the transaction.
    Example: a8458470-a362-4cf2-afb2-aec49f96092b

Request Payload:
  data: Array [TagInputResourceIdentifier]
    type: string
      Description: The type of this resource: `tags`
    id: string
      Description: The label of the tag, which also acts as the tag’s unique identifier.

Returns:
  204 - Successful Response
```

```curl
curl https://api.up.com.au/api/v1/transactions/c2c9478a-916d-45fc-9b09-cdf4e4c4cf94/relationships/tags \
-XDELETE \
-H 'Authorization: Bearer up:demo:o5PsLEVNpj2mH9b8' \
-H 'Content-Type: application/json' \
--data-binary '{
"data": [
{
"type": "tags",
"id": "Holiday"
},
{
"type": "tags",
"id": "Queensland"
}
]
}'
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.

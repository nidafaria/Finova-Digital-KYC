# Nexora Wallet, FX & Transfer Services (Person 3)

## Base URL
`/api`

## Endpoints

### 1. Wallet
* **GET `/api/wallet`**
  * Headers: `x-user-id: <string>`
  * Returns wallet balance for USD, EUR, INR.
* **POST `/api/wallet/topup`**
  * Headers: `x-user-id: <string>`
  * Body: `{ "currency": "USD", "amount": 250 }`

### 2. FX (Foreign Exchange)
* **GET `/api/fx/rates?base=USD`**
  * Returns exchange rates against USD, EUR, GBP, INR, SGD.
* **POST `/api/fx/convert`**
  * Body: `{ "from": "USD", "to": "EUR", "amount": 100 }`

### 3. Transfers
* **POST `/api/transfers`**
  * Headers: `x-user-id: <senderId>`
  * Body:
    ```json
    {
      "recipientId": "user_bob",
      "sourceCurrency": "USD",
      "targetCurrency": "EUR",
      "amount": 100
    }
    ```
* **GET `/api/transfers/history`**
  * Headers: `x-user-id: <string>`
  * Returns all sent and received transfers for the user.

## Team Integration Note
To integrate into the main Express gateway:
```javascript
const walletTransferRoutes = require('./routes/index.wallet-transfer');
app.use('/api', walletTransferRoutes);
### Prepare

Create Mercado libre application:

  - Go to [Create new Application](https://applications.mercadolivre.com.br/create?platform=ml) in [Mercado Libre applications](http://applications.mercadolibre.com/).
  
  - Sample app informations:
    - name: demo_azk
    - short name: demo_azk
    - description: demo_azk
  
  ![App configurations](https://github.com/azukiapp/meli-questions/blob/master/app_configurations.png)
  
  Please, change **Notifications Callback URL** to ngrok url defined in `Azkfile.js`

Create `.env` file:

  - Save `App ID`, `Secret Key` and `RAILS_COOKIE_SECRET`.

  - To generate new Secret Token run 

    ```
    $ azk shell auth -c 'bundle exec rake secret'
    ```
  
  - Get ngrok `AUTH KEY` in [ngrok dashboard](https://ngrok.com/dashboard).

  - `.env` sample:
  ```
  # MercadoLibre
  MERCADOLIBRE_APP_ID=<App ID>
  MERCADOLIBRE_APP_SECRET=<Secret Key>

  RAILS_COOKIE_SECRET=< New secret >

  NGROK_SUBDOMAIN=<subdomain>
  NGROK_AUTH=<AUTH KEY>
  ```

### Start

Install `azk`, instructions: 
    http://docs.azk.io/en/installation/index.html

Start

  ```bash
  azk start --open; azk logs --tail
  ```

### TESTE USERS

```
// Seller
{
  "id": 178354846,
  "nickname": "TETE3589365",
  "password": "qatest5133",
  "site_status": "active",
  "email": "test_user_39629551@testuser.com"
}

// buyer
{
  "id": 178354852,
  "nickname": "TT989800",
  "password": "qatest6988",
  "site_status": "active",
  "email": "test_user_89586390@testuser.com"
}
```



##### Get questions with curl

```sh
curl -X GET https://api.mercadolibre.com/my/received_questions/search\?access_token\=$TOKEN
```
